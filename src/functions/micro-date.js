export default (dateString) => {
	// Extract the date and time parts from the input string
	const datePart = dateString.slice(0, 8); // "20240614"
	const timePart = dateString.slice(9); // "1329"

	// Format the date
	const year = datePart.slice(0, 4); // "2024"
	const month = datePart.slice(4, 6); // "06"
	const day = datePart.slice(6); // "14"

	// Format the time
	const hours = timePart.slice(0, 2); // "13"
	const minutes = timePart.slice(2); // "29"

	// Construct the desired format
	return `${year}-${month}-${day}T${hours}:${minutes}`;
};
