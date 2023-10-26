import { IUserRole } from 'src/modules/user-roles';

export interface IUser {
	id: number;
	username: string;
	password?: string;
	createAt: Date;
	role?: IUserRole;
}
