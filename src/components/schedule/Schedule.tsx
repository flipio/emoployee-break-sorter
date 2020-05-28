import React  from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid, ScheduleGrid } from './Grid';

const useStyles = makeStyles((theme) => ({
	heading: {
		padding: `${theme.spacing(1)}px`
	},
	shiftStart: {
		marginRight: theme.spacing(1),
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
	}
}));

interface ScheduleProps {
	employeeShiftGrid: ScheduleGrid;
}

export function Schedule(props: ScheduleProps) {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.heading}>Schedule</div>
			<Grid grid={props.employeeShiftGrid}/>
		</div>
	);
}
