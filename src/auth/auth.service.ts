import { BadRequestException, Injectable } from '@nestjs/common';
import { SingUpDto } from './dto/SingUp.dto';
import { UsersService } from 'src/users/users.service';
import { PasswordHash } from 'src/users/helpers/password-hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly passwordHash: PasswordHash,
		private readonly jwtService: JwtService,
	) {}

	async register(data: SingUpDto) {
		const { username, password } = data;
		if (!username || !password) {
			throw new BadRequestException('Username or password is missing.');
		}
		const user = await this.userService.create(data);
		return user;
	}

	async login(data: SingUpDto) {
		const { username, password } = data;
		if (!username || !password) {
			throw new BadRequestException('Username or password is missing.');
		}

		const user = await this.userService.findOneByUsername(username);
		const valid = await this.passwordHash.compare(password, user.password);
		if (!valid) {
			throw new BadRequestException('Invalid password.');
		}

		const payload = { id: user.id, username: user.username, role: user.role.value };

		return { access_token: await this.jwtService.signAsync(payload) };
	}
}
