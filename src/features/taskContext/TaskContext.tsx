/**
 * @file Модуль экспортирует контекст задач.
 *
 * @author gjmazai
 */

import { createContext } from 'react';

import { ITask, TListType } from '../../entities';

type TTaskSetterContext = {
	/** Функция для установки списка задач. */
	setTasksList: React.Dispatch<React.SetStateAction<ITask[]>>;
};

type TTaskTypeContext = {
	type: TListType;
	setType: React.Dispatch<React.SetStateAction<TListType>>;
};

/** Контекст задач. */
export const TaskSetterContext = createContext<TTaskSetterContext>({
	setTasksList: () => null,
});

export const TaskTypeContext = createContext<TTaskTypeContext>({
	type: 'all',
	setType: () => null,
});
