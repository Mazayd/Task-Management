import { ETaskStatus } from 'src/common';
import { ICreateTask } from './create-task.interface';

export interface IUpdateTask extends Partial<ICreateTask> {
	status?: ETaskStatus;
	completed?: boolean;
}
