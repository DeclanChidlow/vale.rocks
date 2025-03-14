export default (dateString) => {
	const datePart = dateString.slice(0, 8);
	const timePart = dateString.slice(9);

	const year = datePart.slice(0, 4);
	const month = datePart.slice(4, 6);
	const day = datePart.slice(6);

	const hours = timePart.slice(0, 2);
	const minutes = timePart.slice(2);

	return `${year}-${month}-${day}T${hours}:${minutes}Z`;
};
