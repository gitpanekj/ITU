import { PartialType } from '@nestjs/mapped-types';
import { CreateTextReferenceDto } from './create-text-reference.dto';

export class UpdateTextReferenceDto extends PartialType(CreateTextReferenceDto) {}