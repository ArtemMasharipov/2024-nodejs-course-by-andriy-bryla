export const getCurrentSeason = () => {
	const month = new Date().getMonth();
	const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
	return seasons[Math.floor((month + 1) % 12 / 3)];
};

export const getCurrentDay = () => {
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return daysOfWeek[new Date().getDay()];
};

export const getTimeOfDay = () => {
	const hour = new Date().getHours();

	return hour < 12
		? "Morning"
		: hour < 18
			? "Afternoon"
			: "Evening";
};

