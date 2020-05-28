import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from "@material-ui/core";
import { InputSection } from './input-section/InputSection';
import { Schedule } from './schedule/Schedule';
import { generateScheduleGrid } from '../util/util';
import { ScheduleGrid } from './schedule/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(1),
		background: theme.palette.grey.A700,
	},
	header: {
		display: 'flex',
		flex: 1,
		background: theme.palette.background.default,
		color: theme.palette.grey.A400,
		padding: theme.spacing(2),
		borderRadius: theme.spacing(1),
		flexDirection: 'column'
	},
	paper: {
		padding: theme.spacing(1)
	},
	headingText: {
		margin: `${theme.spacing(0)}px 0 ${theme.spacing(.5)}px 0`,
		marginLeft: 0
	},
	headingExplanation: {
		margin: theme.spacing(0),
	},
	gridContainer: {
		padding: theme.spacing(2),
		background: theme.palette.background.default,
		borderRadius: theme.spacing(1),
		margin: `${theme.spacing(1)}px 0`,
		width: 'auto'
	}
}));

function App() {
	const classes = useStyles();
	const [shiftStartHour, updateShiftStartHour] = useState<number>(8);
	const [employees, updateEmployes] = useState<string[]>([]);
	const [employeeShiftGrid, updateShiftGrid] = useState<ScheduleGrid>([]);

	const addEmploye = (emp: string) => {
		employees.push(emp);
		updateEmployes(employees);
	}

	const generateGrid = () => {
		const newGrid = generateScheduleGrid(shiftStartHour, employees);
		updateShiftGrid(newGrid);
	}

	return (
		<Container className={classes.root}>
			<div className={classes.header}>
				<h1 className={classes.headingText}>Employee Break Sorter</h1>
				<p className={classes.headingExplanation}>Insert list of names of people and start time for a shift that lasts
					8h.</p>
			</div>
			<Grid justify="space-between" container className={classes.gridContainer} spacing={1}>
				<Grid item xs={12} md={6}>
					<Paper className={classes.paper}>
						<InputSection
							employes={employees}
							addEmploye={addEmploye}
							generateGrid={generateGrid}
							clearList={() => {updateEmployes([])}}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper className={classes.paper}>
						<Schedule
							shiftStartHour={shiftStartHour}
							updateShiftStartHour={updateShiftStartHour}
							employeeShiftGrid={employeeShiftGrid}
						/>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

export default App;
