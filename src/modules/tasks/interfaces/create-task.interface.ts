import { IUser } from 'src/modules/users';

export interface ICreateTask {
	taskName: string;
	taskDescription: string;
	personal?: boolean;
	user?: IUser;
}
