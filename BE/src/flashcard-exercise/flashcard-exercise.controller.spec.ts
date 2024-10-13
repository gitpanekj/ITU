import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardExerciseController } from './flashcard-exercise.controller';
import { FlashcardExerciseService } from './services/flashcard-exercise.service';

describe('FlashcardExerciseController', () => {
  let controller: FlashcardExerciseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashcardExerciseController],
      providers: [FlashcardExerciseService],
    }).compile();

    controller = module.get<FlashcardExerciseController>(FlashcardExerciseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
