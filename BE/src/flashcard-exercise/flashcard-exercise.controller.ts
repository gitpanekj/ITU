import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { FlashcardExerciseService } from './services/flashcard-exercise.service';
import { CreateFlashcardExerciseDto } from './dto/create-flashcard-exercise.dto';
import { UpdateFlashcardExerciseDto } from './dto/update-flashcard-exercise.dto';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { FlashcardService } from './services/flashcard.service';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { GlobalExceptionFilter } from 'src/exception-filter/filter';

@Controller('flashcard-exercise')
@UseFilters(GlobalExceptionFilter)
export class FlashcardExerciseController {
  constructor(
    private readonly flashcardExerciseService: FlashcardExerciseService,
    private readonly flashcardService: FlashcardService,
  ) {}

    /* Flashcards */
    @Post('card')
    createCard(@Body() createFlashcardDto: CreateFlashcardDto) {
      return this.flashcardService.create(createFlashcardDto);
    }
  
    @Get('cards')
    findAllCard(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 0,
      @Query() _filters: any,
    ) {
      const { page: _, limit: __, ...filters } = _filters;
      return this.flashcardService.findAll({ page, limit, filters });
    }
  
    @Get('card/:id')
    findOneCard(@Param('id') id: string) {
      return this.flashcardService.findOne(+id);
    }
  
    @Patch('card/:id')
    updateCard(
      @Param('id') id: string,
      @Body() updateFlashcardDto: UpdateFlashcardDto,
    ) {
      return this.flashcardService.update(+id, updateFlashcardDto);
    }
  
    @Delete('card/:id')
    removeCard(@Param('id') id: string) {
      return this.flashcardService.remove(+id);
    }
  /* End of Flashcards */


  /* Flashcard exercise */
  @Post()
  createExercise(
    @Body() createFlashcardExerciseDto: CreateFlashcardExerciseDto,
  ) {
    return this.flashcardExerciseService.create(createFlashcardExerciseDto);
  }

  @Get()
  findAllExercise(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 0,
    @Query() _filters: any,
  ) {
    const { page: _, limit: __, ...filters } = _filters;
    return this.flashcardExerciseService.findAll({ page, limit, filters });
  }

  @Get(':id')
  findOneExercise(@Param('id') id: string) {
    try {
      return this.flashcardExerciseService.findOne(+id);
    }
    catch (error) {
      throw new HttpException('Error fetching resource', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  updateExercise(
    @Param('id') id: string,
    @Body() updateFlashcardExerciseDto: UpdateFlashcardExerciseDto,
  ) {
    return this.flashcardExerciseService.update(
      +id,
      updateFlashcardExerciseDto,
    );
  }

  @Delete(':id')
  removeExercise(@Param('id') id: string) {
    return this.flashcardExerciseService.remove(+id);
  }

  /* End of Flashcard exercise */
}
