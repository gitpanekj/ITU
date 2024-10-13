import { Module } from '@nestjs/common';
import { QuizExerciseService } from './services/quiz-exercise.service';
import { QuizExerciseController } from './quiz-exercise.controller';
import { QuestionAnswerService } from './services/quiz-answer.service';
import { QuizQuestionService } from './services/quiz-question.service';
import { TextReferenceService } from './services/text-reference.service';
import { QuizTextService } from './services/text.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizExercise } from './entities/quiz-exercise.entity';
import { QuizQuestion } from './entities/quiz-question.entity';
import { QuestionAnswer } from './entities/question-answer.entity';
import { QuizText } from './entities/text.entity';
import { TextReference } from './entities/text-reference.entity';

@Module({
  imports:[TypeOrmModule.forFeature([QuizExercise, QuizQuestion, QuestionAnswer, QuizText, TextReference])],
  controllers: [QuizExerciseController],
  providers: [QuizExerciseService, QuestionAnswerService, QuizQuestionService, TextReferenceService, QuizTextService],
})
export class QuizExerciseModule {}
