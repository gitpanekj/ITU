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
import { FlashcardSessionService } from './services/session.service';
import { randomInt } from 'crypto';

@Controller('flashcard-exercise')
@UseFilters(GlobalExceptionFilter)
export class FlashcardExerciseController {
  constructor(
    private readonly flashcardExerciseService: FlashcardExerciseService,
    private readonly flashcardService: FlashcardService,
    private readonly sessionService: FlashcardSessionService,
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
    @Query('hard_order') hard_order: 'ASC' | 'DESC' | 'NONE' = 'NONE',
    @Query() _filters: any,
  ) {
    const { page: _, limit: __, hard_order: ___, ...filters } = _filters;
    let order;
    if (hard_order != 'NONE') {
      order = { hardCount: hard_order };
    } else {
      order = { id: 'DESC' };
    }
    return this.flashcardService.findAll({
      page,
      limit,
      filters,
      order: order,
    });
  }

  @Get('card/:id')
  async findOneCard(@Param('id') id: string) {
    const flashcard = await this.flashcardService.findOne(+id);

    return { flashcard, feedback: Object.values(flashcard.feedback) }; // return all the related feedbacks
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

  /* Session */
  @Get('create_session/:exerciseId')
  async createQuizSession(@Param('exerciseId') id: string) {
    const { data, total } = await this.flashcardService.findAll({
      page: 1,
      limit: 0,
      filters: { flashcardExerciseId: id },
    });
    const session = await this.sessionService.create({
      exerciseId: +id,
      total: total,
      flashcardId: randomInt(0, total),
    });
    return { flashcardSessionId: session.id };
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

    Object.assign(session, {
      flashcardId: (session.flashcardId % session.total) + 1,
      counter: (session.counter % session.total) + 1,
    });
    await this.sessionService.update(+id, session);

    // return next flashcard
    const flashcard = (
      await this.flashcardService.findAll({
        page: session.flashcardId,
        limit: 1,
        filters: { flashcardExerciseId: String(session.exerciseId) },
        order: { id: 'ASC' },
      })
    ).data[0];
    const hard = session.markedAsHard
      .split(';')
      .map(Number)
      .includes(flashcard.id);
    // get feedback if exists
    const feedback = session.feedback[flashcard.id];

    return {
      flashcard,
      hard,
      current: session.counter,
      total: session.total,
      feedback,
    };
  }

  @Get('session/:sessionId/prev')
  async getPrevQuestion(@Param('sessionId') id: string) {
    // Move to next question in session
    let session = await this.sessionService.findOne(+id);

    const next_id =
      session.flashcardId - 1 > 0 ? session.flashcardId - 1 : session.total;
    const counter =
      session.counter - 1 > 0 ? session.counter - 1 : session.total;
    Object.assign(session, { flashcardId: next_id, counter });
    await this.sessionService.update(+id, session);

    // return next flashcard
    const flashcard = (
      await this.flashcardService.findAll({
        page: session.flashcardId,
        limit: 1,
        filters: { flashcardExerciseId: String(session.exerciseId) },
        order: { id: 'ASC' },
      })
    ).data[0];
    const hard = session.markedAsHard
      .split(';')
      .map(Number)
      .includes(flashcard.id);
    // get feedback if exists
    const feedback = session.feedback[flashcard.id];

    return {
      flashcard,
      hard,
      current: session.counter,
      total: session.total,
      feedback,
    };
  }

  @Post('mark_hard')
  async markAsHard(@Body() dto: { sessionId: number; flashcardId: number }) {
    const { sessionId, flashcardId } = dto;
    console.log(sessionId, flashcardId);

    let session = await this.sessionService.findOne(sessionId);
    let hard_set = new Set(session.markedAsHard.split(';').map(Number));
    let history_hard = new Set(session.historyHard.split(';').map(Number));

    // update statistics
    if (!history_hard.has(flashcardId)) {
      let flashcard = await this.flashcardService.findOne(flashcardId);
      Object.assign(flashcard, { hardCount: flashcard.hardCount + 1 });
      await this.flashcardService.update(flashcardId, flashcard);
    }

    // Update session
    history_hard.add(flashcardId);
    if (hard_set.has(flashcardId)) {
      hard_set.delete(flashcardId);
    } else {
      hard_set.add(flashcardId);
    }

    let updated_hard = Array.from(hard_set.values());
    let updated_history_hard = Array.from(history_hard.values());
    Object.assign(session, {
      markedAsHard: updated_hard.join(';'),
      historyHard: updated_history_hard.join(';'),
    });

    return this.sessionService.update(sessionId, session);
  }

  @Get('evaluate_session/:sessionId')
  async getHard(@Param('sessionId') id: string) {
    const session = await this.sessionService.findOne(+id);
    let hard_cards = [];
    for (let id of session.markedAsHard.split(';').map(Number)) {
      if (id === 0) continue;
      let card = await this.flashcardService.findOne(id);
      card['session_feedback'] = session.feedback[id];
      hard_cards.push(card);
      console.log(hard_cards);
    }

    return { hard_cards };
  }

  @Post('feedback')
  async leftFeedback(
    @Body() dto: { flashcardId: number; sessionId: number; feedback: string },
  ) {
    const { flashcardId, sessionId, feedback } = dto;
    let flashcard = await this.flashcardService.findOne(flashcardId);
    let session = await this.sessionService.findOne(sessionId);

    const session_feedbacks = session.feedback;
    const card_feedbacks = flashcard.feedback;

    // Update feedbacks
    card_feedbacks[sessionId] = feedback;
    session_feedbacks[flashcardId] = feedback;

    // Save changes
    Object.assign(flashcard, { feedback: card_feedbacks });
    Object.assign(session, { feedback: session_feedbacks });
    this.flashcardService.update(flashcardId, flashcard);
    this.sessionService.update(sessionId, session);
  }

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
    } catch (error) {
      throw new HttpException(
        'Error fetching resource',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
