import { Test, TestingModule } from '@nestjs/testing';
import { QuizExerciseService } from './quiz-exercise.service';

describe('QuizExerciseService', () => {
  let service: QuizExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizExerciseService],
    }).compile();

    service = module.get<QuizExerciseService>(QuizExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
