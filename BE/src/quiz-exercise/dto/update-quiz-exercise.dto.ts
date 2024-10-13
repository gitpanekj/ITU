import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizExerciseDto } from './create-quiz-exercise.dto';

export class UpdateQuizExerciseDto extends PartialType(CreateQuizExerciseDto) {}
