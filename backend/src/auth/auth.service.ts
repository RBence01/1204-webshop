import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(
		private readonly db: PrismaService,
		private readonly jwtService: JwtService
	) { }

	async signIn(username: string, password: string) {
		const user = await this.db.user.findUnique({ where: { username, password: hash(password, 10) } })
		if (!user) throw new UnauthorizedException()
		return {
			access_token: await this.jwtService.signAsync({ sub: user.email, username: user.username })
		}
	}
}
