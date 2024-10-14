/**
 * @file Модуль экспортирует компонент основоного фрейма приложения.
 *
 * @author gjmazai
 */

import { useLayoutEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { TasksPanel } from '../../widget';
import { STORAGE_KEY, VFlexBox } from '../../shared';

export const MainLayout = () => {
	useLayoutEffect(() => {
		if (!window.localStorage.getItem(STORAGE_KEY)) {
			window.localStorage.setItem(STORAGE_KEY, '[]');
		}
	}, []);

	return (
		<VFlexBox
			gap={3}
			align='center'
			overflow='hidden'
			paddingBottom={2}
			height='100vh'
		>
			<Box component='header'>
				<Typography variant='h2'>todos</Typography>
			</Box>
			<TasksPanel />
		</VFlexBox>
	);
};
