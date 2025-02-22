import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService:JwtService,
    ){}

    async register(email:string, password:string): Promise<User>{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({email, password:hashedPassword});
        return this.usersRepository.save(user);
    }


  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { userId: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
