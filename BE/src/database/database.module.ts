import { Module, OnModuleInit } from '@nestjs/common';
import { SeedService } from './seed/seed.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { ExerciseGroup } from 'src/exercise-group/entities/exercise-group.entity';
import { FlashcardExercise } from 'src/flashcard-exercise/entities/flashcard-exercise.entity';
import { FlashCard } from 'src/flashcard-exercise/entities/flashcard.entity';
import { QuizExercise } from 'src/quiz-exercise/entities/quiz-exercise.entity';
import { QuizQuestion } from 'src/quiz-exercise/entities/quiz-question.entity';
import { QuestionAnswer } from 'src/quiz-exercise/entities/question-answer.entity';
import { ReadingExercise } from 'src/reading/entities/reading-exercise.entity';
import { ReadingQuestion } from 'src/reading/entities/reading-question.entity';
import { FlashcardSession } from 'src/flashcard-exercise/entities/flashcard-session.entity';
import { QuizSession } from 'src/quiz-exercise/entities/quiz-session.entity';
import { ReadingSession } from 'src/reading/entities/reading-session.entity';

@Module({
  providers: [SeedService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_NAME', 'postgres_db'),
        entities: [Teacher, ExerciseGroup, FlashcardExercise, FlashCard, QuizExercise, QuizQuestion, QuestionAnswer, ReadingExercise, ReadingQuestion, FlashcardSession, QuizSession, ReadingSession],
        synchronize: configService.get<boolean>('DB_DEV', true),
      }),
    }),
    TypeOrmModule.forFeature([Teacher, ExerciseGroup, FlashcardExercise, FlashCard, QuizExercise, QuizQuestion, QuestionAnswer, ReadingExercise, ReadingQuestion, FlashcardSession, QuizSession, ReadingSession]),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(
    private readonly seedService: SeedService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (this.configService.get<string>('DB_DEV', "true") === "true") {
      await this.seedService.seedDB();
    }
  }
}
