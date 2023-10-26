import { IUserRole } from 'src/modules/user-roles';

export interface IUserCreate {
	username: string;
	password: string;
	role: IUserRole;
}
