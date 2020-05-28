import { ScheduleGrid } from "../components/schedule/Grid";
// Filip Jelic, Direktor Disic, Djidji djidjalone, Neca pereca, Mica Panika, Zika Rulet, Zoki burgija, Rodja Prangija, Pera Peric, Stefan Bozic, Pera Masic, Sale Ristovic, Testni Korisnik, Jedac Govana, Mica Pantela, Rodja Micic, Decko Tzar
export function shuffleArray(arr: any[]) {
	const array = Array.from(arr);
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
}

export function shuffleArrayTimes(arr: any[], n: number) {
	let array = Array.from(arr);

	while (n !== 0) {
		array = shuffleArray(array);
		n--;
	}

	return array;
}

export function incrementHour(hour: number, forHours: number): number {
	const newHour = hour + forHours;

	if (newHour === 24) {
		return 0;
	}

	if (newHour > 24) {
		return newHour - 24;
	}

	return newHour;
}

export function hourToString(hour: number) {
	if (hour < 10) {
		return `0${hour}`;
	}

	return `${hour}`;
}

export function fillList(list: string[], length: number): string[] {
	const newList = [...list];
	const listLenght = newList.length + 1;

	if (listLenght >= length) {
		return newList;
	}

	const missingInputs = length - listLenght;
	let lastUpdate = 0;

	for (let i = 0; i < missingInputs; i++) {
		if (lastUpdate === 0) {
			newList.push('');
			lastUpdate = 1;
		} else {
			newList.unshift('');
			lastUpdate = 0;
		}
	}

	return newList;
}

export function generateScheduleGrid(startHour: number, employees: string[]): ScheduleGrid {
	const shiftStartTime = startHour;
	const employePerShift = 2;
	const shiftsPerHour = 2;
	const workHours = 8;
	const listLength = workHours * shiftsPerHour * employePerShift;
	const employeeList = fillList(shuffleArrayTimes(employees, 4), listLength);

	return Array.from(Array(workHours).keys()).map((d, i) => {
		const hour = incrementHour(shiftStartTime, i);
		return Array.from(Array(employePerShift).keys()).map((e: any, index: number) => {
			const newEndTime = incrementHour(hour, 1);
			const hourString = hourToString(hour);
			const startTime = index === 0 ? `${hourString}:00` : `${hourString}:30`;
			const endTime = index === 0 ? `${hourString}:30` : `${hourToString(newEndTime)}:00`;

			const increment = index * employePerShift;
			const baseIndex = i * employePerShift * shiftsPerHour + increment;

			return {
				startTime,
				endTime,
				names: [employeeList[baseIndex], employeeList[baseIndex + 1]]
			};
		})
	});
}
