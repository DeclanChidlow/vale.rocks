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
		this.dirty = true;
		this.selectedNode = null;
		this.isDragging = false;
		this.isDraggingNode = false;
		this.dragStart = { x: 0, y: 0 };
		this.draggedNode = null;
		this.dragOffset = { x: 0, y: 0 };
		this.hasInteracted = false;
		this.animationId = null;
		this.isPageVisible = true;
		this.resizeRafId = null;

		this.touches = new Map();
		this.lastTouchDistance = 0;
		this.isPinching = false;

		this.width = 0;
		this.height = 0;
		this.halfW = 0;
		this.halfH = 0;
		this._lastHover = 0;

		this.setupCanvas();
		this.setupEventListeners();
		this.loadSitemap();
	}

	setupCanvas() {
		const resize = () => {
			this.container.style.width = `${document.documentElement.clientWidth}px`;
			const rect = this.container.getBoundingClientRect();

			const oldW = this.width;
			const oldH = this.height;

			this.canvas.width = rect.width * devicePixelRatio;
			this.canvas.height = rect.height * devicePixelRatio;
			this.canvas.style.width = rect.width + "px";
			this.canvas.style.height = rect.height + "px";
			this.ctx.scale(devicePixelRatio, devicePixelRatio);

			this.width = rect.width;
			this.height = rect.height;
			this.halfW = this.width / 2;
			this.halfH = this.height / 2;

			if (oldW > 0 && oldH > 0 && this.hasInteracted) {
				const ox = (rect.width - oldW) / 2;
				const oy = (rect.height - oldH) / 2;
				this.camera.x += ox / this.camera.zoom;
				this.camera.y += oy / this.camera.zoom;
			}

			this.dirty = true;
			if (this.nodes.length > 0) this.render();
			this.resizeRafId = null;
		};

		const debouncedResize = () => {
			if (this.resizeRafId) return;
			this.resizeRafId = requestAnimationFrame(resize);
		};

		resize();
		window.addEventListener("resize", debouncedResize);
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
		this.mediaQueryList.addEventListener("change", () => {
			this.dirty = true;
		});

		this.fullscreenBtn.addEventListener("click", this.toggleFullscreen.bind(this));
		document.addEventListener("fullscreenchange", this.onFullscreenChange.bind(this));

		this.zoomInBtn.addEventListener("click", this.zoomIn.bind(this));
		this.zoomOutBtn.addEventListener("click", this.zoomOut.bind(this));
		this.recenterBtn.addEventListener("click", this.recenter.bind(this));

		document.addEventListener("visibilitychange", () => {
			this.isPageVisible = !document.hidden;
			if (this.isPageVisible) {
				this.dirty = true;
				this.physics = true;
				if (!this.animationId) this.startAnimation();
			} else {
				this.stopAnimation();
			}
		});
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
			node.mass = 1 + node.connections * 0.3;
			node.invMass = 1 / node.mass;
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
		this.dirty = true;
		this.touches.clear();
		const rect = this.canvas.getBoundingClientRect();

		for (let i = 0; i < e.touches.length; i++) {
			const t = e.touches[i];
			this.touches.set(t.identifier, {
				x: t.clientX - rect.left,
				y: t.clientY - rect.top,
			});
		}

		if (e.touches.length === 1) {
			const touch = this.touches.values().next().value;
			const wx = (touch.x - this.halfW) / this.camera.zoom - this.camera.x;
			const wy = (touch.y - this.halfH) / this.camera.zoom - this.camera.y;
			const touchedNode = this.getNodeAt(wx, wy);

			if (touchedNode) {
				this.selectedNode = touchedNode;
				this.draggedNode = touchedNode;
				this.isDraggingNode = true;
				touchedNode.pinned = true;
				touchedNode.vx = 0;
				touchedNode.vy = 0;
				this.dragOffset.x = wx - touchedNode.x;
				this.dragOffset.y = wy - touchedNode.y;
				this.showNodeInfo(touchedNode);
			} else {
				this.selectedNode = null;
				this.info.style.display = "none";
				this.isDragging = true;
				this.dragStart.x = touch.x;
				this.dragStart.y = touch.y;
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
		this.dirty = true;
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
				const wx = (touch.x - this.halfW) / this.camera.zoom - this.camera.x;
				const wy = (touch.y - this.halfH) / this.camera.zoom - this.camera.y;
				this.draggedNode.x = wx - this.dragOffset.x;
				this.draggedNode.y = wy - this.dragOffset.y;
			} else if (this.isDragging && !this.selectedNode) {
				const dx = (touch.x - this.dragStart.x) / this.camera.zoom;
				const dy = (touch.y - this.dragStart.y) / this.camera.zoom;
				this.camera.x += dx;
				this.camera.y += dy;
				this.dragStart.x = touch.x;
				this.dragStart.y = touch.y;
			}
		} else if (e.touches.length === 2 && this.isPinching) {
			const touches = Array.from(this.touches.values());
			const dx = touches[1].x - touches[0].x;
			const dy = touches[1].y - touches[0].y;
			const currentDistance = Math.sqrt(dx * dx + dy * dy);

			if (this.lastTouchDistance > 0) {
				const cx = (touches[0].x + touches[1].x) / 2;
				const cy = (touches[0].y + touches[1].y) / 2;
				const wbx = (cx - this.halfW) / this.camera.zoom - this.camera.x;
				const wby = (cy - this.halfH) / this.camera.zoom - this.camera.y;
				const zoomFactor = currentDistance / this.lastTouchDistance;
				this.camera.zoom = Math.max(0.1, Math.min(5, this.camera.zoom * zoomFactor));
				const wax = (cx - this.halfW) / this.camera.zoom - this.camera.x;
				const way = (cy - this.halfH) / this.camera.zoom - this.camera.y;
				this.camera.x += wax - wbx;
				this.camera.y += way - wby;
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
		this.dirty = true;
		const rect = this.canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const wx = (x - this.halfW) / this.camera.zoom - this.camera.x;
		const wy = (y - this.halfH) / this.camera.zoom - this.camera.y;
		const clickedNode = this.getNodeAt(wx, wy);

		if (clickedNode) {
			this.selectedNode = clickedNode;
			this.draggedNode = clickedNode;
			this.isDraggingNode = true;
			clickedNode.pinned = true;
			clickedNode.vx = 0;
			clickedNode.vy = 0;
			this.dragOffset.x = wx - clickedNode.x;
			this.dragOffset.y = wy - clickedNode.y;
			this.showNodeInfo(clickedNode);
		} else {
			this.selectedNode = null;
			this.info.style.display = "none";
			this.isDragging = true;
			this.dragStart.x = e.clientX;
			this.dragStart.y = e.clientY;
		}
	}

	onMouseMove(e) {
		const rect = this.canvas.getBoundingClientRect();
		const mx = e.clientX - rect.left;
		const my = e.clientY - rect.top;

		if (this.isDraggingNode && this.draggedNode) {
			this.physics = true;
			this.dirty = true;
			const wx = (mx - this.halfW) / this.camera.zoom - this.camera.x;
			const wy = (my - this.halfH) / this.camera.zoom - this.camera.y;
			this.draggedNode.x = wx - this.dragOffset.x;
			this.draggedNode.y = wy - this.dragOffset.y;
		} else if (this.isDragging && !this.selectedNode) {
			const dx = (e.clientX - this.dragStart.x) / this.camera.zoom;
			const dy = (e.clientY - this.dragStart.y) / this.camera.zoom;
			this.camera.x += dx;
			this.camera.y += dy;
			this.dragStart.x = e.clientX;
			this.dragStart.y = e.clientY;
			this.dirty = true;
		}

		if (!this.isDraggingNode && !this.isDragging) {
			const now = performance.now();
			if (now - this._lastHover > 32) {
				this._lastHover = now;
				const wx = (mx - this.halfW) / this.camera.zoom - this.camera.x;
				const wy = (my - this.halfH) / this.camera.zoom - this.camera.y;
				const hoveredNode = this.getNodeAt(wx, wy);
				this.canvas.style.cursor = hoveredNode ? "pointer" : "grab";
			}
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
		this.physics = true;
		this.dirty = true;
		const rect = this.canvas.getBoundingClientRect();
		const mx = e.clientX - rect.left;
		const my = e.clientY - rect.top;

		const wbx = (mx - this.halfW) / this.camera.zoom - this.camera.x;
		const wby = (my - this.halfH) / this.camera.zoom - this.camera.y;
		const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
		this.camera.zoom = Math.max(0.1, Math.min(5, this.camera.zoom * zoomFactor));
		const wax = (mx - this.halfW) / this.camera.zoom - this.camera.x;
		const way = (my - this.halfH) / this.camera.zoom - this.camera.y;
		this.camera.x += wax - wbx;
		this.camera.y += way - wby;
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
		this.dirty = true;
		this.camera.zoom = factor;
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
		this.dirty = true;
		this.camera.x = 0;
		this.camera.y = 0;
		this.camera.zoom = 0.8;
		this.updateZoomDisplay();
		this.physics = true;
	}

	getNodeAt(wx, wy) {
		const hitRadius = 5 / this.camera.zoom;
		const nodes = this.nodes;
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			const dx = wx - node.x;
			const dy = wy - node.y;
			const threshold = node.size + hitRadius;
			if (dx * dx + dy * dy < threshold * threshold) return node;
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

		const nodes = this.nodes;
		const edges = this.edges;
		const n = nodes.length;
		const maxSpeedSq = 9;

		let totalKE = 0;

		for (let i = 0; i < n; i++) {
			const a = nodes[i];
			if (a.pinned) continue;

			for (let j = i + 1; j < n; j++) {
				const b = nodes[j];
				const dx = a.x - b.x;
				const dy = a.y - b.y;
				const distSq = dx * dx + dy * dy;

				if (distSq < 1 || distSq > 62500) continue;

				const invDist = 1 / Math.sqrt(distSq);
				const sf = (250 * invDist) / distSq;
				const fx = dx * sf;
				const fy = dy * sf;

				a.vx += fx * a.invMass;
				a.vy += fy * a.invMass;
				if (!b.pinned) {
					b.vx -= fx * b.invMass;
					b.vy -= fy * b.invMass;
				}
			}

			const distSqC = a.x * a.x + a.y * a.y;
			if (distSqC > 90000) {
				const cF = 0.000075 * a.invMass;
				a.vx -= a.x * cF;
				a.vy -= a.y * cF;
			}
		}

		for (let i = 0; i < edges.length; i++) {
			const edge = edges[i];
			const dx = edge.target.x - edge.source.x;
			const dy = edge.target.y - edge.source.y;
			const distSq = dx * dx + dy * dy;
			if (distSq < 1e-6) continue;
			const dist = Math.sqrt(distSq);
			const invDist = 1 / dist;
			const idealDist = 60 + edge.target.depth * 40;
			const f = (dist - idealDist) * 0.025 * edge.strength * invDist;

			if (!edge.source.pinned) {
				edge.source.vx += dx * f * edge.source.invMass;
				edge.source.vy += dy * f * edge.source.invMass;
			}
			if (!edge.target.pinned) {
				edge.target.vx -= dx * f * edge.target.invMass;
				edge.target.vy -= dy * f * edge.target.invMass;
			}
		}

		for (let i = 0; i < n; i++) {
			const node = nodes[i];
			if (node.pinned) continue;

			node.vx *= node.connections > 5 ? 0.72 : 0.92;
			node.vy *= node.connections > 5 ? 0.72 : 0.92;

			const vSq = node.vx * node.vx + node.vy * node.vy;
			if (vSq > maxSpeedSq) {
				const invSpeed = 3 / Math.sqrt(vSq);
				node.vx *= invSpeed;
				node.vy *= invSpeed;
			}

			node.x += node.vx;
			node.y += node.vy;

			totalKE += vSq;
		}

		if (totalKE > 0.001) this.dirty = true;

		if (totalKE < 0.05 && !this.isDragging && !this.isDraggingNode) {
			this.physics = false;
		}
	}

	render() {
		if (!this.dirty && !this.physics) return;

		const ctx = this.ctx;
		const width = this.width;
		const height = this.height;
		const isDark = this.mediaQueryList.matches;

		ctx.clearRect(0, 0, width, height);

		const zoom = this.camera.zoom;
		const invZoom = 1 / zoom;

		ctx.save();
		ctx.translate(this.halfW, this.halfH);
		ctx.scale(zoom, zoom);
		ctx.translate(this.camera.x, this.camera.y);

		const pad = 50;
		const vpMinX = -this.camera.x - this.halfW * invZoom - pad;
		const vpMinY = -this.camera.y - this.halfH * invZoom - pad;
		const vpMaxX = vpMinX + width * invZoom + pad * 2;
		const vpMaxY = vpMinY + height * invZoom + pad * 2;

		const lineWidth = invZoom;

		ctx.strokeStyle = isDark ? "rgba(63, 60, 60, 0.8)" : "rgba(63, 60, 60, 0.1)";
		ctx.lineWidth = lineWidth;
		ctx.beginPath();

		const edges = this.edges;
		for (let i = 0; i < edges.length; i++) {
			const e = edges[i];
			const sx = e.source.x,
				sy = e.source.y;
			const tx = e.target.x,
				ty = e.target.y;
			if ((sx > vpMinX && sx < vpMaxX && sy > vpMinY && sy < vpMaxY) || (tx > vpMinX && tx < vpMaxX && ty > vpMinY && ty < vpMaxY)) {
				ctx.moveTo(sx, sy);
				ctx.lineTo(tx, ty);
			}
		}
		ctx.stroke();

		const nodes = this.nodes;
		const nodeStroke = isDark ? "rgba(255, 234, 209, 1)" : "rgba(19, 17, 17, 1)";
		const twoPi = Math.PI * 2;
		const selectedNode = this.selectedNode;
		const draggedNode = this.draggedNode;

		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			if (node.x < vpMinX || node.x > vpMaxX || node.y < vpMinY || node.y > vpMaxY) continue;

			ctx.beginPath();
			ctx.arc(node.x, node.y, node.size, 0, twoPi);
			ctx.fillStyle = node.bgDark;
			ctx.fill();

			if (node === selectedNode || node === draggedNode) {
				ctx.strokeStyle = nodeStroke;
				ctx.lineWidth = lineWidth;
				ctx.stroke();
			}
		}

		if (zoom > 0.5) {
			const fontSize = Math.max(5, 10 * invZoom);
			ctx.font = `${fontSize}px "Work Sans"`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = isDark ? "#ffead1" : "#131111";

			const textOffset = 15 * invZoom;
			const showAll = zoom > 1.5;

			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i];
				if ((node.size > 8 || showAll) && node.x > vpMinX && node.x < vpMaxX && node.y > vpMinY && node.y < vpMaxY) {
					const label = node.label.length > 15 ? node.label.substring(0, 12) + "\u2026" : node.label;
					ctx.fillText(label, node.x, node.y + node.size + textOffset);
				}
			}
		}

		ctx.restore();
		this.dirty = false;
	}

	startAnimation() {
		if (this.animationId) return;
		const animate = () => {
			if (!this.isPageVisible) {
				this.animationId = null;
				return;
			}
			this.updatePhysics();
			this.render();
			this.animationId = requestAnimationFrame(animate);
		};
		this.animationId = requestAnimationFrame(animate);
	}

	stopAnimation() {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
			this.animationId = null;
		}
	}
}

window.addEventListener("DOMContentLoaded", () => {
	window.graph = new SitemapGraph();
});
