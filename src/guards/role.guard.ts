import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(public role: string) {}
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const userRole = request.user.role;
		if (userRole !== this.role) {
			throw new UnauthorizedException('For your role, access is not available.');
		}
		return true;
	}
}
