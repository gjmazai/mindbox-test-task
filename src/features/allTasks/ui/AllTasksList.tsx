/**
 * @file Модуль экспортирует компонент списка задач.
 *
 * @author gjmazai
 */

import { FC, memo, useCallback, useContext, useEffect, useState } from 'react';
import { List } from '@mui/material';

import { ITask, Task } from '../../../entities';
import { setTaskInStorage, VFlexBox } from '../../../shared';
import { TaskSetterContext, TaskTypeContext } from '../../taskContext';

type TAllTasksListProps = {
	/** Список задач. */
	tasksList: ITask[];
};

/** Компонент списка задач. */
export const AllTasksList: FC<TAllTasksListProps> = memo(({ tasksList }) => {
	const { type } = useContext(TaskTypeContext);
	const { setTasksList } = useContext(TaskSetterContext);

	const [visibleTaskList, setVisibleTask] = useState([...tasksList]);

	const setCheckedData = useCallback(
		(id: number) => {
			if (!setTasksList) {
				return;
			}

			setVisibleTask(visibleTaskList => {
				if (type === 'active' || type === 'completed') {
					return visibleTaskList.filter(taskData => taskData.id !== id);
				}
				return visibleTaskList;
			});

			setTasksList(tasksList => {
				const newTaskList = tasksList.map(taskData => {
					if (taskData.id === id) {
						taskData.isCompleted = !taskData.isCompleted;
						return taskData;
					}
					return taskData;
				});

				setTaskInStorage(newTaskList);
				return newTaskList;
			});
		},
		[setTasksList, type],
	);

	const deleteTask = useCallback(
		(id: number) => {
			setTasksList!(taskList => {
				const newTaskList = taskList.filter(taskData => taskData.id !== id);
				setTaskInStorage(newTaskList);
				return newTaskList;
			});
		},
		[setTasksList],
	);

	useEffect(() => {
		setVisibleTask(tasksList.filter(task => type === 'all' || task.isCompleted === (type === 'completed')));
	}, [type, tasksList]);

	return (
		<VFlexBox height={'440px'}>
			<List
				disablePadding
				sx={{ height: '100%', overflowY: 'scroll' }}
			>
				{visibleTaskList.map(task => (
					<Task
						key={task.id}
						setChecked={setCheckedData}
						taskData={task}
						deleteTask={deleteTask}
						isCompleted={task.isCompleted}
					/>
				))}
			</List>
		</VFlexBox>
	);
});
