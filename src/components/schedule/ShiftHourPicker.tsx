import React, { ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: '75px',
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

interface ShiftHourPickerProps {
	label: string;
	hour: number;
	onHourUpdate: (hour: number) => void;
}

function getHourString(hour: number) {
	const newHour = hour < 10 ? `0${hour}` : hour;
	return `${newHour}h`;
}

export function ShiftHourPicker(props: ShiftHourPickerProps) {
	const classes = useStyles();
	const onHourChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
		props.onHourUpdate(event.target.value as number);
	};

	return (
		<FormControl className={classes.formControl}>
			<InputLabel>{props.label}</InputLabel>
			<Select
				value={props.hour}
				onChange={onHourChange}
			>
				{Array.from(Array(24).keys()).map((_d, i) => (
					<MenuItem key={i} value={i}>{getHourString(i)}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
