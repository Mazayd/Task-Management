import * as bcrypt from 'bcrypt';

export async function generatePasswordHash(password: string) {
	return await bcrypt.hash(password, Number(process.env.PS_SALD));
}

export async function comparePassword(password: string, hashPassword: string) {
	return await bcrypt.compare(password, hashPassword);
}
