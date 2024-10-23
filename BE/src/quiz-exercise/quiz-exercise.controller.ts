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
  NotFoundException,
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
import { GlobalExceptionFilter } from 'src/exception-filter/filter';
import { QuizSessionService } from './services/session.service';

@Controller('quiz-exercise')
@UseFilters(GlobalExceptionFilter)
export class QuizExerciseController {
  constructor(
    private readonly quizExerciseService: QuizExerciseService,
    private readonly quizQuestionService: QuizQuestionService,
    private readonly questionAnswerService: QuestionAnswerService, 
    private readonly sessionService: QuizSessionService,
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

  /* Session */
  @Get('create_session/:exerciseId')
  async createQuizSession(@Param('exerciseId') id: string){
    const {data, total} = await this.quizQuestionService.findAll({page: 1, limit: 0, filters: {quizId: id}});
    const session = await this.sessionService.create({exerciseId: +id, total: total});
    return {quizSessionId: session.id};
  }

  @Delete('delete_session/:sessionId')
  deleteQuizSession(@Param('sessionId') id: string){
    return this.sessionService.remove(+id);
  }

  
  @Patch('update_session/:id')
  async updateSession(@Param('id') id: string, @Body() dto: {}){
    return this.sessionService.update(+id, dto);
  }

  @Get('session/:sessionId/next')
  async getNextQuestion(@Param("sessionId") id: string){
    // Move to next question in session
    let session = await this.sessionService.findOne(+id);
    if (session.questionIdx + 1 > session.total){
      throw new NotFoundException('No next question');
    }

    Object.assign(session, {questionIdx: session.questionIdx + 1});
    await this.sessionService.update(+id, session);

    // return next question
    const question = (await this.quizQuestionService.findAll({page: session.questionIdx, limit: 1, filters: {quizId: String(session.exerciseId)}})).data[0];
    const answers = (await this.questionAnswerService.findAll({page: 1, limit: 0, filters: {questionId: String(question.id)}})).data;
    const remaining = session.total - session.questionIdx;
    return {data: {question, answers}, remaining};
  }

  @Post('evaluate_question')
  async evaluateQuestion(@Body() dto: {questionId: number, answerId: number, sessionId: number}){
    const {questionId, answerId, sessionId} = dto;
    let question = await this.quizQuestionService.findOne(questionId);
    let session = await this.sessionService.findOne(sessionId);
  
    // evaluate question and update session
    const correct = question.rightAnswerId === answerId;
    if (correct){
      Object.assign(session, {correct: session.correct + (session.correct==="" ? "" : ",") +`{"id": ${questionId}, "name": "${question.name}"}`});
      Object.assign(question, {noCorrect: question.noCorrect + 1});
    } else {
      Object.assign(session, {wrong: session.wrong + (session.wrong==="" ? "" : ",") + `{"id": ${questionId}, "name": "${question.name}", "chosen": ${answerId}}`});
      Object.assign(question, {noWrong: question.noWrong + 1});
    }
    await this.sessionService.update(sessionId, session)
    await this.quizQuestionService.update(questionId, question);

    return correct ? {result: "correct"} : {result: "incorrect", answer: question.rightAnswerId};
  }

  @Post('mark_hard/:questionId')
  async markAsHard(@Param('questionId') id: string){
    let question = await this.quizQuestionService.findOne(+id);

    Object.assign(question, {hardCount: question.hardCount + 1});

    return this.quizQuestionService.update(+id, question);
  }
  
  @Post('evaluate_session/:sessionId')
  async evaluateQuiz(@Param('sessionId') id: string){
    let session = await this.sessionService.findOne(+id);
  
    const correct = JSON.parse(`[${session.correct}]`);
    const wrong = JSON.parse(`[${session.wrong}]`);
    const no_correct = correct.length;
    const no_wrong = wrong.length;

    return {no_correct, no_wrong, correct, wrong};
  }

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
