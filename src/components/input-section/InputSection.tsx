import React, { ChangeEvent, Fragment, useState } from 'react';
import { Input, IconButton, styled, InputLabel, Button } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const EmployeeRow = styled('div')({
	margin: '4px 0'
});

const NoEmployees = styled('div')({
	margin: '12px 0 4px 0'
});

const NewEmployeeRow = styled('div')({
	display: 'flex',
	flexDirection: 'row',
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
})

const ClearBtn = styled(SmallBtn)({
	marginLeft: '4px',
})

function renderName(name: string, index: number) {
	return (
		<EmployeeRow key={index}>{name}</EmployeeRow>
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
}

export function InputSection(props: InputSectionProps) {
	const {addEmploye, employes} = props;
	const [newName, updateName] = useState<string>('');

	const addNewName = () => {
		const names = newName.length > 0 ? newName.split(',') : [];
		names.forEach((name) => name && name.length > 0 ? addEmploye(name) : '');
		updateName('');
	}

	return (
		<div>
			<h3>Employee List: </h3>
			<NamesWrapper>
				{employes.length === 0 ? (
					renderNoEmployees()
				) : (
					<Fragment>
						{employes.map(renderName)}
					</Fragment>
				)}
			</NamesWrapper>
			<NewEmployeeRow>
				<Label>Add Employee: </Label>
				<Input id="name-input" aria-describedby="name-input"
							 onChange={(e: ChangeEvent<HTMLInputElement>) => updateName(e.currentTarget.value)} value={newName}/>
				<IconButton onClick={addNewName}><AddCircle/></IconButton>
				<SmallBtn variant="outlined" color="default" size="small" onClick={props.generateGrid}>
					Generate
				</SmallBtn>
				<ClearBtn variant="outlined" color="default" size="small" onClick={props.clearList}>
					clear
				</ClearBtn>
			</NewEmployeeRow>
		</div>
	);
}
