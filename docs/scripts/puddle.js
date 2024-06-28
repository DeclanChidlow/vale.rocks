// Based on Puddle.js
// https://batmannair.com/puddle.js

class AsciiNode {
	constructor(xx, yy, data) {
		// Node coordinates and data
		this.xx = xx;
		this.yy = yy;
		this.data = data;

		// Functions for node update and force computation
		this.updateNode = this.updateNodeHelias;
		this.computeForceAndDrawNode = this.computeForceAndDrawNodeHelias;

		// Forces and direction variables
		this.currentForce = 0;
		this.nextForce = 0;

		// Flags for update
		this.isAddedToUpdate = false;
		this.isMoveForceDelayComplete = true;

		// ASCII shades and their corresponding threshold values
		this.asciiShades = [..." .,:-=+*#%@"];
		this.asciiThreshold = this.asciiShades.map((el, index) => (index * 100.0) / (this.asciiShades.length - 1));
	}

	// Attach click and mousemove listeners
	applyListeners() {
		this.element.onclick = () => this.startRipple();
		this.element.onmousemove = () => {
			this.isMoveForceDelayComplete = false;
			this.startRipple();
			setTimeout(() => (this.isMoveForceDelayComplete = true), 500);
		};
	}

	// Create the HTML element representing the node
	getNodeElement() {
		this.element = document.createElement("span");
		this.element.style.cssText = "display: block; width: 100%; height: 100%;";
		this.drawNode(0);
		this.applyListeners();
		return this.element;
	}

	// Start a ripple effect from this node
	startRipple(rippleStrength = 0) {
		if (!rippleStrength) rippleStrength = this.data.maxRippleStrength;
		this.currentForce = rippleStrength;

		this.drawNode(rippleStrength);

		// Update neighboring nodes
		for (let yChange = -1; yChange <= 1; ++yChange) {
			for (let xChange = -1; xChange <= 1; ++xChange) {
				this.data.addToUpdateQueue(this.xx + xChange, this.yy + yChange);
			}
		}
	}

	// Update node's force based on the Helias algorithm
	updateNodeHelias() {
		// Helias math mode taken from https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm
		// Fetch forces from neighboring nodes
		let nodeUp = this.data.getNode(this.xx, this.yy - 1);
		let nodeUpForce = nodeUp ? nodeUp.currentForce : 0;
		let nodeDown = this.data.getNode(this.xx, this.yy + 1);
		let nodeDownForce = nodeDown ? nodeDown.currentForce : 0;
		let nodeRight = this.data.getNode(this.xx + 1, this.yy);
		let nodeRightForce = nodeRight ? nodeRight.currentForce : 0;
		let nodeLeft = this.data.getNode(this.xx - 1, this.yy);
		let nodeLeftForce = nodeLeft ? nodeLeft.currentForce : 0;

		// Calculate next force based on neighboring forces
		this.nextForce = (nodeUpForce + nodeDownForce + nodeRightForce + nodeLeftForce) / 2 - this.nextForce;
		this.nextForce = this.nextForce * this.data.forceDampeningRatio;

		this.data.addToDrawQueue(this.xx, this.yy);
	}

	// Draw the node based on force magnitude
	drawNode(forceMagnitude) {
		forceMagnitude = Math.min(100, Math.max(0, forceMagnitude));
		let index = this.asciiThreshold.findIndex((el) => el >= forceMagnitude);
		this.element.innerText = this.asciiShades[index];
	}

	// Compute force and update node's visual representation
	computeForceAndDrawNodeHelias() {
		if (Math.abs(this.nextForce) < this.data.forceCutOff) this.nextForce = 0;
		this.drawNode(this.nextForce);
		let temp = this.currentForce;
		this.currentForce = this.nextForce;
		this.nextForce = temp;

		// Update neighboring nodes for force calculation
		this.data.addToUpdateQueue(this.xx - 1, this.yy);
		this.data.addToUpdateQueue(this.xx + 1, this.yy);
		this.data.addToUpdateQueue(this.xx, this.yy - 1);
		this.data.addToUpdateQueue(this.xx, this.yy + 1);
	}
}

// Class managing the data for the puddle simulation
class PuddleData {
	constructor(numRows, numCols) {
		// Initialize data structures
		this.nodeList = [];
		this.updateQueue = [];
		this.drawQueue = [];
		this.isUpdateDone = true;
		this.numRows = numRows;
		this.numCols = numCols;

		// Default simulation parameters
		this.maxRippleStrength = 100.0;
		this.forceDampeningRatio = 0.85; // Force dampening percent
		this.forceCutOff = 2; // Axial force less than this is set to 0
	}

	// Refresh and set new dimensions for the simulation
	refresh(numRows, numCols) {
		this.nodeList = [];
		this.updateQueue = [];
		this.drawQueue = [];
		this.isUpdateDone = true;
		this.numRows = numRows;
		this.numCols = numCols;
	}

	// Add node to the simulation grid
	appendNode(node) {
		this.nodeList.push(node);
	}

	// Get node at specific coordinates in the grid
	getNode(xx, yy) {
		if (xx < 0 || xx >= this.numCols || yy < 0 || yy >= this.numRows) return undefined;
		return this.nodeList[yy * this.numCols + xx];
	}

	// Add node to the update queue if not already added
	addToUpdateQueue(xx, yy) {
		if (xx < 0 || xx >= this.numCols || yy < 0 || yy >= this.numRows) return;
		let index = yy * this.numCols + xx;
		if (!this.nodeList[index].isAddedToUpdate) {
			this.updateQueue.push(index);
			this.nodeList[index].isAddedToUpdate = true;
		}
	}

	// Add node to the draw queue
	addToDrawQueue(xx, yy) {
		// Adding to draw is only done on self and so no errors should pop up
		let index = yy * this.numCols + xx;
		this.drawQueue.push(index);
	}

	// Draw elements in the draw queue
	drawElements() {
		let drawList = this.drawQueue;
		this.drawQueue = [];
		for (const index of drawList) {
			let node = this.nodeList[index];
			node.computeForceAndDrawNode();
		}
	}

	// Update elements in the update queue
	updateElements() {
		this.isUpdateDone = false;
		let updateList = this.updateQueue;
		this.updateQueue = [];
		for (const index of updateList) {
			let node = this.nodeList[index];
			node.isAddedToUpdate = false;
		}
		for (const index of updateList) {
			let node = this.nodeList[index];
			node.updateNode();
		}
		this.drawElements();
		this.isUpdateDone = true;
	}
}

// Main class managing the entire puddle simulation
class Puddle {
	constructor(queryElement, updateInterval = 100) {
		// Initialize parent node and simulation data
		this.parentNode = document.querySelector(queryElement);
		this.data = new PuddleData(this.numRows, this.numCols);
		this.updateInterval = updateInterval;
		this.nodeStyle = AsciiNode;
		this.nodeSize = 14;
		this.updateLoop = undefined;
		this.setupDefaultOptions();

		// Event listener for window resize
		window.addEventListener("resize", () => this.resizeHandler());
	}

	// Set the style of nodes
	setNodeStyle() {
		this.nodeStyle = AsciiNode;
		this.setupGrid();
	}

	// Set default options for the simulation based on parent node dimensions
	setupDefaultOptions() {
		this.elementWidth = this.parentNode.scrollWidth;
		this.elementHeight = this.parentNode.scrollHeight;
		let lesserDimension = this.elementHeight < this.elementWidth ? this.elementHeight : this.elementWidth;
		this.nodeSize = (lesserDimension * 3) / 100;
		if (this.elementHeight) {
			this.numRows = Math.floor(this.elementHeight / this.nodeSize);
			this.numCols = Math.floor(this.elementWidth / this.nodeSize);
		}
	}

	// Resize the grid based on parent node dimensions
	resizeGrid() {
		this.elementWidth = this.parentNode.scrollWidth;
		this.elementHeight = this.parentNode.scrollHeight;
		if (this.elementHeight) {
			this.numRows = Math.floor(this.elementHeight / this.nodeSize);
			this.numCols = Math.floor(this.elementWidth / this.nodeSize);
		}
		this.setupGrid();
	}

	// Function to handle resizing of the grid
	resizeHandler() {
		this.resizeGrid();
	}

	// Set up the grid structure and initialize nodes for the simulation
	setupGrid() {
		clearInterval(this.updateLoop);
		this.data.refresh(this.numRows, this.numCols);

		this.parentNode.innerHTML = "";
		this.parentNode.style.cssText = `font-family: "Fira Code, monospace"; display: grid; grid-template-columns: repeat(${this.numCols}, ${this.nodeSize}px); grid-template-rows: repeat(${this.numRows}, ${this.nodeSize}px);`;

		for (let yy = 0; yy < this.numRows; ++yy) {
			for (let xx = 0; xx < this.numCols; ++xx) {
				let node = new this.nodeStyle(xx, yy, this.data);
				this.data.appendNode(node);
				this.parentNode.appendChild(node.getNodeElement());
			}
		}

		this.updateLoop = setInterval(() => this.tryUpdateElements(), this.updateInterval);
	}

	// Try to update elements in the simulation
	tryUpdateElements() {
		if (this.data.isUpdateDone) this.data.updateElements();
		else console.log("Previous update not completed, skipping update");
	}
}