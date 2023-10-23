import { UserRole } from 'src/user-roles/entities/user-role.entity';

export interface IUserCreate {
	username: string;
	password: string;
	role: UserRole;
}
