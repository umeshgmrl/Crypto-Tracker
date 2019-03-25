import React from "react";

export const renderPercentCell = percentChange => {
	if (percentChange[0] === "-") {
		return <span className="percent-down">{percentChange}% ↓</span>;
	}
	return <span className="percent-up">{percentChange}% ↑</span>;
};
