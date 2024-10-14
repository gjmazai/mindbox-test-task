/**
 * @file Модуль экспортирует функции утилиты.
 * 
 * @author gjmazai
 */

import { STORAGE_KEY, UNIQ_ID_KEY } from "../constants"

/**
 * Функция счетчик идентификаторов.
 * @returns функция замыкающая и инкриминирующая значение идентификатора.
 */
const getId = (): () => number => {
	let uniqId = Number( window.localStorage.getItem(UNIQ_ID_KEY) ) || 0;

	const _getId = (): number => {
		window.localStorage.setItem(UNIQ_ID_KEY, String(++uniqId));
		return uniqId;
	}

	return _getId;
}

/** Функция возвращающая уникальный идентификатор. */
export const getUniqId = getId();

export const setTaskInStorage = <T extends Array<unknown>>(task: T) => {
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(task));
}