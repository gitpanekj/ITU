import { Module } from '@nestjs/common';
import { FlashcardExerciseService } from './services/flashcard-exercise.service';
import { FlashcardService } from './services/flashcard.service';
import { FlashcardExerciseController } from './flashcard-exercise.controller';
import { FlashcardExercise } from './entities/flashcard-exercise.entity';
import { FlashCard } from './entities/flashcard.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([FlashcardExercise, FlashCard])],
  controllers: [FlashcardExerciseController],
  providers: [FlashcardExerciseService, FlashcardService],
})
export class FlashcardExerciseModule {}
