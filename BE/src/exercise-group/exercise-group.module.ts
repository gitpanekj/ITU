import { Module } from '@nestjs/common';
import { ExerciseGroupService } from './exercise-group.service';
import { ExerciseGroupController } from './exercise-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseGroup } from './entities/exercise-group.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ExerciseGroup])],
  controllers: [ExerciseGroupController],
  providers: [ExerciseGroupService],
})
export class ExerciseGroupModule {}
