window.addEventListener("DOMContentLoaded", () => {
	const input = document.querySelector(".pf-input");
	const filterPane = document.querySelector("pagefind-filter-pane");

	const syncToUrl = () => {
		const params = new URLSearchParams();
		const query = input?.value.trim();

		if (query) params.set("q", query);

		document.querySelectorAll(".pf-checkbox-input:checked").forEach((cb) => {
			params.append(cb.name, cb.value);
		});

		const newUrl = `${window.location.pathname}${params.size ? "?" + params : ""}`;
		window.history.replaceState({}, "", newUrl);
	};

	const params = new URLSearchParams(window.location.search);
	if (input && params.has("q")) {
		input.value = params.get("q");
	}
	input?.focus();

	const syncToUI = () => {
		const deferredParams = new URLSearchParams(window.location.search);

		if (input && deferredParams.has("q")) {
			input.dispatchEvent(new Event("input", { bubbles: true }));
		}

		document.querySelectorAll(".pf-checkbox-input").forEach((cb) => {
			if (deferredParams.getAll(cb.name).includes(cb.value)) {
				cb.checked = true;
				cb.dispatchEvent(new Event("change", { bubbles: true }));
				cb.closest("details") && (cb.closest("details").open = true);
			}
		});
	};

	input?.addEventListener("input", syncToUrl);

	document.addEventListener("click", (e) => {
		if (e.target.matches(".pf-input-clear")) syncToUrl();
	});

	document.addEventListener("change", (e) => {
		if (e.target.matches(".pf-checkbox-input")) syncToUrl();
	});

	if (filterPane) {
		const observer = new MutationObserver(() => {
			if (filterPane.querySelector(".pf-checkbox-input")) {
				syncToUI();
				observer.disconnect();
			}
		});
		observer.observe(filterPane, { childList: true, subtree: true });
	} else {
		syncToUI();
	}
});
