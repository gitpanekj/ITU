import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlashcardExerciseService } from './services/flashcard-exercise.service';
import { CreateFlashcardExerciseDto } from './dto/create-flashcard-exercise.dto';
import { UpdateFlashcardExerciseDto } from './dto/update-flashcard-exercise.dto';

@Controller('flashcard-exercise')
export class FlashcardExerciseController {
  constructor(private readonly flashcardExerciseService: FlashcardExerciseService) {}

  @Post()
  create(@Body() createFlashcardExerciseDto: CreateFlashcardExerciseDto) {
    return this.flashcardExerciseService.create(createFlashcardExerciseDto);
  }

  @Get()
  findAll() {
    return this.flashcardExerciseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashcardExerciseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlashcardExerciseDto: UpdateFlashcardExerciseDto) {
    return this.flashcardExerciseService.update(+id, updateFlashcardExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flashcardExerciseService.remove(+id);
  }
}
