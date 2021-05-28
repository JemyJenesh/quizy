import { useRef, useEffect, useState } from "react";

const useCountDown = (count = 10) => {
	const [time, setTime] = useState(count);

	let intervalRef = useRef();

	const start = () => {
		setTime(count);
		let currentTime = count;
		intervalRef.current = setInterval(() => {
			currentTime--;
			setTime(currentTime);
			if (currentTime === 0) clearInterval(intervalRef.current);
		}, 1000);
	};

	useEffect(() => {
		return () => clearInterval(intervalRef.current);
	}, []);

	return { time, start };
};

export default useCountDown;
