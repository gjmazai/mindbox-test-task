/**
 * @file Модуль экспортирует корневой компонент приложения.
 *
 * @author gjmazai
 */

import React from 'react';
import { Container, CssBaseline } from '@mui/material';

import { MainLayout } from '../pages';

export const App = () => {
	return (
		<React.Fragment>
			<CssBaseline>
				<Container
					maxWidth='lg'
					sx={{ maxHeight: '100vh' }}
				>
					<MainLayout />
				</Container>
			</CssBaseline>
		</React.Fragment>
	);
};
