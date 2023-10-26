import * as bcrypt from 'bcrypt';
import { IPasswordHash } from '../interfaces';

export class PasswordHash implements IPasswordHash {
	private readonly bcrypt: typeof bcrypt;
	constructor(private readonly saltRound: number = 10) {
		this.bcrypt = bcrypt;
	}

	hash(password: string): Promise<string> {
		return bcrypt.hash(password, this.saltRound);
	}

	compare(password: string, hashPassword: string): Promise<boolean> {
		return bcrypt.compare(password, hashPassword);
	}
}
