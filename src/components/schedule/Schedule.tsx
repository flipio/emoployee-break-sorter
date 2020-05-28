import React  from 'react';
import { styled, makeStyles } from '@material-ui/core';
import { Grid, ScheduleGrid } from './Grid';
import { ShiftHourPicker } from './ShiftHourPicker';

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

const TimeWrapper = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	padding: '8px',
	alignItems: 'center'
});

interface ScheduleProps {
	employeeShiftGrid: ScheduleGrid;
	updateShiftStartHour: (hour: number) => void;
	shiftStartHour: number;
}

export function Schedule(props: ScheduleProps) {
	const classes = useStyles();

	const onUpdateTime = (time: number) => {
		props.updateShiftStartHour(time)
	};

	return (
		<div className={classes.container}>
			<div>
				<div className={classes.heading}>Schedule</div>
				<TimeWrapper>
					<ShiftHourPicker
						label={'Shift start hour'}
						hour={props.shiftStartHour}
						onHourUpdate={onUpdateTime}
					/>
				</TimeWrapper>
			</div>
			<Grid grid={props.employeeShiftGrid}/>
		</div>
	);
}
