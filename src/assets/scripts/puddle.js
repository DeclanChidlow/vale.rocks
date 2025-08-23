// Based on Puddle.js
// https://batmannair.com/puddle.js/

const CONFIG = {
	DEFAULT_UPDATE_INTERVAL: 100,
	MIN_NODE_SIZE: 10,
	MAX_RIPPLE_STRENGTH: 100.0,
	FORCE_DAMPENING_RATIO: 0.85,
	FORCE_CUTOFF: 2,
	ASCII_SHADES: [..." .,:-=+*#%@"],
	MOUSE_DELAY: 500,
};

const ASCII_THRESHOLDS = CONFIG.ASCII_SHADES.map((_, index) => (index * 100.0) / (CONFIG.ASCII_SHADES.length - 1));

class AsciiNode {
	constructor(xx, yy, data) {
		this.xx = xx;
		this.yy = yy;
		this.data = data;
		this.currentForce = 0;
		this.nextForce = 0;
		this.isAddedToUpdate = false;
		this.isMoveForceDelayComplete = true;
		this.element = this.#createNodeElement();
	}

	#createNodeElement() {
		const element = document.createElement("span");
		this.#drawNode(0, element);
		this.#applyListeners(element);
		return element;
	}

	#applyListeners(element) {
		element.addEventListener("click", () => this.startRipple());

		let moveTimeout;
		element.addEventListener("mousemove", () => {
			if (!this.isMoveForceDelayComplete) return;

			this.isMoveForceDelayComplete = false;
			this.startRipple();

			clearTimeout(moveTimeout);
			moveTimeout = setTimeout(() => {
				this.isMoveForceDelayComplete = true;
			}, CONFIG.MOUSE_DELAY);
		});
	}

	startRipple(rippleStrength = this.data.maxRippleStrength) {
		this.currentForce = rippleStrength;
		this.#drawNode(rippleStrength, this.element);
		this.#updateNeighbors();
	}

	#updateNeighbors() {
		this.data.addToUpdateQueue(this.xx - 1, this.yy - 1);
		this.data.addToUpdateQueue(this.xx, this.yy - 1);
		this.data.addToUpdateQueue(this.xx + 1, this.yy - 1);
		this.data.addToUpdateQueue(this.xx - 1, this.yy);
		this.data.addToUpdateQueue(this.xx + 1, this.yy);
		this.data.addToUpdateQueue(this.xx - 1, this.yy + 1);
		this.data.addToUpdateQueue(this.xx, this.yy + 1);
		this.data.addToUpdateQueue(this.xx + 1, this.yy + 1);
	}

	updateNode() {
		const { forceDampeningRatio } = this.data;
		const neighborSum = this.#getNeighborForces();

		this.nextForce = (neighborSum / 2 - this.nextForce) * forceDampeningRatio;
		this.data.addToDrawQueue(this.xx, this.yy);
	}

	#getNeighborForces() {
		return this.#getNodeForce(this.xx, this.yy - 1) + this.#getNodeForce(this.xx, this.yy + 1) + this.#getNodeForce(this.xx + 1, this.yy) + this.#getNodeForce(this.xx - 1, this.yy);
	}

	#getNodeForce(xx, yy) {
		const node = this.data.getNode(xx, yy);
		return node?.currentForce || 0;
	}

	#drawNode(forceMagnitude, element) {
		const clampedForce = Math.max(0, Math.min(100, forceMagnitude));
		const index = ASCII_THRESHOLDS.findIndex((threshold) => threshold >= clampedForce);
		element.textContent = CONFIG.ASCII_SHADES[index];
	}

	computeForceAndDrawNode() {
		if (Math.abs(this.nextForce) < this.data.forceCutOff) {
			this.nextForce = 0;
		}

		this.#drawNode(this.nextForce, this.element);
		[this.currentForce, this.nextForce] = [this.nextForce, this.currentForce];
		this.#updateNeighbors();
	}
}

class PuddleData {
	constructor(numRows, numCols) {
		this.nodeList = new Array(numRows * numCols);
		this.updateQueue = new Set();
		this.drawQueue = new Set();
		this.numRows = numRows;
		this.numCols = numCols;
		this.isUpdateDone = true;
		this.maxRippleStrength = CONFIG.MAX_RIPPLE_STRENGTH;
		this.forceDampeningRatio = CONFIG.FORCE_DAMPENING_RATIO;
		this.forceCutOff = CONFIG.FORCE_CUTOFF;
	}

	refresh(numRows, numCols) {
		this.nodeList = new Array(numRows * numCols);
		this.updateQueue.clear();
		this.drawQueue.clear();
		this.numRows = numRows;
		this.numCols = numCols;
		this.isUpdateDone = true;
	}

	isValidCoordinate(xx, yy) {
		return xx >= 0 && xx < this.numCols && yy >= 0 && yy < this.numRows;
	}

	getIndex(xx, yy) {
		return yy * this.numCols + xx;
	}

	appendNode(node, index) {
		this.nodeList[index] = node;
	}

	getNode(xx, yy) {
		return this.isValidCoordinate(xx, yy) ? this.nodeList[this.getIndex(xx, yy)] : null;
	}

	addToUpdateQueue(xx, yy) {
		if (!this.isValidCoordinate(xx, yy)) return;

		const index = this.getIndex(xx, yy);
		const node = this.nodeList[index];

		if (!node.isAddedToUpdate) {
			this.updateQueue.add(index);
			node.isAddedToUpdate = true;
		}
	}

	addToDrawQueue(xx, yy) {
		this.drawQueue.add(this.getIndex(xx, yy));
	}

	drawElements() {
		for (const index of this.drawQueue) {
			this.nodeList[index].computeForceAndDrawNode();
		}
		this.drawQueue.clear();
	}

	updateElements() {
		if (!this.isUpdateDone) {
			console.warn("Previous update not completed, skipping update");
			return;
		}

		this.isUpdateDone = false;

		for (const index of this.updateQueue) {
			this.nodeList[index].isAddedToUpdate = false;
			this.nodeList[index].updateNode();
		}
		this.updateQueue.clear();

		this.drawElements();
		this.isUpdateDone = true;
	}
}

class Puddle {
	constructor(queryElement, updateInterval = CONFIG.DEFAULT_UPDATE_INTERVAL) {
		this.parentNode = document.querySelector(queryElement);
		if (!this.parentNode) {
			throw new Error(`Element ${queryElement} not found`);
		}

		this.updateInterval = updateInterval;
		this.nodeSize = CONFIG.MIN_NODE_SIZE;

		this.resizeHandler = this.#resizeHandler.bind(this);
		window.addEventListener("resize", this.resizeHandler);

		this.#initialize();
	}

	#initialize() {
		this.#setupDimensions();
		this.data = new PuddleData(this.numRows, this.numCols);
		this.setupGrid();
	}

	#setupDimensions() {
		const { scrollWidth, scrollHeight } = this.parentNode;
		const lesserDimension = Math.min(scrollHeight, scrollWidth);
		this.nodeSize = Math.max(CONFIG.MIN_NODE_SIZE, (lesserDimension * 3) / 100);

		if (scrollHeight) {
			this.numRows = Math.floor(scrollHeight / this.nodeSize);
			this.numCols = Math.floor(scrollWidth / this.nodeSize);
		}
	}

	#resizeHandler() {
		this.#setupDimensions();
		this.setupGrid();
	}

	setupGrid() {
		clearInterval(this.updateLoop);
		this.data.refresh(this.numRows, this.numCols);

		const fragment = document.createDocumentFragment();
		this.parentNode.innerHTML = "";

		this.parentNode.style.cssText = `
      grid-template-columns: repeat(${this.numCols}, ${this.nodeSize}px);
      grid-template-rows: repeat(${this.numRows}, ${this.nodeSize}px);
    `;

		const totalNodes = this.numRows * this.numCols;
		for (let i = 0; i < totalNodes; i++) {
			const yy = Math.floor(i / this.numCols);
			const xx = i % this.numCols;

			const node = new AsciiNode(xx, yy, this.data);
			this.data.appendNode(node, i);
			fragment.appendChild(node.element);
		}

		this.parentNode.appendChild(fragment);
		this.updateLoop = setInterval(() => this.data.updateElements(), this.updateInterval);
	}
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
	try {
		const puddle = new Puddle("#puddle-container");
	} catch (error) {
		console.error("Failed to initialize puddle:", error);
	}
}

export default Puddle;
