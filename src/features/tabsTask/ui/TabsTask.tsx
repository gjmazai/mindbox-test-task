/**
 * @file Модуль экспортирует компонент смены табов между задачами.
 *
 * @author gjamzai
 */

import { FC, memo, useCallback, useContext, useMemo } from 'react';
import { grey } from '@mui/material/colors';
import { ButtonGroup, Button, Typography, Box } from '@mui/material';

import { type TListType } from '../../../entities';
import { STORAGE_KEY } from '../../../shared';
import { TaskSetterContext, TaskTypeContext } from '../../taskContext';

/**
 * Функция сравнивает целевой тип списка и текущий, по результатам сравнения возвращает вариант кнопки.
 * @param targetType - целевой тип.
 * @param currentType - текущий тип.
 * @returns вид варианта кнопки.
 */
const getButtonVariant = (targetType: TListType, currentType: TListType): 'outlined' | 'contained' => {
	return targetType === currentType ? 'contained' : 'outlined';
};

/** Тип описывающий пропсы к компоненту табов. */
type TTabsTaskProps = {
	/** Количество задач. */
	tasksCount: number;
	/** Флаг того, что имеются завершенные задачи. */
	hasCompleted: boolean;
};

/** Компонент смены табов задач. */
export const TabsTask: FC<TTabsTaskProps> = memo(({ tasksCount, hasCompleted }) => {
	const { setType, type } = useContext(TaskTypeContext);
	const { setTasksList } = useContext(TaskSetterContext);

	const onClearCompletedTaskHandler = useCallback(() => {
		setTasksList(list => {
			const newList = list.filter(task => !task.isCompleted);
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
			return newList;
		});
	}, [setTasksList]);

	const clearText = useMemo(() => {
		if (type !== 'active' && hasCompleted) {
			return (
				<Typography
					variant='caption'
					color={grey[500]}
					onClick={onClearCompletedTaskHandler}
					sx={{
						'&:hover': {
							cursor: 'pointer',
							textDecoration: 'underline',
						},
					}}
				>
					Очистить завершенные
				</Typography>
			);
		}
	}, [type, onClearCompletedTaskHandler, hasCompleted]);

	const countTasks = useMemo(() => {
		return (
			<Typography
				maxWidth={70}
				variant='caption'
				color={grey[500]}
			>
				Кол-во задач: {tasksCount}
			</Typography>
		);
	}, [tasksCount]);

	const switchType = useMemo(() => {
		return (
			<ButtonGroup
				size='large'
				color='info'
			>
				<Button
					fullWidth
					variant={getButtonVariant('all', type)}
					onClick={() => setType('all')}
				>
					<Typography
						lineHeight={2}
						variant='caption'
					>
						Все
					</Typography>
				</Button>
				<Button
					fullWidth
					variant={getButtonVariant('active', type)}
					onClick={() => setType('active')}
				>
					<Typography
						lineHeight={2}
						variant='caption'
					>
						Активные
					</Typography>
				</Button>
				<Button
					fullWidth
					variant={getButtonVariant('completed', type)}
					onClick={() => setType('completed')}
				>
					<Typography
						lineHeight={2}
						variant='caption'
					>
						Завершенные
					</Typography>
				</Button>
			</ButtonGroup>
		);
	}, [setType, type]);

	return (
		<Box
			display='flex'
			alignItems='center'
			gap={2}
			paddingY={2}
			paddingLeft={2}
		>
			{countTasks}
			{switchType}
			{clearText}
		</Box>
	);
});
