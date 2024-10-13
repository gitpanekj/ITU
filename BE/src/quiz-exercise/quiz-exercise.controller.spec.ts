import { Test, TestingModule } from '@nestjs/testing';
import { QuizExerciseController } from './quiz-exercise.controller';
import { QuizExerciseService } from './services/quiz-exercise.service';

describe('QuizExerciseController', () => {
  let controller: QuizExerciseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizExerciseController],
      providers: [QuizExerciseService],
    }).compile();

    controller = module.get<QuizExerciseController>(QuizExerciseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
