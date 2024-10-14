/**
 * @file Модуль экспортирует компонент задачи.
 *
 * @author gjmazai
 */

import { FC, Fragment, memo } from 'react';
import { Icon, IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';

import { ITask } from '../model';

/** Тип, описывающий пропсы для компонента задачи. */
type TTaskProps = {
	/** Данные о задаче. */
	taskData: ITask;
	/** Функция для закрытия/открытия задачи. */
	setChecked: (id: number) => void;
	/** Функция для удаления задачи. */
	deleteTask: (id: number) => void;
	/** Флаг того, что таска завершена. */
	isCompleted: boolean;
};

/** Компонент задачи.  */
export const Task: FC<TTaskProps> = memo(({ taskData, setChecked, deleteTask, isCompleted }) => (
	<ListItem
		sx={{ gap: 2 }}
		divider
	>
		<ListItemButton
			onClick={() => setChecked(taskData.id)}
			sx={{ gap: 2 }}
		>
			{isCompleted ? <Icon color='success'>check_circle</Icon> : <Icon color='action'>circle-outlined</Icon>}
			<ListItemText
				primary={taskData.title}
				secondary={
					<Fragment>
						<span>{taskData.description}</span>
						<br />
						<span>Дата создания задачи: {taskData.createdDate}</span>
						<br />
						{taskData.completedDate && <span>Дата завершения задачи: {taskData.completedDate}</span>}
					</Fragment>
				}
			/>
		</ListItemButton>
		<IconButton
			edge='end'
			aria-label='delete'
			onClick={() => deleteTask(taskData.id)}
		>
			<Icon>delete-icon</Icon>
		</IconButton>
	</ListItem>
));
