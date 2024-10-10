export const filterByDateRange = (data, rangeStart, rangeEnd) => {
	const startDate = rangeStart || null;
	const endDate = rangeEnd || null;

	return data.filter((item) => {
		const itemStartDate = item.attributes.Dates.StartDate; // Assumes format is 'YYYY-MM-DD'
		const itemEndDate = item.attributes.Dates.EndDate || itemStartDate; // Use startDate if endDate is null

		// No filter applied if both rangeStart and rangeEnd are null
		if (!startDate && !endDate) {
			return true;
		}

		// If endDate is null, filter for items starting from startDate
		if (startDate && !endDate) {
			return itemStartDate >= startDate || itemEndDate >= startDate;
		}

		// If startDate is null, filter for items ending before or on endDate
		if (!startDate && endDate) {
			return itemEndDate <= endDate;
		}

		// If both startDate and endDate are provided, filter within the range
		return (
			(itemStartDate >= startDate && itemStartDate <= endDate) || // Start date within range
			(itemEndDate >= startDate && itemEndDate <= endDate) || // End date within range
			(itemStartDate <= startDate && itemEndDate >= endDate) || // Event spans entire range
			(itemEndDate === itemStartDate &&
				itemStartDate >= startDate &&
				itemStartDate <= endDate) // No end date, event happens on start date
		);
	});
};
