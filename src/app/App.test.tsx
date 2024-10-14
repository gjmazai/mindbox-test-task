import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { App } from './App';

// Проверка ради проверки
test('Renders the main page', () => {
	expect(render(<App />).container).toBeInTheDocument();
});
