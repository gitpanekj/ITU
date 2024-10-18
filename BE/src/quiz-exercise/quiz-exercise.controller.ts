import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseFilters,
} from '@nestjs/common';
import { QuizExerciseService } from './services/quiz-exercise.service';
import { CreateQuizExerciseDto } from './dto/create-quiz-exercise.dto';
import { UpdateQuizExerciseDto } from './dto/update-quiz-exercise.dto';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { QuizQuestionService } from './services/quiz-question.service';
import { QuestionAnswerService } from './services/quiz-answer.service';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { UpdateQuestionAnswerDto } from './dto/update-question-answer.dot';
import { QuizTextService } from './services/text.service';
import { TextReferenceService } from './services/text-reference.service';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { CreateTextReferenceDto } from './dto/create-text-reference.dto';
import { UpdateTextReferenceDto } from './dto/update-text-reference.dto';
import { GlobalExceptionFilter } from 'src/exception-filter/filter';

@Controller('quiz-exercise')
@UseFilters(GlobalExceptionFilter)
export class QuizExerciseController {
  constructor(
    private readonly quizExerciseService: QuizExerciseService,
    private readonly quizQuestionService: QuizQuestionService,
    private readonly questionAnswerService: QuestionAnswerService,
    private readonly quizTextService: QuizTextService,
    private readonly textReferenceService: TextReferenceService
  ) {}


  /* Quiz question */
  @Post('question')
  createQuestion(@Body() createQuizQuestionDto: CreateQuizQuestionDto) {
    return this.quizQuestionService.create(createQuizQuestionDto);
  }

  @Get('question')
  findAllQuestion(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 0,
    @Query() _filters: any,
  ) {
    const {page: _, limit: __, ...filters} = _filters;
    return this.quizQuestionService.findAll({page, limit, filters});
  }

  @Get('question/:id')
  findOneQuestion(@Param('id') id: string) {
    return this.quizQuestionService.findOne(+id);
  }

  @Patch('question/:id')
  updateQuestion(
    @Param('id') id: string,
    @Body() updateQuizQuestionDto: UpdateQuizQuestionDto,
  ) {
    return this.quizQuestionService.update(+id, updateQuizQuestionDto);
  }

  @Delete('question/:id')
  removeQuestion(@Param('id') id: string) {
    return this.quizQuestionService.remove(+id);
  }
  /* End of Quiz question */

  /* Question answer */
  @Post('answer')
  createAnswer(@Body() createQuiestionAnswerDto: CreateQuestionAnswerDto) {
    return this.questionAnswerService.create(createQuiestionAnswerDto);
  }

  @Get('answer')
  findAllAnswer(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 0,
    @Query() _filters: any,
  ) {
    const {page: _, limit: __, ...filters} = _filters;
    return this.questionAnswerService.findAll({page, limit, filters});
  }

  @Get('answer/:id')
  findOneAnswer(@Param('id') id: string) {
    return this.questionAnswerService.findOne(+id);
  }

  @Patch('answer/:id')
  updateAnswer(
    @Param('id') id: string,
    @Body() updateQuiestionAnswerDto: UpdateQuestionAnswerDto,
  ) {
    return this.questionAnswerService.update(+id, updateQuiestionAnswerDto);
  }

  @Delete('answer/:id')
  removeAnswer(@Param('id') id: string) {
    return this.questionAnswerService.remove(+id);
  }
  /* End of Question answer */

  /* Text */
  @Post('text')
  createText(@Body() createTextDto: CreateTextDto) {
    return this.quizTextService.create(createTextDto);
  }

  @Get('text')
  findAllText(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 0,
    @Query() _filters: any,
  ) {
    const {page: _, limit: __, ...filters} = _filters;
    return this.quizTextService.findAll({page, limit, filters});
  }

  @Get('text/:id')
  findOneText(@Param('id') id: string) {
    return this.quizTextService.findOne(+id);
  }

  @Patch('text/:id')
  updateText(
    @Param('id') id: string,
    @Body() updateTextDto: UpdateTextDto,
  ) {
    return this.quizTextService.update(+id, updateTextDto);
  }

  @Delete('text/:id')
  removeText(@Param('id') id: string) {
    return this.quizTextService.remove(+id);
  }
  /* End of Text */


  /* Text reference */
  @Post('text-reference')
  createTextReference(@Body() createTextReferenceDto: CreateTextReferenceDto) {
    return this.textReferenceService.create(createTextReferenceDto);
  }

  @Get('text-reference')
  findAllTextReference(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 0,
    @Query() _filters: any,
  ) {
    const {page: _, limit: __, ...filters} = _filters;
    return this.textReferenceService.findAll({page, limit, filters});
  }

  @Get('text-reference/:id')
  findOneTextReference(@Param('id') id: string) {
    return this.textReferenceService.findOne(+id);
  }

  @Patch('text-reference/:id')
  updateTextReference(
    @Param('id') id: string,
    @Body() updateTextReferenceDto: UpdateTextReferenceDto,
  ) {
    return this.textReferenceService.update(+id, updateTextReferenceDto);
  }

  @Delete('text-reference/:id')
  removeTextReference(@Param('id') id: string) {
    return this.textReferenceService.remove(+id);
  }
  /* End of Text reference */


  /* Quiz exercise */
  @Post()
  createQuizExercise(@Body() createQuizExerciseDto: CreateQuizExerciseDto) {
    return this.quizExerciseService.create(createQuizExerciseDto);
  }

  @Get()
  findAllQuizExercise(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 0,
    @Query() _filters: any,
  ) {
    const {page: _, limit: __, ...filters} = _filters;
    return this.quizExerciseService.findAll({page, limit, filters});
  }

  @Get(':id')
  findOneQuizExercise(@Param('id') id: string) {
    return this.quizExerciseService.findOne(+id);
  }

  @Patch(':id')
  updateQuizExercise(
    @Param('id') id: string,
    @Body() updateQuizExerciseDto: UpdateQuizExerciseDto,
  ) {
    return this.quizExerciseService.update(+id, updateQuizExerciseDto);
  }

  @Delete(':id')
  removeQuizExercise(@Param('id') id: string) {
    return this.quizExerciseService.remove(+id);
  }
  /* End of Quiz exercise */
}
