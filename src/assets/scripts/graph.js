class SitemapGraph {
	constructor() {
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.info = document.getElementById("info");
		this.fullscreenBtn = document.getElementById("fullscreen-btn");
		this.zoomInBtn = document.getElementById("zoom-in-btn");
		this.zoomLevel = document.getElementById("zoom-level");
		this.zoomOutBtn = document.getElementById("zoom-out-btn");
		this.recenterBtn = document.getElementById("recenter-btn");
		this.container = document.getElementById("container");
		this.container.style.display = "block";

		this.nodes = [];
		this.edges = [];
		this.camera = { x: 0, y: 0, zoom: 0.8 };
		this.physics = true;
		this.selectedNode = null;
		this.isDragging = false;
		this.isDraggingNode = false;
		this.dragStart = { x: 0, y: 0 };
		this.mousePos = { x: 0, y: 0 };
		this.draggedNode = null;
		this.dragOffset = { x: 0, y: 0 };
		this.hasInteracted = false;

		this.touches = new Map();
		this.lastTouchDistance = 0;
		this.isPinching = false;
		this.touchStartTime = 0;
		this.touchTapThreshold = 300;
		this.touchMoveThreshold = 10;
		this.screenBounds = { minX: 0, minY: 0, maxX: 0, maxY: 0 };

		this.setupCanvas();
		this.setupEventListeners();
		this.loadSitemap();
	}

	setupCanvas() {
		const resize = () => {
			this.container.style.width = `${document.documentElement.clientWidth}px`;
			const containerRect = this.container.getBoundingClientRect();

			const oldWidth = this.canvas.width > 0 ? this.canvas.width / devicePixelRatio : 0;
			const oldHeight = this.canvas.height > 0 ? this.canvas.height / devicePixelRatio : 0;

			this.canvas.width = containerRect.width * devicePixelRatio;
			this.canvas.height = containerRect.height * devicePixelRatio;
			this.canvas.style.width = containerRect.width + "px";
			this.canvas.style.height = containerRect.height + "px";
			this.ctx.scale(devicePixelRatio, devicePixelRatio);

			if (oldWidth > 0 && oldHeight > 0 && this.hasInteracted) {
				const offsetX = (containerRect.width - oldWidth) / 2;
				const offsetY = (containerRect.height - oldHeight) / 2;
				this.camera.x += offsetX / this.camera.zoom;
				this.camera.y += offsetY / this.camera.zoom;
			}

			if (this.nodes.length > 0) this.render();
		};
		resize();
		window.addEventListener("resize", resize);
	}

	setupEventListeners() {
		this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
		this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
		this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
		this.canvas.addEventListener("wheel", this.onWheel.bind(this), { passive: false });

		this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this), { passive: false });
		this.canvas.addEventListener("touchmove", this.onTouchMove.bind(this), { passive: false });
		this.canvas.addEventListener("touchend", this.onTouchEnd.bind(this));
		this.canvas.addEventListener("touchcancel", this.onTouchEnd.bind(this));

		this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());

		this.mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
		this.mediaQueryList.addEventListener("change", this.render.bind(this));

		this.fullscreenBtn.addEventListener("click", this.toggleFullscreen.bind(this));
		document.addEventListener("fullscreenchange", this.onFullscreenChange.bind(this));

		this.zoomInBtn.addEventListener("click", this.zoomIn.bind(this));
		this.zoomOutBtn.addEventListener("click", this.zoomOut.bind(this));
		this.recenterBtn.addEventListener("click", this.recenter.bind(this));
	}

	async loadSitemap() {
		try {
			const response = await fetch("/sitemap.xml");
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const xmlText = await response.text();
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(xmlText, "text/xml");
			const urls = Array.from(xmlDoc.querySelectorAll("url loc")).map((loc) => loc.textContent);

			if (urls.length === 0) throw new Error("No URLs found");

			this.buildGraph(urls);
			this.startAnimation();
			this.updateZoomDisplay();
		} catch (error) {
			console.error(`Error loading sitemap: ${error.message}`);
		}
	}

	buildGraph(urls) {
		const urlMap = new Map();

		const digitRegex = /^\d+$/;

		const filteredUrls = urls.filter((url) => {
			const urlObj = new URL(url);
			const pathSegments = urlObj.pathname.split("/").filter((s) => s.length > 0);
			return !pathSegments.some((s) => digitRegex.test(s));
		});

		filteredUrls.forEach((url) => {
			const urlObj = new URL(url);
			const pathParts = urlObj.pathname.split("/").filter((p) => p.length > 0);
			const allParts = pathParts.length === 0 ? [""] : pathParts;

			let currentPath = "";
			let parentNode = null;

			allParts.forEach((part, depth) => {
				currentPath += "/" + part;

				if (!urlMap.has(currentPath)) {
					const nodeColor = this.calculateNodeColor(currentPath);

					const node = {
						id: currentPath,
						url: urlObj.origin + currentPath,
						label: part || "landing",
						x: Math.random() * 1000 - 500,
						y: Math.random() * 800 - 400,
						vx: 0,
						vy: 0,
						depth,
						connections: 0,
						size: 0,
						pinned: false,
						color: nodeColor,
						rgbColor: `rgb(${nodeColor})`,
						bgDark: `rgba(${nodeColor}, ${Math.max(0.3, 1 - depth * 0.15)})`,
					};

					this.nodes.push(node);
					urlMap.set(currentPath, node);

					if (parentNode) {
						this.edges.push({
							source: parentNode,
							target: node,
							strength: 1 / (depth + 1),
						});
						parentNode.connections++;
						node.connections++;
					}
				}
				parentNode = urlMap.get(currentPath);
			});
		});

		this.nodes.forEach((node) => {
			node.size = node.connections === 0 ? 12 : 4 + Math.log1p(node.connections) * 3.5;
		});
	}

	calculateNodeColor(pathId) {
		const pathParts = pathId.split("/").filter((p) => p.length > 0);
		if (pathParts.length > 0) {
			switch (pathParts[0].toLowerCase()) {
				case "posts":
					return "226, 54, 114";
				case "portfolio":
					return "245, 110, 0";
				case "micros":
					return "55, 120, 192";
				case "photography":
					return "88, 165, 81";
				case "videos":
					return "241, 55, 49";
				case "links":
					return "44, 183, 188";
				case "library":
					return "255, 173, 32";
			}
		}
		return "94, 90, 90";
	}

	onTouchStart(e) {
		e.preventDefault();
		this.physics = true;
		this.hasInteracted = true;
		this.touchStartTime = Date.now();
		this.touches.clear();
		const rect = this.canvas.getBoundingClientRect();

		for (let i = 0; i < e.touches.length; i++) {
			const t = e.touches[i];
			this.touches.set(t.identifier, {
				x: t.clientX - rect.left,
				y: t.clientY - rect.top,
				startX: t.clientX - rect.left,
				startY: t.clientY - rect.top,
			});
		}

		if (e.touches.length === 1) {
			const touch = this.touches.values().next().value;
			const worldPos = this.screenToWorld(touch.x, touch.y);
			const touchedNode = this.getNodeAt(worldPos.x, worldPos.y);

			if (touchedNode) {
				this.selectedNode = touchedNode;
				this.draggedNode = touchedNode;
				this.isDraggingNode = true;
				this.dragOffset = { x: worldPos.x - touchedNode.x, y: worldPos.y - touchedNode.y };
				touchedNode.pinned = true;
				touchedNode.vx = 0;
				touchedNode.vy = 0;
				this.showNodeInfo(touchedNode);
			} else {
				this.selectedNode = null;
				this.info.style.display = "none";
				this.isDragging = true;
				this.dragStart = { x: touch.x, y: touch.y };
			}
		} else if (e.touches.length === 2) {
			this.isPinching = true;
			this.isDragging = false;
			this.isDraggingNode = false;
			if (this.draggedNode) {
				this.draggedNode.pinned = false;
				this.draggedNode = null;
			}
			const touches = Array.from(this.touches.values());
			const dx = touches[1].x - touches[0].x;
			const dy = touches[1].y - touches[0].y;
			this.lastTouchDistance = Math.sqrt(dx * dx + dy * dy);
		}
	}

	onTouchMove(e) {
		e.preventDefault();
		this.physics = true;
		const rect = this.canvas.getBoundingClientRect();

		for (let i = 0; i < e.touches.length; i++) {
			const t = e.touches[i];
			if (this.touches.has(t.identifier)) {
				const td = this.touches.get(t.identifier);
				td.x = t.clientX - rect.left;
				td.y = t.clientY - rect.top;
			}
		}

		if (e.touches.length === 1 && !this.isPinching) {
			const touch = this.touches.values().next().value;
			if (this.isDraggingNode && this.draggedNode) {
				const worldPos = this.screenToWorld(touch.x, touch.y);
				this.draggedNode.x = worldPos.x - this.dragOffset.x;
				this.draggedNode.y = worldPos.y - this.dragOffset.y;
			} else if (this.isDragging && !this.selectedNode) {
				const dx = (touch.x - this.dragStart.x) / this.camera.zoom;
				const dy = (touch.y - this.dragStart.y) / this.camera.zoom;
				this.camera.x += dx;
				this.camera.y += dy;
				this.dragStart = { x: touch.x, y: touch.y };
			}
		} else if (e.touches.length === 2 && this.isPinching) {
			const touches = Array.from(this.touches.values());
			const dx = touches[1].x - touches[0].x;
			const dy = touches[1].y - touches[0].y;
			const currentDistance = Math.sqrt(dx * dx + dy * dy);

			if (this.lastTouchDistance > 0) {
				const cx = (touches[0].x + touches[1].x) / 2;
				const cy = (touches[0].y + touches[1].y) / 2;
				const wb = this.screenToWorld(cx, cy);
				const zoomFactor = currentDistance / this.lastTouchDistance;
				this.camera.zoom = Math.max(0.1, Math.min(5, this.camera.zoom * zoomFactor));
				const wa = this.screenToWorld(cx, cy);
				this.camera.x += wa.x - wb.x;
				this.camera.y += wa.y - wb.y;
			}
			this.lastTouchDistance = currentDistance;
			this.updateZoomDisplay();
		}
	}

	onTouchEnd(e) {
		if (this.isDraggingNode && this.draggedNode) this.draggedNode.pinned = false;
		this.isDragging = false;
		this.isDraggingNode = false;
		this.isPinching = false;
		this.draggedNode = null;
		this.lastTouchDistance = 0;

		const activeIds = new Set();
		for (let i = 0; i < e.touches.length; i++) activeIds.add(e.touches[i].identifier);
		for (const [id] of this.touches) if (!activeIds.has(id)) this.touches.delete(id);
	}

	onMouseDown(e) {
		this.hasInteracted = true;
		this.physics = true;
		const rect = this.canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const worldPos = this.screenToWorld(x, y);
		const clickedNode = this.getNodeAt(worldPos.x, worldPos.y);

		if (clickedNode) {
			this.selectedNode = clickedNode;
			this.draggedNode = clickedNode;
			this.isDraggingNode = true;
			this.dragOffset = { x: worldPos.x - clickedNode.x, y: worldPos.y - clickedNode.y };
			clickedNode.pinned = true;
			clickedNode.vx = 0;
			clickedNode.vy = 0;
			this.showNodeInfo(clickedNode);
		} else {
			this.selectedNode = null;
			this.info.style.display = "none";
			this.isDragging = true;
			this.dragStart = { x: e.clientX, y: e.clientY };
		}
	}

	onMouseMove(e) {
		const rect = this.canvas.getBoundingClientRect();
		this.mousePos.x = e.clientX - rect.left;
		this.mousePos.y = e.clientY - rect.top;

		if (this.isDraggingNode && this.draggedNode) {
			this.physics = true;
			const worldPos = this.screenToWorld(this.mousePos.x, this.mousePos.y);
			this.draggedNode.x = worldPos.x - this.dragOffset.x;
			this.draggedNode.y = worldPos.y - this.dragOffset.y;
		} else if (this.isDragging && !this.selectedNode) {
			const dx = (e.clientX - this.dragStart.x) / this.camera.zoom;
			const dy = (e.clientY - this.dragStart.y) / this.camera.zoom;
			this.camera.x += dx;
			this.camera.y += dy;
			this.dragStart = { x: e.clientX, y: e.clientY };
		}

		if (!this.isDraggingNode && !this.isDragging) {
			const worldPos = this.screenToWorld(this.mousePos.x, this.mousePos.y);
			const hoveredNode = this.getNodeAt(worldPos.x, worldPos.y);
			this.canvas.style.cursor = hoveredNode ? "pointer" : "grab";
		}
	}

	onMouseUp() {
		if (this.isDraggingNode && this.draggedNode) this.draggedNode.pinned = false;
		this.isDragging = false;
		this.isDraggingNode = false;
		this.draggedNode = null;
		this.canvas.style.cursor = "grab";
	}

	onWheel(e) {
		if (!this.hasInteracted) return;
		e.preventDefault();
		const rect = this.canvas.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		const wb = this.screenToWorld(mouseX, mouseY);
		const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
		this.camera.zoom = Math.max(0.1, Math.min(5, this.camera.zoom * zoomFactor));
		const wa = this.screenToWorld(mouseX, mouseY);
		this.camera.x += wa.x - wb.x;
		this.camera.y += wa.y - wb.y;
		this.updateZoomDisplay();
	}

	toggleFullscreen() {
		if (!document.fullscreenElement) {
			this.container.requestFullscreen().catch((err) => console.log(err));
		} else {
			document.exitFullscreen();
		}
	}

	onFullscreenChange() {
		const isFullscreen = !!document.fullscreenElement;
		this.fullscreenBtn.innerHTML = isFullscreen
			? "<svg viewBox='0 -960 960 960'><path d='M264-144v-120H144v-72h192v192zm360 0v-192h192v72H696v120zM144-624v-72h120v-120h72v192zm480 0v-192h72v120h120v72z'/></svg>"
			: "<svg viewBox='0 -960 960 960'><path d='M144-144v-192h72v120h120v72zm480 0v-72h120v-120h72v192zM144-624v-192h192v72H216v120zm600 0v-120H624v-72h192v192z'/></svg>";
		setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
	}

	applyZoom(factor) {
		this.hasInteracted = true;
		const cx = this.canvas.width / (2 * devicePixelRatio);
		const cy = this.canvas.height / (2 * devicePixelRatio);
		const wb = this.screenToWorld(cx, cy);
		this.camera.zoom = factor;
		const wa = this.screenToWorld(cx, cy);
		this.camera.x += wa.x - wb.x;
		this.camera.y += wa.y - wb.y;
		this.updateZoomDisplay();
		this.physics = true;
	}

	zoomIn() {
		const currentPct = Math.round(this.camera.zoom * 100);
		this.applyZoom(Math.min(500, currentPct + 25) / 100);
	}

	zoomOut() {
		const currentPct = Math.round(this.camera.zoom * 100);
		this.applyZoom(Math.max(10, currentPct - 25) / 100);
	}

	updateZoomDisplay() {
		this.zoomLevel.textContent = `${Math.round(this.camera.zoom * 100)}%`;
	}

	recenter() {
		this.hasInteracted = true;
		this.camera.x = 0;
		this.camera.y = 0;
		this.camera.zoom = 0.8;
		this.updateZoomDisplay();
		this.physics = true;
	}

	screenToWorld(sx, sy) {
		return {
			x: (sx - this.canvas.width / (2 * devicePixelRatio)) / this.camera.zoom - this.camera.x,
			y: (sy - this.canvas.height / (2 * devicePixelRatio)) / this.camera.zoom - this.camera.y,
		};
	}

	getNodeAt(wx, wy) {
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const dx = wx - node.x;
			const dy = wy - node.y;
			if (dx * dx + dy * dy < (node.size + 5) ** 2) return node;
		}
		return null;
	}

	showNodeInfo(node) {
		const urlObj = new URL(node.url);
		const pathParts = urlObj.pathname.split("/").filter((p) => p.length > 0);
		const sectionColor = node.rgbColor;

		let html = "";
		if (pathParts.length === 0) {
			html = `<a href="${node.url}" style="text-decoration-color: ${sectionColor}">Landing</a>`;
		} else if (pathParts.length === 1) {
			html = `<a href="${node.url}" style="text-decoration-color: ${sectionColor}">${pathParts[0]}</a>`;
		} else {
			const section = pathParts.slice(0, -1).join("/");
			const title = pathParts[pathParts.length - 1];
			html = `${section}/<a href="${node.url}" style="text-decoration-color: ${sectionColor}">${title}</a>`;
		}
		this.info.innerHTML = html;
		this.info.style.display = "block";
	}

	updatePhysics() {
		if (!this.physics) return;

		const repulsion = 50000;
		const repulsionDistLimitSq = 250 * 250;
		const attraction = 0.05;
		const centerForce = 0.000075;
		const damping = 0.9;

		let totalKineticEnergy = 0;

		const nodes = this.nodes;
		const edges = this.edges;
		const nodeCount = nodes.length;
		const edgeCount = edges.length;

		for (let i = 0; i < nodeCount; i++) {
			const node = nodes[i];
			if (node.pinned) continue;

			for (let j = 0; j < nodeCount; j++) {
				if (i === j) continue;
				const other = nodes[j];

				const dx = node.x - other.x;
				const dy = node.y - other.y;
				const distSq = dx * dx + dy * dy;

				if (distSq > 0 && distSq < repulsionDistLimitSq) {
					const distance = Math.sqrt(distSq);
					const force = repulsion / distSq;
					const fx = (dx / distance) * force * 0.005;
					const fy = (dy / distance) * force * 0.005;
					node.vx += fx;
					node.vy += fy;
				}
			}

			const distSqC = node.x * node.x + node.y * node.y;
			if (distSqC > 90000) {
				node.vx -= node.x * centerForce;
				node.vy -= node.y * centerForce;
			}
		}

		for (let i = 0; i < edgeCount; i++) {
			const edge = edges[i];
			const dx = edge.target.x - edge.source.x;
			const dy = edge.target.y - edge.source.y;
			const distance = Math.sqrt(dx * dx + dy * dy) || 1;
			const idealDist = 60 + edge.target.depth * 40;
			const force = (distance - idealDist) * attraction * edge.strength;

			const fx = (dx / distance) * force * 0.5;
			const fy = (dy / distance) * force * 0.5;

			if (!edge.source.pinned) {
				edge.source.vx += fx;
				edge.source.vy += fy;
			}
			if (!edge.target.pinned) {
				edge.target.vx -= fx;
				edge.target.vy -= fy;
			}
		}

		for (let i = 0; i < nodeCount; i++) {
			const node = nodes[i];
			if (node.pinned) continue;

			const dynamicDamping = node.connections > 5 ? 0.7 : 0.9;
			node.vx *= dynamicDamping;
			node.vy *= dynamicDamping;

			const vSq = node.vx * node.vx + node.vy * node.vy;
			if (vSq > 16) {
				const speed = Math.sqrt(vSq);
				node.vx = (node.vx / speed) * 4;
				node.vy = (node.vy / speed) * 4;
			}

			node.x += node.vx;
			node.y += node.vy;

			totalKineticEnergy += vSq;
		}

		if (totalKineticEnergy < 0.05 && !this.isDragging) {
			this.physics = false;
		}
	}

	render() {
		const ctx = this.ctx;
		const dpr = devicePixelRatio;
		const width = this.canvas.width / dpr;
		const height = this.canvas.height / dpr;
		const isDarkMode = this.mediaQueryList.matches;

		ctx.clearRect(0, 0, width, height);

		const zoom = this.camera.zoom;
		const cx = width / 2;
		const cy = height / 2;

		ctx.save();
		ctx.translate(cx, cy);
		ctx.scale(zoom, zoom);
		ctx.translate(this.camera.x, this.camera.y);

		const visibleW = width / zoom;
		const visibleH = height / zoom;
		const viewMinX = -this.camera.x - cx / zoom - 50;
		const viewMinY = -this.camera.y - cy / zoom - 50;
		const viewMaxX = -this.camera.x + (visibleW - cx / zoom) + 50;
		const viewMaxY = -this.camera.y + (visibleH - cy / zoom) + 50;

		const lineWidth = 1 / zoom;

		ctx.strokeStyle = isDarkMode ? "rgba(63, 60, 60, 0.8)" : "rgba(63, 60, 60, 0.1)";
		ctx.lineWidth = lineWidth;
		ctx.beginPath();

		const edges = this.edges;
		for (let i = 0; i < edges.length; i++) {
			const e = edges[i];
			if (
				(e.source.x > viewMinX && e.source.x < viewMaxX && e.source.y > viewMinY && e.source.y < viewMaxY) ||
				(e.target.x > viewMinX && e.target.x < viewMaxX && e.target.y > viewMinY && e.target.y < viewMaxY)
			) {
				ctx.moveTo(e.source.x, e.source.y);
				ctx.lineTo(e.target.x, e.target.y);
			}
		}
		ctx.stroke();

		const nodes = this.nodes;
		const nodeStrokeStyle = isDarkMode ? "rgba(255, 234, 209, 1)" : "rgba(19, 17, 17, 1)";
		const twoPi = Math.PI * 2;

		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];

			if (node.x < viewMinX || node.x > viewMaxX || node.y < viewMinY || node.y > viewMaxY) continue;

			const isSelected = node === this.selectedNode || node === this.draggedNode;

			ctx.beginPath();
			ctx.arc(node.x, node.y, node.size, 0, twoPi);
			ctx.fillStyle = node.bgDark;
			ctx.fill();

			if (isSelected) {
				ctx.strokeStyle = nodeStrokeStyle;
				ctx.lineWidth = lineWidth;
				ctx.stroke();
			}
		}

		if (zoom > 0.5) {
			ctx.font = `${Math.max(5, 10 / zoom)}px "Work Sans"`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = isDarkMode ? "#ffead1" : "#131111";

			const textOffset = 15 / zoom;

			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i];
				if ((node.size > 8 || zoom > 1.5) && node.x > viewMinX && node.x < viewMaxX && node.y > viewMinY && node.y < viewMaxY) {
					const label = node.label.length > 15 ? node.label.substring(0, 12) + "…" : node.label;
					ctx.fillText(label, node.x, node.y + node.size + textOffset);
				}
			}
		}

		ctx.restore();
	}

	startAnimation() {
		const animate = () => {
			this.updatePhysics();
			this.render();
			requestAnimationFrame(animate);
		};
		requestAnimationFrame(animate);
	}
}

window.addEventListener("DOMContentLoaded", () => {
	window.graph = new SitemapGraph();
});
