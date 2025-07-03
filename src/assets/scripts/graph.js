class SitemapGraph {
	constructor() {
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.info = document.getElementById("info");
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
		this.touchTapThreshold = 300; // ms
		this.touchMoveThreshold = 10; // pixels

		this.setupCanvas();
		this.setupEventListeners();
		this.loadSitemap();
	}

	setupCanvas() {
		const resize = () => {
			const containerRect = this.container.getBoundingClientRect();
			const containerWidth = containerRect.width;
			const containerHeight = containerRect.height;

			this.canvas.width = containerWidth * devicePixelRatio;
			this.canvas.height = containerHeight * devicePixelRatio;
			this.canvas.style.width = containerWidth + "px";
			this.canvas.style.height = containerHeight + "px";
			this.ctx.scale(devicePixelRatio, devicePixelRatio);
		};
		resize();
		window.addEventListener("resize", resize);
	}

	setupEventListeners() {
		this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
		this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
		this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
		this.canvas.addEventListener("wheel", this.onWheel.bind(this));

		this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this), { passive: false });
		this.canvas.addEventListener("touchmove", this.onTouchMove.bind(this), { passive: false });
		this.canvas.addEventListener("touchend", this.onTouchEnd.bind(this));
		this.canvas.addEventListener("touchcancel", this.onTouchEnd.bind(this));

		this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());

		this.mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
		this.mediaQueryList.addEventListener("change", this.render.bind(this));
	}

	async loadSitemap() {
		try {
			const response = await fetch("/sitemap.xml");
			if (!response.ok) throw new Error(`HTTP ${response.status}`);

			const xmlText = await response.text();
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(xmlText, "text/xml");

			const urls = Array.from(xmlDoc.querySelectorAll("url loc")).map((loc) => loc.textContent);

			if (urls.length === 0) {
				throw new Error("No URLs found in sitemap");
			}

			this.buildGraph(urls);
			this.startAnimation();
		} catch (error) {
			console.error(`Error loading sitemap: ${error.message}`);
		}
	}

	buildGraph(urls) {
		const urlMap = new Map();

		// Filter out paginated URLs
		const filteredUrls = urls.filter((url) => {
			const urlObj = new URL(url);
			const pathSegments = urlObj.pathname.split("/").filter((segment) => segment.length > 0);

			return !pathSegments.some((segment) => /^\d+$/.test(segment));
		});

		filteredUrls.forEach((url) => {
			const urlObj = new URL(url);
			const pathParts = urlObj.pathname.split("/").filter((part) => part.length > 0);

			// Handle root case - ensure we always have at least one path segment
			const allParts = pathParts.length === 0 ? [""] : pathParts;

			let currentPath = "";
			let parentNode = null;

			allParts.forEach((part, depth) => {
				currentPath += "/" + part;

				if (!urlMap.has(currentPath)) {
					const node = {
						id: currentPath,
						url: urlObj.origin + currentPath,
						label: part || "landing",
						x: Math.random() * 800 - 400,
						y: Math.random() * 600 - 300,
						vx: 0,
						vy: 0,
						depth,
						connections: 0,
						size: 0,
						pinned: false,
					};

					this.nodes.push(node);
					urlMap.set(currentPath, node);

					// Create edge to parent if it exists
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

		// Calculate node sizes based on connections
		this.nodes.forEach((node) => {
			// Make isolated nodes (individual pages) bigger
			if (node.connections === 0) {
				node.size = 12;
			} else {
				node.size = Math.max(4, Math.min(20, 4 + node.connections * 2));
			}
		});
	}

	onTouchStart(e) {
		e.preventDefault();
		this.hasInteracted = true;
		this.touchStartTime = Date.now();

		// Clear existing touches and add current ones
		this.touches.clear();
		for (let i = 0; i < e.touches.length; i++) {
			const touch = e.touches[i];
			const rect = this.canvas.getBoundingClientRect();
			this.touches.set(touch.identifier, {
				x: touch.clientX - rect.left,
				y: touch.clientY - rect.top,
				startX: touch.clientX - rect.left,
				startY: touch.clientY - rect.top,
			});
		}

		if (e.touches.length === 1) {
			// Single touch - potential drag or node selection
			const touch = Array.from(this.touches.values())[0];
			const worldPos = this.screenToWorld(touch.x, touch.y);
			const touchedNode = this.getNodeAt(worldPos.x, worldPos.y);

			if (touchedNode) {
				this.selectedNode = touchedNode;
				this.draggedNode = touchedNode;
				this.isDraggingNode = true;
				this.dragOffset = {
					x: worldPos.x - touchedNode.x,
					y: worldPos.y - touchedNode.y,
				};

				// Pin the node so physics don't interfere while dragging
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
			// Two touches - start pinch zoom
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

		// Update touch positions
		for (let i = 0; i < e.touches.length; i++) {
			const touch = e.touches[i];
			if (this.touches.has(touch.identifier)) {
				const rect = this.canvas.getBoundingClientRect();
				const touchData = this.touches.get(touch.identifier);
				touchData.x = touch.clientX - rect.left;
				touchData.y = touch.clientY - rect.top;
			}
		}

		if (e.touches.length === 1 && !this.isPinching) {
			// Single touch movement
			const touch = Array.from(this.touches.values())[0];

			if (this.isDraggingNode && this.draggedNode) {
				// Drag the node
				const worldPos = this.screenToWorld(touch.x, touch.y);
				this.draggedNode.x = worldPos.x - this.dragOffset.x;
				this.draggedNode.y = worldPos.y - this.dragOffset.y;
			} else if (this.isDragging && !this.selectedNode) {
				// Pan the camera
				const dx = (touch.x - this.dragStart.x) / this.camera.zoom;
				const dy = (touch.y - this.dragStart.y) / this.camera.zoom;

				this.camera.x += dx;
				this.camera.y += dy;

				this.dragStart = { x: touch.x, y: touch.y };
			}
		} else if (e.touches.length === 2 && this.isPinching) {
			// Two touch movement - pinch zoom
			const touches = Array.from(this.touches.values());
			const dx = touches[1].x - touches[0].x;
			const dy = touches[1].y - touches[0].y;
			const currentDistance = Math.sqrt(dx * dx + dy * dy);

			if (this.lastTouchDistance > 0) {
				// Calculate zoom center (midpoint between touches)
				const centerX = (touches[0].x + touches[1].x) / 2;
				const centerY = (touches[0].y + touches[1].y) / 2;
				const worldPos = this.screenToWorld(centerX, centerY);

				// Calculate zoom factor
				const zoomFactor = currentDistance / this.lastTouchDistance;
				const newZoom = Math.max(0.1, Math.min(5, this.camera.zoom * zoomFactor));

				// Apply zoom with center point
				const zoomRatio = newZoom / this.camera.zoom;
				this.camera.x = worldPos.x - (worldPos.x - this.camera.x) * zoomRatio;
				this.camera.y = worldPos.y - (worldPos.y - this.camera.y) * zoomRatio;
				this.camera.zoom = newZoom;
			}

			this.lastTouchDistance = currentDistance;
		}
	}

	onTouchEnd(e) {
		const touchDuration = Date.now() - this.touchStartTime;

		// Handle tap gesture (quick touch without much movement)
		if (e.touches.length === 0 && touchDuration < this.touchTapThreshold) {
			const touch = Array.from(this.touches.values())[0];
			if (touch) {
				const moveDistance = Math.sqrt(Math.pow(touch.x - touch.startX, 2) + Math.pow(touch.y - touch.startY, 2));

				if (moveDistance < this.touchMoveThreshold) {
					// This was a tap, not a drag
					const worldPos = this.screenToWorld(touch.x, touch.y);
					const tappedNode = this.getNodeAt(worldPos.x, worldPos.y);

					if (tappedNode && tappedNode.url) {
						window.location.href = tappedNode.url;
					}
				}
			}
		}

		// Clean up drag states
		if (this.isDraggingNode && this.draggedNode) {
			this.draggedNode.pinned = false;
		}

		this.isDragging = false;
		this.isDraggingNode = false;
		this.isPinching = false;
		this.draggedNode = null;
		this.lastTouchDistance = 0;

		// Clear touches that ended
		const activeTouchIds = new Set();
		for (let i = 0; i < e.touches.length; i++) {
			activeTouchIds.add(e.touches[i].identifier);
		}

		for (const [id] of this.touches) {
			if (!activeTouchIds.has(id)) {
				this.touches.delete(id);
			}
		}
	}

	onMouseDown(e) {
		this.hasInteracted = true;

		const rect = this.canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const worldPos = this.screenToWorld(x, y);
		const clickedNode = this.getNodeAt(worldPos.x, worldPos.y);

		if (clickedNode) {
			this.selectedNode = clickedNode;
			this.draggedNode = clickedNode;
			this.isDraggingNode = true;
			this.dragOffset = {
				x: worldPos.x - clickedNode.x,
				y: worldPos.y - clickedNode.y,
			};

			// Pin the node so physics don't interfere while dragging
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
		this.mousePos = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};

		if (this.isDraggingNode && this.draggedNode) {
			// Drag the node
			const worldPos = this.screenToWorld(this.mousePos.x, this.mousePos.y);
			this.draggedNode.x = worldPos.x - this.dragOffset.x;
			this.draggedNode.y = worldPos.y - this.dragOffset.y;
		} else if (this.isDragging && !this.selectedNode) {
			// Pan the camera
			const dx = (e.clientX - this.dragStart.x) / this.camera.zoom;
			const dy = (e.clientY - this.dragStart.y) / this.camera.zoom;

			this.camera.x += dx;
			this.camera.y += dy;

			this.dragStart = { x: e.clientX, y: e.clientY };
		}

		// Update cursor based on hover state
		const worldPos = this.screenToWorld(this.mousePos.x, this.mousePos.y);
		const hoveredNode = this.getNodeAt(worldPos.x, worldPos.y);

		if (!this.isDraggingNode && !this.isDragging) {
			this.canvas.style.cursor = hoveredNode ? "pointer" : "grab";
		}
	}

	onMouseUp() {
		if (this.isDraggingNode && this.draggedNode) {
			this.draggedNode.pinned = false;
		}

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

		const worldBeforeZoom = this.screenToWorld(mouseX, mouseY);
		const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
		const newZoom = Math.max(0.1, Math.min(5, this.camera.zoom * zoomFactor));

		this.camera.zoom = newZoom;

		const worldAfterZoom = this.screenToWorld(mouseX, mouseY);
		this.camera.x += worldBeforeZoom.x - worldAfterZoom.x;
		this.camera.y += worldBeforeZoom.y - worldAfterZoom.y;
	}

	screenToWorld(screenX, screenY) {
		return {
			x: (screenX - this.canvas.width / (2 * devicePixelRatio)) / this.camera.zoom - this.camera.x,
			y: (screenY - this.canvas.height / (2 * devicePixelRatio)) / this.camera.zoom - this.camera.y,
		};
	}

	worldToScreen(worldX, worldY) {
		return {
			x: (worldX + this.camera.x) * this.camera.zoom + this.canvas.width / (2 * devicePixelRatio),
			y: (worldY + this.camera.y) * this.camera.zoom + this.canvas.height / (2 * devicePixelRatio),
		};
	}

	getNodeAt(worldX, worldY) {
		return this.nodes.find((node) => {
			const dx = worldX - node.x;
			const dy = worldY - node.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			return distance < node.size + 5;
		});
	}

	showNodeInfo(node) {
		document.getElementById("info").innerHTML = `<a href="${node.url}">${node.url}</a>`;
		this.info.style.display = "block";
	}

	updatePhysics() {
		if (!this.physics) return;

		const damping = 0.9;
		const repulsion = 50000;
		const attraction = 0.05;
		const centerForce = 0.000075;
		const maxVelocity = 3;

		// Apply forces only to non-pinned nodes
		this.nodes.forEach((node) => {
			if (node.pinned) return;

			// Repulsion between nodes
			this.nodes.forEach((other) => {
				if (node === other) return;

				const dx = node.x - other.x;
				const dy = node.y - other.y;
				const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
				const force = repulsion / (distance * distance);

				if (distance < 250) {
					node.vx += (dx / distance) * force * 0.005;
					node.vy += (dy / distance) * force * 0.005;
				}
			});

			// Very gentle centre attraction only if node is far from centre
			const distFromCenter = Math.sqrt(node.x * node.x + node.y * node.y);
			if (distFromCenter > 300) {
				node.vx -= node.x * centerForce;
				node.vy -= node.y * centerForce;
			}
		});

		// Spring forces for edges
		this.edges.forEach((edge) => {
			// Apply forces only if both nodes aren't pinned
			const dx = edge.target.x - edge.source.x;
			const dy = edge.target.y - edge.source.y;
			const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
			const idealDistance = 60 + edge.target.depth * 40;
			const force = (distance - idealDistance) * attraction * edge.strength;

			const fx = (dx / distance) * force;
			const fy = (dy / distance) * force;

			if (!edge.source.pinned) {
				edge.source.vx += fx * 0.5;
				edge.source.vy += fy * 0.5;
			}
			if (!edge.target.pinned) {
				edge.target.vx -= fx * 0.5;
				edge.target.vy -= fy * 0.5;
			}
		});

		// Update positions with velocity limiting
		this.nodes.forEach((node) => {
			if (node.pinned) return;

			node.vx *= damping;
			node.vy *= damping;

			// Limit velocity to prevent explosion
			const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
			if (speed > maxVelocity) {
				node.vx = (node.vx / speed) * maxVelocity;
				node.vy = (node.vy / speed) * maxVelocity;
			}

			node.x += node.vx;
			node.y += node.vy;
		});
	}

	render() {
		const ctx = this.ctx;
		const width = this.canvas.width / devicePixelRatio;
		const height = this.canvas.height / devicePixelRatio;
		const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

		ctx.clearRect(0, 0, width, height);
		ctx.save();

		ctx.translate(width / 2, height / 2);
		ctx.scale(this.camera.zoom, this.camera.zoom);
		ctx.translate(this.camera.x, this.camera.y);

		ctx.strokeStyle = isDarkMode ? "rgba(63, 60, 60, 0.8)" : "rgba(63, 60, 60, 0.2)";
		ctx.lineWidth = 1 / this.camera.zoom;

		this.edges.forEach((edge) => {
			ctx.beginPath();
			ctx.moveTo(edge.source.x, edge.source.y);
			ctx.lineTo(edge.target.x, edge.target.y);
			ctx.stroke();
		});

		this.nodes.forEach((node) => {
			const isSelected = node === this.selectedNode;
			const isDragged = node === this.draggedNode;

			let baseColor = "94, 90, 90"; // Default grey
			const pathParts = node.id.split("/").filter((part) => part.length > 0);

			if (pathParts.length > 0) {
				const firstDir = pathParts[0].toLowerCase();
				switch (firstDir) {
					case "posts":
						baseColor = "226, 54, 114";
						break;
					case "portfolio":
						baseColor = "245, 110, 0";
						break;
					case "micros":
						baseColor = "55, 120, 192";
						break;
					case "photography":
						baseColor = "88, 165, 81";
						break;
					case "videos":
						baseColor = "241, 55, 49";
						break;
					case "links":
						baseColor = "44, 183, 188";
						break;
				}
			}

			const opacity = Math.max(0.3, 1 - node.depth * 0.15);

			ctx.fillStyle = `rgba(${baseColor}, ${opacity})`;

			if (isSelected || isDragged) {
				ctx.strokeStyle = isDarkMode ? "rgba(255, 234, 209, 1)" : "rgba(19, 17, 17, 1)";
			} else {
				ctx.strokeStyle = isDarkMode ? "rgba(63, 60, 60, 0.8)" : "rgba(63, 60, 60, 0.2)";
			}
			ctx.lineWidth = 1 / this.camera.zoom;

			ctx.beginPath();
			ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
			ctx.fill();
			ctx.stroke();

			if ((node.size > 8 || this.camera.zoom > 1.5) && this.camera.zoom > 0.5) {
				ctx.font = `${Math.max(5, 10 / this.camera.zoom)}px "Work Sans"`;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";

				const label = node.label.length > 15 ? node.label.substring(0, 12) + "..." : node.label;
				ctx.fillStyle = isDarkMode ? "#ffead1" : "#131111";
				ctx.fillText(label, node.x, node.y + node.size + 15 / this.camera.zoom);
			}
		});

		ctx.restore();
	}

	startAnimation() {
		const animate = () => {
			this.updatePhysics();
			this.render();
			requestAnimationFrame(animate);
		};
		animate();
	}
}

window.addEventListener("DOMContentLoaded", () => {
	window.graph = new SitemapGraph();
});
