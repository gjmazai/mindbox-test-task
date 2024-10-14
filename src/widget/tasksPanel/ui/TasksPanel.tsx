/**
 * @file Модуль экспортирует компонент панели задач.
 *
 * @author gjmazai
 */

import { useMemo, useState } from 'react';
import { Alert, Box, LinearProgress, Paper } from '@mui/material';

import { AllTasksList, AddTask, TabsTask, TaskSetterContext, TaskTypeContext } from '../../../features';
import { ITask, type TListType } from '../../../entities';
import { VFlexBox } from '../../../shared';
import { useGetTasksList } from '../hooks';

/** Компонент панели задач. */
export const TasksPanel = () => {
	const [type, setType] = useState<TListType>('all');
	const [tasksList, setTasksList] = useState<ITask[]>([]);

	const { error, isLoading } = useGetTasksList(type, setTasksList);

	const taskSetterContextValue = useMemo(() => {
		return { setTasksList };
	}, []);
	const typeContextValue = useMemo(() => {
		return { type, setType };
	}, [type]);

	const getTasksList = () => {
		if (isLoading) {
			return (
				<Box sx={{ width: '100%' }}>
					<LinearProgress />
				</Box>
			);
		}

		if (error) return <Alert severity='error'>{error}</Alert>;

		const [hasCompleted, tasksCount] = tasksList.reduce(
			(prev, current) => {
				if (type === 'all' || current.isCompleted === (type === 'completed')) {
					++prev[1];
				}
				if (current.isCompleted) prev[0] = true;

				return prev;
			},
			[false, 0],
		);

		return (
			<Paper
				elevation={12}
				sx={{ width: 550, height: '100%' }}
			>
				<TaskTypeContext.Provider value={typeContextValue}>
					<TabsTask
						tasksCount={tasksCount}
						hasCompleted={hasCompleted}
					/>
					<AllTasksList tasksList={tasksList} />
				</TaskTypeContext.Provider>
			</Paper>
		);
	};

	return (
		<VFlexBox
			gap={5}
			align='center'
			component='main'
			height='100%'
			width='100%'
		>
			<TaskSetterContext.Provider value={taskSetterContextValue}>
				<AddTask isCompletedType={type === 'completed'} />
				{getTasksList()}
			</TaskSetterContext.Provider>
		</VFlexBox>
	);
};
