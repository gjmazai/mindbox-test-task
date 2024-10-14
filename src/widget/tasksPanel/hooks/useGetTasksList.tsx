/**
 * @file Модуль экспортирует хук для получения списка задач по атрибуту типа задачи.
 *
 * @author gjmazai
 */

import { useEffect, useState } from 'react';

import { ITask, TListType } from '../../../entities';
import { STORAGE_KEY } from '../../../shared';

/** Тип описывающий возвращаемое значение хука. */
type TReturnsUseGetTasksList = {
	/** Флаг загрузки данных. */
	isLoading: boolean;
	/** Возможная ошибка при получении данных. */
	error?: string;
};

/**
 * Хук для получения списка задач.
 * @param type - разновидность списка задач.
 * @param setTaskList - функция для установки задач.
 */
export const useGetTasksList = (type: TListType, setTaskList: (list: ITask[]) => void): TReturnsUseGetTasksList => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		let isIgnoreNewGetData = false;

		const getList = () => {
			setIsLoading(true);
			const tasks = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');

			if (Array.isArray(tasks) && !isIgnoreNewGetData) {
				setTaskList(tasks);
			} else if (!Array.isArray(tasks)) {
				setError('Произошла ошибка при обращении к данным со списком задач.');
			}

			setIsLoading(false);
		};

		getList();

		return () => {
			isIgnoreNewGetData = true;
		};
	}, [type, isLoading, setTaskList]);

	return {
		isLoading,
		error,
	};
};
