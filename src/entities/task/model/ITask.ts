/**
 * @file Модуль экспортирует интерфейс задачи. 
 * 
 * @author gjmazai
 */

/** Интерфейс описывающий сущность задачи. */
export interface ITask {
	/** Id задачи. */
	id: number;
	/** Заголовок задачи. */
	title: string;
	/** Описание задачи. */
	description: string;
	/** Флаг того, что задача завершена. */
	isCompleted: boolean;
	/** Дата создания задачи. */
	createdDate: string;
	/** Дата завершения задачи. */
	completedDate?: string;
}

/** Тип описывающий разновдность списка задач. */
export type TListType = 'all' | 'active' | 'completed'; 
