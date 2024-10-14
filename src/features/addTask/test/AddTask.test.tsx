import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import { AddTask } from '../ui';
import { PromptText, LabelText } from '../constant';

describe('AddTask', () => {
	it('handle empty description error', () => {
		const { getByLabelText, getByText, container } = render(<AddTask isCompletedType={false} />);

		fireEvent.change(getByLabelText(LabelText.TITLE), { target: { value: 'Название' } });
		fireEvent.click(getByText('Добавить'));

		expect(container).toHaveTextContent(PromptText.EMPTY_FIELD);
	});

	it('handle empty title error', () => {
		const { getByLabelText, getByText, container } = render(<AddTask isCompletedType={false} />);

		fireEvent.change(getByLabelText(LabelText.DESCRIPTION), { target: { value: 'Описание' } });
		fireEvent.click(getByText('Добавить'));

		expect(container).toHaveTextContent(PromptText.EMPTY_FIELD);
	});

	it('handle empty all text fields', () => {
		const { getByText, getAllByText } = render(<AddTask isCompletedType={false} />);

		fireEvent.click(getByText('Добавить'));

		expect(getAllByText(PromptText.EMPTY_FIELD)).toHaveLength(2);
	});
});
