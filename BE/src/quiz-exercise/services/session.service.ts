import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizSession } from '../entities/quiz-session.entity';
import { CreateQuizSessionDto } from '../dto/create-quiz-session.dto';
import { UpdateQuizSessionDto } from '../dto/update-quiz-session.dto';



@Injectable()
export class QuizSessionService {
  constructor(
    @InjectRepository(QuizSession)
    private quizSessionRepository: Repository<QuizSession>,
  ) {}
  async create(
    dto: CreateQuizSessionDto,
  ): Promise<QuizSession> {
    const session = this.quizSessionRepository.create(dto);
    if (!session){
      throw new BadRequestException('Bad data provided');
    }
    const entity = await this.quizSessionRepository.save(session);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters: Record<string, string>;
  }): Promise<{ data: QuizSession[]; total: number }> {
    const { page, limit, filters } = params;

    const [data, total] = await this.quizSessionRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<QuizSession> {
    const session = await this.quizSessionRepository.findOne({ where: { id: id } });
    if (!session){
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return session;
  }

  async update(
    id: number,
    dto: UpdateQuizSessionDto,
  ): Promise<QuizSession> {
    let session = await this.quizSessionRepository.findOne({ where: { id: id } });
    if (!session) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    Object.assign(session, dto);
    const entity = await this.quizSessionRepository.save(session);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }

    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.quizSessionRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the record');
    }
  }
}
