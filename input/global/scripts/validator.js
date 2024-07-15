document.addEventListener("DOMContentLoaded", function () {
	const validateButton = document.getElementById("validateButton"),
		showSourceCheckbox = document.getElementById("showSource");

	validateButton.addEventListener("click", validate);
	showSourceCheckbox.addEventListener("change", toggleSource);

	async function validate() {
		const url = document.getElementById("url").value,
			html = document.getElementById("html").value,
			userAgent = document.getElementById("userAgent").value,
			outputFormat = document.getElementById("outputFormat").value,
			resultsDiv = document.getElementById("results"),
			sourceContainer = document.getElementById("source");

		resultsDiv.textContent = "Validating...";

		try {
			let response;
			const headers = {
				"Content-Type": "text/html; charset=utf-8",
			};

			if (userAgent) {
				headers["User-Agent"] = userAgent;
			}

			let validatorUrl = `https://validator.w3.org/nu/?out=${outputFormat}`;

			if (url) {
				validatorUrl += `&doc=${encodeURIComponent(url)}`;
				response = await axios.get(validatorUrl, { headers });
			} else if (html) {
				response = await axios.post(validatorUrl, html, { headers });
			} else {
				resultsDiv.textContent = "Please enter content to validate.";
				return;
			}

			if (outputFormat === "json") {
				displayJSONResults(response.data, resultsDiv);
			} else if (outputFormat === "html") {
				const tempDiv = document.createElement("div");
				tempDiv.innerHTML = response.data;
				const resultsContent = tempDiv.querySelector("#results");
				if (resultsContent) {
					resultsDiv.innerHTML = resultsContent.innerHTML;
				} else {
					resultsDiv.innerHTML = response.data;
				}
			} else {
				resultsDiv.textContent = response.data;
			}

			if (showSourceCheckbox.checked) {
				sourceContainer.textContent = url ? await fetchSourceHTML(url) : html;
			}
		} catch (error) {
			resultsDiv.textContent = `Error: ${error.message}`;
		}
	}

	function displayJSONResults(data, resultsDiv) {
		const messages = data.messages;
		if (messages.length === 0) {
			resultsDiv.textContent = "Document checking completed. No errors or warnings to show.";
		} else {
			resultsDiv.innerHTML = escapeHTML(JSON.stringify(messages, null, 2));
		}
	}

	function escapeHTML(str) {
		return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	}

	async function fetchSourceHTML(url) {
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (error) {
			return `Error fetching source HTML: ${error.message}`;
		}
	}

	function toggleSource() {
		const showSource = document.getElementById("showSource").checked,
			sourceSection = document.getElementById("source-section");

		sourceSection.style.display = showSource ? "block" : "none";
	}
});
