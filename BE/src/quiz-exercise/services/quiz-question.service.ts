import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizQuestionDto } from '../dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from '../dto/update-quiz-question.dto';
import { QuizQuestion } from '../entities/quiz-question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuizQuestionService {
  constructor(
    @InjectRepository(QuizQuestion)
    private quizQuestionRepository: Repository<QuizQuestion>,
  ) {}
  async create(
    createQuizQuestionDto: CreateQuizQuestionDto,
  ): Promise<QuizQuestion> {
    const newQuiz = this.quizQuestionRepository.create(createQuizQuestionDto);
    if (!newQuiz){
      throw new BadRequestException('Bad data provided');
    }
    const entity = await this.quizQuestionRepository.save(newQuiz);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters: Record<string, string>;
    order?: Record<string, string>;
  }): Promise<{ data: QuizQuestion[]; total: number }> {
    const { page, limit, filters, order } = params;
    const [data, total] = await this.quizQuestionRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      order: order
    });
    return { data, total };
  }

  async findOne(id: number): Promise<QuizQuestion> {
    const result = await this.quizQuestionRepository.findOne({ where: { id: id } });
    if (!result){
      throw new NotFoundException(`QuizQuestion with ID ${id} not found`);
    }
    return result;
  }

  async update(
    id: number,
    updateQuizQuestionDto: UpdateQuizQuestionDto,
  ): Promise<QuizQuestion> {
    let quiz = await this.quizQuestionRepository.findOne({ where: { id: id } });
    if (!quiz) {
      throw new NotFoundException(`QUestion with ID ${id} not found`);
    }

    Object.assign(quiz, updateQuizQuestionDto);
    const entity = await this.quizQuestionRepository.save(quiz);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.quizQuestionRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the record');
    }
  }
}
