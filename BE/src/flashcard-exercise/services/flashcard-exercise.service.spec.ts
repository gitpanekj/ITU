import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardExerciseService } from './services/flashcard-exercise.service';

describe('FlashcardExerciseService', () => {
  let service: FlashcardExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlashcardExerciseService],
    }).compile();

    service = module.get<FlashcardExerciseService>(FlashcardExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
