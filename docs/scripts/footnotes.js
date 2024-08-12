document.addEventListener("DOMContentLoaded", () => {
	const footnoteReferences = document.querySelectorAll(".footnote-reference a"),
		sidenoteContainer = document.createElement("div");
	sidenoteContainer.className = "sidenote-container";
	document.body.appendChild(sidenoteContainer);

	const createPopover = (content) => {
		const popover = document.createElement("div");
		popover.className = "footnote-popover";
		popover.innerHTML = content;
		return popover;
	};

	const toggleHighlight = (element, action) => {
		element.classList[action]("highlight");
	};

	const positionSidenote = (sidenote, reference, index) => {
		if (window.innerWidth >= 1140) {
			const rect = reference.getBoundingClientRect();
			let top = rect.top + window.scrollY;
			if (index > 0) {
				const prevSidenote = sidenoteContainer.children[index - 1],
					prevBottom = prevSidenote.offsetTop + prevSidenote.offsetHeight;
				if (top < prevBottom) {
					top = prevBottom + 10;
				}
			}
			sidenote.style.top = `${top}px`;
		}
	};

	const handlePopoverToggle = (e, reference, popover) => {
		e.preventDefault();
		const isVisible = popover.style.display === "block";
		popover.style.display = isVisible ? "none" : "block";
		if (!isVisible) {
			const rect = reference.getBoundingClientRect(),
				container = reference.closest("div");
			popover.style.width = `${container.getBoundingClientRect().width}px`;
			popover.style.top = `calc(${rect.bottom + window.scrollY}px + 0.5rem)`;
		}
	};

	footnoteReferences.forEach((reference, index) => {
		const footnoteId = reference.getAttribute("href").substring(1),
			footnoteContent = document.getElementById(footnoteId).innerHTML;

		const sidenote = document.createElement("div");
		sidenote.className = "sidenote";
		sidenote.innerHTML = footnoteContent;
		sidenoteContainer.appendChild(sidenote);

		const popover = createPopover(footnoteContent);
		reference.parentNode.appendChild(popover);

		["mouseenter", "mouseleave"].forEach((event) => {
			reference.addEventListener(event, () => toggleHighlight(sidenote, event === "mouseenter" ? "add" : "remove"));
			sidenote.addEventListener(event, () => toggleHighlight(reference, event === "mouseenter" ? "add" : "remove"));
		});

		reference.addEventListener("click", (e) => handlePopoverToggle(e, reference, popover));

		const updatePosition = () => positionSidenote(sidenote, reference, index);
		window.addEventListener("load", updatePosition);
		window.addEventListener("resize", updatePosition);
	});

	document.addEventListener("click", (e) => {
		if (!e.target.closest(".footnote-reference") && !e.target.closest(".footnote-popover")) {
			document.querySelectorAll(".footnote-popover").forEach((popover) => (popover.style.display = "none"));
		}
	});
});
