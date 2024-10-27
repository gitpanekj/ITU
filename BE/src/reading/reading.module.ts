import { Module } from '@nestjs/common';
import { ReadingExerciseService } from './services/reading-exercise.service';
import { ReadingController } from './reading.controller';
import { ReadingQuestionService } from './services/question.service';
import { ReadingSessionService } from './services/session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingExercise } from './entities/reading-exercise.entity';
import { ReadingQuestion } from './entities/reading-question.entity';
import { ReadingSession } from './entities/reading-session.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ReadingExercise, ReadingQuestion, ReadingSession])],
  controllers: [ReadingController],
  providers: [ReadingExerciseService, ReadingQuestionService, ReadingSessionService],
})
export class ReadingModule {}
