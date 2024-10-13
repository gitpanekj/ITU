import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { ExerciseGroupModule } from './exercise-group/exercise-group.module';
import { FlashcardExerciseModule } from './flashcard-exercise/flashcard-exercise.module';
import { QuizExerciseModule } from './quiz-exercise/quiz-exercise.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [DatabaseModule, TeacherModule, ExerciseGroupModule, FlashcardExerciseModule, QuizExerciseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
