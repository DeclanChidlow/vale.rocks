function getStatusText(status) {
	switch (status) {
		case "up":
			return "Operational";
		case "down":
			return "Outage";
		case "degraded":
			return "Performance Issues";
		default:
			return "Unknown";
	}
}

function createStatusCard(service) {
	return `<span class="${service.status}">${getStatusText(service.status)} | ${service.uptime} Overall Uptime</span>`;
}

function updateDashboard() {
	services.forEach((service) => {
		const serviceName = service.name.toLowerCase().replace(/\s+/g, '-');
		const serviceContainer = document.getElementById(`service-${serviceName}`);
		if (serviceContainer) {
			serviceContainer.innerHTML = createStatusCard(service);
		}
	});
}

async function fetchServiceStatus() {
	const response = await fetch("https://raw.githubusercontent.com/DeclanChidlow/status/refs/heads/master/history/summary.json");
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
	services = data;
	updateDashboard();
}

fetchServiceStatus();
