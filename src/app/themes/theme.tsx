import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme } from '@mui/material';

import { palette } from './pallete';

export const customTheme = createTheme({
	palette,
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					boxShadow: '0px 0px 32px rgba(0, 0, 0, 0.15)',
				},
				rounded: {
					borderRadius: '0.5rem',
				},
			},
		},
	},
});
