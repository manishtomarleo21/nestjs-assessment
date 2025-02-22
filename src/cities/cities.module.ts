import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { City } from './entities/city.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([City]),
    AuthModule,
],
  controllers: [CitiesController],
  providers: [CitiesService, JwtAuthGuard],
})
export class CitiesModule {}
