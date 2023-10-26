import { IUser } from 'src/modules/users';

export interface IRequestWitchUser extends Request {
	user: IUser;
}
