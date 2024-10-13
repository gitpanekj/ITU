import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashcardExerciseDto } from './create-flashcard-exercise.dto';

export class UpdateFlashcardExerciseDto extends PartialType(CreateFlashcardExerciseDto) {}
