import React from 'react';
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
	gridContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
	},
	gridRow: {
		display: 'flex',
		flexDirection: 'row',
	},
	gridItem: {
		display: 'flex',
		flex: ' 1 50%',
		flexDirection: 'column',
		minHeight: '30px',
		borderRadius: `${theme.spacing(.5)}px`,
		border: `1px solid ${theme.palette.grey['500']}`,
		margin: `${theme.spacing(.5)}px`,
		padding: `${theme.spacing(.5)}px`,
	},
	labels: {
		flexDirection: 'row',
		display: 'flex',
		justifyContent: 'space-between',
	},
	itemLabel: {
		...theme.typography.subtitle2,
		fontWeight: theme.typography.fontWeightLight,
	},
}));

export interface ScheduleGridRowItem {
	startTime: string;
	endTime: string;
	names: string[]
}

export type ScheduleGridRow = ScheduleGridRowItem[];
export type ScheduleGrid = ScheduleGridRow[];

interface GridProps {
	grid: ScheduleGrid;
}

export function Grid(props: GridProps) {
	const { grid } = props;
	const classes = useStyles();

	return (
		<div className={classes.gridContainer}>
			{grid.map((row, index) => {
				return (
					<div key={index} className={classes.gridRow}>
						{row.map((item, itemIndex) => (
							<div key={itemIndex} className={classes.gridItem}>
								<div className={classes.labels}>
									<span className={classes.itemLabel}>Start time: {item.startTime}</span>
									<span className={classes.itemLabel}>End time: {item.endTime}</span>
								</div>
								{item.names.map((name, nameIndex) => (
									<div key={nameIndex}>{name}</div>
								))}
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
}
