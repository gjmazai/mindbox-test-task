/**
 * @file Модуль экспортирует поле ввода для добавления новых тасок.
 *
 * @author gjmazai
 */

import { memo, useCallback, useContext, useState, type FC } from 'react';
import { blue } from '@mui/material/colors';
import { Button, Icon, Paper, TextField, Typography } from '@mui/material';

import type { ITask } from '../../../entities';
import { getUniqId, STORAGE_KEY, VFlexBox } from '../../../shared';
import { TaskSetterContext } from '../../taskContext';
import { PromptText, LabelText } from '../constant';

type TAddTaskProps = {
	/** Флаг того, что выбранный тип задачи является "Завершенные". */
	isCompletedType: boolean;
};

/** Компонент полей ввода для добавления задачи. */
export const AddTask: FC<TAddTaskProps> = memo(({ isCompletedType }) => {
	const { setTasksList } = useContext(TaskSetterContext);
	const [titleText, setTitleText] = useState('');
	const [descriptionText, setDescriptionText] = useState('');
	const [validationTitleText, setValidationTitleText] = useState('');
	const [validationDescriptionText, setValidationDescriptionText] = useState('');

	const handleChangeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setValidationTitleText(prev => (prev ? '' : prev));
		setTitleText(event.target.value);
	}, []);

	const handleChangeDescription = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setValidationDescriptionText(prev => (prev ? '' : prev));
		setDescriptionText(event.target.value);
	}, []);

	const handleClick = () => {
		if (titleText === '' && descriptionText === '') {
			setValidationTitleText(() => PromptText.EMPTY_FIELD);
			setValidationDescriptionText(() => PromptText.EMPTY_FIELD);
			return;
		}
		if (titleText === '') {
			setValidationTitleText(PromptText.EMPTY_FIELD);
			return;
		}
		if (descriptionText === '') {
			setValidationDescriptionText(PromptText.EMPTY_FIELD);
			return;
		}

		const newTask: ITask = {
			createdDate: new Date().toLocaleString('ru-RU'),
			id: getUniqId(),
			description: descriptionText,
			isCompleted: false,
			title: titleText,
		};

		setValidationDescriptionText('');
		setValidationTitleText('');
		setTitleText('');
		setDescriptionText('');

		setTasksList!(taskList => {
			const newTaskList = [...taskList, newTask];
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newTaskList));
			return newTaskList;
		});
	};

	return (
		<Paper
			elevation={12}
			sx={{ width: 550, minHeight: 265 }}
		>
			<VFlexBox
				align='center'
				padding={3}
				justifyContent='space-between'
			>
				<VFlexBox
					gap={2}
					width={'90%'}
				>
					<TextField
						size='small'
						error={!!validationTitleText}
						disabled={isCompletedType}
						onChange={handleChangeTitle}
						value={titleText}
						label={LabelText.TITLE}
						variant='outlined'
						helperText={validationTitleText}
					/>
					<TextField
						multiline
						rows={2}
						size='small'
						disabled={isCompletedType}
						error={!!validationDescriptionText}
						value={descriptionText}
						onChange={handleChangeDescription}
						label={LabelText.DESCRIPTION}
						variant='outlined'
						helperText={validationDescriptionText}
					/>
				</VFlexBox>
				{isCompletedType ? (
					<Typography
						variant='body1'
						color='GrayText'
					>
						{PromptText.NOT_AVAILABLE_TYPE}
					</Typography>
				) : (
					<Button
						sx={{ width: 'max-content' }}
						variant='outlined'
						onClick={handleClick}
						disabled={isCompletedType}
						endIcon={<Icon sx={{ color: blue[400] }}>add_circle</Icon>}
						children='Добавить'
					/>
				)}
			</VFlexBox>
		</Paper>
	);
});
