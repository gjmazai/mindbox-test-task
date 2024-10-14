/**
 * @file Модуль экспортирует компонент кастомной панели табов.
 *
 * @author gjmazai
 */

import { Box } from '@mui/material';
import { FC, memo } from 'react';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export const CustomTabPanel: FC<TabPanelProps> = memo(props => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
});
