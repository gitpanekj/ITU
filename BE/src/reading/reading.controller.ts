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
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { GlobalExceptionFilter } from 'src/exception-filter/filter';
import { ReadingExerciseService } from './services/reading-exercise.service';
import { ReadingQuestionService } from './services/question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { UpdateReadingExerciseDto } from './dto/update-reading-exercise.dto';
import { CreateReadingExerciseDto } from './dto/create-reading-exercise.dto';
import { ReadingSessionService } from './services/session.service';

@Controller('reading-exercise')
@UseFilters(GlobalExceptionFilter)
export class ReadingController {
  constructor(
    private readonly readingExerciseService: ReadingExerciseService,
    private readonly readingQuestionService: ReadingQuestionService,
    private readonly sessionService: ReadingSessionService,
  ) {}

  /* Quiz question */
  @Post('question')
  createQuestion(@Body() dto: CreateQuestionDto) {
    return this.readingQuestionService.create(dto);
  }

  @Get('question')
  async findAllQuestion(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 0,
    @Query('order') order: "ID" | "WRONG" | "CORRECT" | "HARD" = 'ID',
    @Query() _filters: any
  ) {
    const { page: _, limit: __, order: ___, ...filters } = _filters;
    let orderBy;
    switch (order)
    {
      case "ID":
        orderBy = {id: 'DESC'};
        break;
      case "WRONG":
        orderBy = {noWrong: 'DESC'};
        break;
      case "CORRECT":
        orderBy = {noCorrect: 'DESC'};
        break;
      case "HARD":
        orderBy = {hardCount: 'DESC'};
        break;
      default:
        orderBy = {id: 'DESC'};
    }
    
    let data = await this.readingQuestionService.findAll({ page, limit, filters, order: orderBy });
    return data;
  }

  @Get('question/:id')
  findOneQuestion(@Param('id') id: string) {
    return this.readingQuestionService.findOne(+id);
  }

  @Patch('question/:id')
  updateQuestion(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.readingQuestionService.update(+id, dto);
  }

  @Delete('question/:id')
  removeQuestion(@Param('id') id: string) {
    return this.readingQuestionService.remove(+id);
  }
  /* End of Reading question */
  /* Text */
  @Get('text/:readingId')
  async findOneText(@Param('readingId') id: string) {
    return (await this.readingExerciseService.findOne(+id)).text;
  }

  @Patch('text/:readingId')
  updateText(@Param('readingId') id: string, @Body() dto: any) {
    return this.readingExerciseService.update(+id, dto);
  }

  @Get('text/highlight/:readingId/:questionId')
  async getHighlightedText(@Param('readingId') readingId: string, @Param('questionId') questionId: string) {
    let exercise = await this.readingExerciseService.findOne(+readingId);

    const editorContent = exercise.text; 
    
    const regex = new RegExp(`<span question-id="(${questionId})">`, 'g');
    const modifiedContent = editorContent.replace(regex, '<span question-id="$1" highlighted="true">');

 
    if (editorContent === modifiedContent)
    {
      throw new NotFoundException(`Mark does not exist.`); 
    }

    return modifiedContent;
  }

  @Delete('/text/highlight/:readingId/:questionId')
  async removeHighlightedText(@Param('readingId') readingId: string, @Param('questionId') questionId: string) {
    let exercise = await this.readingExerciseService.findOne(+readingId);

    const editorContent = exercise.text; 
    const regex = new RegExp(`<span question-id="${questionId}">(.*?)<\/span>`, 'g');
    const modifiedContent = editorContent.replace(regex, '$1');
    
    await this.readingQuestionService.update(+questionId, {textAttached: false});

    await this.readingExerciseService.update(+readingId, {text: modifiedContent});

    return modifiedContent;

  }

  @Post('/text/highlight/:questionId')
  async attachHighlightedText(@Param('questionId') questionId: string) {
    await this.readingQuestionService.update(+questionId, {textAttached: true});
  }

  /* Session */
  @Get('create_session/:exerciseId')
  async createQuizSession(@Param('exerciseId') id: string) {
    const { data, total } = await this.readingQuestionService.findAll({
      page: 1,
      limit: 0,
      filters: { exerciseId: id },
    });
    const session = await this.sessionService.create({
      exerciseId: +id,
      total: total,
    });
    return { readingSessionId: session.id };
  }

  @Delete('delete_session/:sessionId')
  deleteQuizSession(@Param('sessionId') id: string) {
    return this.sessionService.remove(+id);
  }

  @Patch('update_session/:id')
  async updateSession(@Param('id') id: string, @Body() dto: {}) {
    return this.sessionService.update(+id, dto);
  }

  @Get('session/:sessionId/next')
  async getNextQuestion(@Param('sessionId') id: string) {
    // Move to next question in session
    let session = await this.sessionService.findOne(+id);
    if (session.questionIdx + 1 > session.total) {
      throw new NotFoundException('No next question');
    }

    Object.assign(session, { questionIdx: session.questionIdx + 1 });
    await this.sessionService.update(+id, session);

    // return next question
    const data = await this.readingQuestionService.findAll({
      page: session.questionIdx,
      limit: 1,
      filters: { exerciseId: String(session.exerciseId) },
      order: {id: 'ASC'}
    });
    const remaining = session.total - session.questionIdx;
    return { data, remaining };
  }

  @Post('evaluate_question')
  async evaluateQuestion(
    @Body() dto: { questionId: number; answer: string; sessionId: number },
  ) {
    const { questionId, answer, sessionId } = dto;
    let question = await this.readingQuestionService.findOne(questionId);
    let session = await this.sessionService.findOne(sessionId);

    // evaluate question and update session
    const correct = question.answer === answer;
    if (correct) {
      Object.assign(session, {
        correct:
          session.correct +
          (session.correct === '' ? '' : ',') +
          `{"id": ${questionId}, "name": "${question.name}"}`,
      });
      Object.assign(question, { noCorrect: question.noCorrect + 1 });
    } else {
      Object.assign(session, {
        wrong:
          session.wrong +
          (session.wrong === '' ? '' : ',') +
          `{"id": ${questionId}, "name": "${question.name}", "chosen": "${answer}"}`,
      });
      Object.assign(question, { noWrong: question.noWrong + 1 });
    }
    await this.sessionService.update(sessionId, session);
    await this.readingQuestionService.update(questionId, question);

    return correct
      ? { result: 'correct' }
      : { result: 'incorrect', answer: question.answer };
  }

  @Post('mark_hard/:questionId')
  async markAsHard(@Body() dto: {sessionId: number}, @Param('questionId') id: string) {
    let question = await this.readingQuestionService.findOne(+id);
    let session = await this.sessionService.findOne(dto.sessionId);

    Object.assign(question, { hardCount: question.hardCount + 1 });

    let hard_questions = session.hard.split(';').map(Number);
    console.log(hard_questions);
    
    if (hard_questions.includes(+id))
    {
      hard_questions = hard_questions.filter(item => item !== +id);
    } else {
      hard_questions.push(+id);
    }

    Object.assign(session, {hard: hard_questions.join(';')});
    console.log(session);


    await this.sessionService.update(dto.sessionId, session);
    return this.readingQuestionService.update(+id, question);
  }

  @Get('evaluate_session/:sessionId')
  async evaluateQuiz(
    @Param('sessionId') id: string,
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 0,
    @Query('type') type: "correct" | "wrong" = "correct") {
    let session = await this.sessionService.findOne(+id);

    let correct: {id:number, name:string, chosen: string, hard: boolean}[] = JSON.parse(`[${session.correct}]`);
    let wrong: {id:number, name:string, chosen: string, hard: boolean}[] = JSON.parse(`[${session.wrong}]`);
    let hard = session.hard.split(';').map(Number);

    correct = correct.map(item => hard.includes(item.id) ? {...item, hard: true} : {...item, hard: false});
    wrong = wrong.map(item => hard.includes(item.id) ? {...item, hard: true} : {...item, hard: false});
    
    const no_correct = correct.length ;
    const no_wrong =  wrong.length ;

    
    const start = (page - 1) * limit;
    const end = Number(+start + +limit);
    
    correct = correct.slice(start, end);
    wrong = wrong.slice(start, end);
    console.log(wrong);
    console.log(correct);

    if (type === "correct"){
      return {no_correct, correct};
    }
    else {
      return {no_wrong, wrong};
    }
  }

  /* Quiz exercise */
  @Post()
  async createReadingExercise(@Body() dto: CreateReadingExerciseDto) {
    return this.readingExerciseService.create(dto);
  }

  @Get()
  findAllReadingExercise(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 0,
    @Query() _filters: any,
  ) {
    const { page: _, limit: __, ...filters } = _filters;
    return this.readingExerciseService.findAll({ page, limit, filters });
  }

  @Get(':id')
  findOneReadingExercise(@Param('id') id: string) {
    return this.readingExerciseService.findOne(+id);
  }

  @Patch(':id')
  updateReadingExercise(
    @Param('id') id: string,
    @Body() dto: UpdateReadingExerciseDto,
  ) {
    return this.readingExerciseService.update(+id, dto);
  }

  @Delete(':id')
  removeReadingExercise(@Param('id') id: string) {
    return this.readingExerciseService.remove(+id);
  }
  /* End of Quiz exercise */
}