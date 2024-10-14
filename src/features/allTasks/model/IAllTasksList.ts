/**
 * @file Модуль экспортирует описание сущности списка задач.
 * 
 * @author gjmazai
 */

import type { ITask, TListType } from "../../../entities"

/** Интерфейс описывающий список задач. */
export interface ITasksList {
	/** Список задач. */
	tasks: ITask[];
	/** Тип списка. */
	listType: TListType;
}
