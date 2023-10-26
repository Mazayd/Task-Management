import { ETaskStatus } from 'src/common';
import { IUser } from 'src/modules/users';

export interface ITask {
	id: number;
	taskName: string;
	taskDescription: string;
	personal: boolean;
	status: ETaskStatus;
	completed: boolean | null;
	createAt: Date;
	updateAt: Date;
	user: IUser;
}
