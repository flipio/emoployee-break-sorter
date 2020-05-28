import React, { ChangeEvent, Fragment, useRef, useState } from 'react';
import { Input, IconButton, styled, InputLabel, Button } from '@material-ui/core';
import { AddCircle, DeleteForever } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ShiftHourPicker } from '../schedule/ShiftHourPicker';

const EmployeeRow = styled('div')({
	margin: '4px 0',
	display: 'flex',
	alignItems: 'center',
});

const NoEmployees = styled('div')({
	margin: '12px 0 8px 0'
});

const NewEmployeeRow = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
});

const NamesWrapper = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	padding: '4px',
	maxHeight: '200px',
	flex: 1,
	flexWrap: 'wrap',
	lineHeight: '0.8em'
});

const Label = styled(InputLabel)({
	alignItems: 'center',
	display: 'flex',
	marginRight: '4px',
	justifyContent: 'flex-start',
});

const SmallBtn = styled(Button)({
	fontSize: '0.68em',
	maxHeight: '32px',
});

const ClearBtn = styled(SmallBtn)({
	marginLeft: '4px',
});

const ActionsGroup = styled('div')({
	margin: '8px 0',
	justifyContent: 'flex-end',
	display: 'flex',
	paddingRight: '8px'
});

const Header = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
});

const TimeWrapper = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	padding: '8px',
	alignItems: 'center'
});

const RemoveEmployee = styled('span')({
	marginLeft: '8px',
	cursor: 'pointer',
});

function renderName(name: string, index: number, onRemove: () => void) {
	return (
		<EmployeeRow key={index}>{name} <RemoveEmployee><DeleteForever fontSize="small" onClick={onRemove}/></RemoveEmployee></EmployeeRow>
	);
}

function renderNoEmployees() {
	return (
		<NoEmployees>
			<Label>There are no Employees.</Label>
		</NoEmployees>
	);
}

interface InputSectionProps {
	employes: string[];
	addEmploye: (employee: string) => void;
	generateGrid: () => void;
	clearList: () => void;
	updateShiftStartHour: (hour: number) => void;
	shiftStartHour: number;
	removeEmployee: (index: number) => void;
}

export function InputSection(props: InputSectionProps) {
	const {addEmploye, employes, removeEmployee } = props;
	const [newName, updateName] = useState<string>('');
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));
	const inputEl = useRef<HTMLInputElement>(null);

	const addNewName = () => {
		const names = newName.length > 0 ? newName.split(',') : [];
		names.forEach((name) => name && name.length > 0 ? addEmploye(name) : '');
		updateName('');
		setTimeout(() => {
			const node = inputEl.current as HTMLInputElement;
			node.focus();
		}, 50);
	};

	return (
		<div>
			<Header>
				<h3>Employee List: </h3>
				<TimeWrapper>
					<ShiftHourPicker
						label={'Shift start'}
						hour={props.shiftStartHour}
						onHourUpdate={props.updateShiftStartHour}
					/>
				</TimeWrapper>
			</Header>
			<NamesWrapper>
				{employes.length === 0 ? (
					renderNoEmployees()
				) : (
					<Fragment>
						{employes.map((d, i) => renderName(d, i, () => removeEmployee(i)))}
					</Fragment>
				)}
			</NamesWrapper>
			<NewEmployeeRow>
				<Label>Add Employee: </Label>
				<Input ref={inputEl} id="name-input" aria-describedby="name-input"
							 onChange={(e: ChangeEvent<HTMLInputElement>) => updateName(e.currentTarget.value)} value={newName}/>
				<IconButton onClick={addNewName}><AddCircle/></IconButton>
				{matches && (
					<Fragment>
						<SmallBtn variant="outlined" color="default" size="small" onClick={props.generateGrid}>
							Generate
						</SmallBtn>
						<ClearBtn variant="outlined" color="default" size="small" onClick={props.clearList}>
							clear
						</ClearBtn>
					</Fragment>
				)}
			</NewEmployeeRow>
			{!matches && (
				<ActionsGroup>
					<SmallBtn variant="outlined" color="default" size="small" onClick={props.generateGrid}>
						Generate
					</SmallBtn>
					<ClearBtn variant="outlined" color="default" size="small" onClick={props.clearList}>
						clear
					</ClearBtn>
				</ActionsGroup>
			)}
		</div>
	);
}
