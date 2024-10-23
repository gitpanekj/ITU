import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashcardSessionDto } from './create-session.dto';

export class UpdateFlashcardSessionDto extends PartialType(CreateFlashcardSessionDto) {}