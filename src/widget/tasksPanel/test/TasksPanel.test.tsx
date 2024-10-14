import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { TasksPanel } from '../ui';
import { STORAGE_KEY } from '../../../shared';
import { type ITask } from '../../../entities';

describe('TasksPanel', () => {
	/**
	 * Функция добавляет задачу на страницу.
	 * @param title - название задачи.
	 * @param description - описание задачи.
	 * @param [isCompleted = false] - флаг того, что задача завершена.
	 */
	const addTask = (title: string, description: string, isCompleted: boolean = false) => {
		const task: ITask[] = [
			{
				description,
				title,
				createdDate: '',
				isCompleted,
				id: 1,
			},
		];

		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(task));
	};

	/**
	 * Функция добавляет несколько задач на страницу за счет замыкания.
	 * @param title - название задачи.
	 * @param description - описание задачи.
	 * @param [isCompleted = false] - флаг того, что задача завершена.
	 */
	const addManyTask = () => {
		const tasksArr: ITask[] = [];
		let id = 1;

		return (title: string, description: string, isCompleted: boolean = false) => {
			tasksArr.push({
				description,
				title,
				createdDate: '',
				isCompleted,
				id: ++id,
			});

			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksArr));
		};
	};

	it('handle localStorage error', async () => {
		window.localStorage.removeItem(STORAGE_KEY);

		expect(render(<TasksPanel />).container).toHaveTextContent(
			'Произошла ошибка при обращении к данным со списком задач.',
		);
	});

	it('add task test', () => {
		addTask('Название задачи', 'Описание задачи');

		const { getByRole } = render(<TasksPanel />);

		expect(getByRole('listitem')).toBeInTheDocument();
		expect(getByRole('listitem')).toHaveTextContent(/Название задачи/i);
		expect(getByRole('listitem')).toHaveTextContent(/Описание задачи/i);
	});

	it('all task added', () => {
		const addTask = addManyTask();
		for (let i = 0; i < 10; i++) {
			addTask(`Название задачи ${i}`, `Описание задачи ${i}`);
		}

		const { queryAllByRole } = render(<TasksPanel />);

		expect(queryAllByRole('listitem')).toHaveLength(10);
	});

	it('empty active task', async () => {
		addTask('Название №1', 'Описание', true);
		const { getAllByRole, getByText } = render(<TasksPanel />);

		expect(getByText('Название №1')).toBeInTheDocument();
		const button = getAllByRole('button').find(button => button.textContent === 'Активные');

		act(() => {
			if (button) {
				userEvent.click(button);
			}
		});

		expect(getByText('Название №1')).toBeInTheDocument();
	});
});
