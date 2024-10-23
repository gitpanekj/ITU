import { Module } from '@nestjs/common';
import { QuizExerciseService } from './services/quiz-exercise.service';
import { QuizExerciseController } from './quiz-exercise.controller';
import { QuestionAnswerService } from './services/quiz-answer.service';
import { QuizQuestionService } from './services/quiz-question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizExercise } from './entities/quiz-exercise.entity';
import { QuizQuestion } from './entities/quiz-question.entity';
import { QuestionAnswer } from './entities/question-answer.entity';
import { QuizSession } from './entities/quiz-session.entity';
import { QuizSessionService } from './services/session.service';

@Module({
  imports:[TypeOrmModule.forFeature([QuizExercise, QuizQuestion, QuestionAnswer, QuizSession])],
  controllers: [QuizExerciseController],
  providers: [QuizExerciseService, QuestionAnswerService, QuizQuestionService, QuizSessionService],
})
export class QuizExerciseModule {}
