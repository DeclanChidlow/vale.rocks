export default (rating) => {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	const stars = "■".repeat(fullStars) + (hasHalfStar ? "◧" : "") + "□".repeat(emptyStars);
	return stars;
};
