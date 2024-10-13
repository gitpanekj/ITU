import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizExerciseService } from './services/quiz-exercise.service';
import { CreateQuizExerciseDto } from './dto/create-quiz-exercise.dto';
import { UpdateQuizExerciseDto } from './dto/update-quiz-exercise.dto';

@Controller('quiz-exercise')
export class QuizExerciseController {
  constructor(private readonly quizExerciseService: QuizExerciseService) {}

  @Post()
  create(@Body() createQuizExerciseDto: CreateQuizExerciseDto) {
    return this.quizExerciseService.create(createQuizExerciseDto);
  }

  @Get()
  findAll() {
    return this.quizExerciseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizExerciseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizExerciseDto: UpdateQuizExerciseDto) {
    return this.quizExerciseService.update(+id, updateQuizExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizExerciseService.remove(+id);
  }
}
