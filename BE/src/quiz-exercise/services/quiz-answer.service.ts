import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionAnswerDto } from '../dto/create-question-answer.dto';
import { UpdateQuestionAnswerDto } from '../dto/update-question-answer.dot';
import { QuestionAnswer } from '../entities/question-answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionAnswerService {
  constructor(
    @InjectRepository(QuestionAnswer)
    private questionAnswerRepository: Repository<QuestionAnswer>,
  ) {}
  async create(
    createQuestionAnswerDto: CreateQuestionAnswerDto,
  ): Promise<QuestionAnswer> {
    const questionAnswer = this.questionAnswerRepository.create(
      createQuestionAnswerDto,
    );
    if (!questionAnswer){
      throw new BadRequestException('Bad data provided');
    }
    const entity = await this.questionAnswerRepository.save(questionAnswer);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters: Record<string, string>;
  }): Promise<{ data: QuestionAnswer[]; total: number }> {
    const { page, limit, filters } = params;

    const [data, total] = await this.questionAnswerRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<QuestionAnswer> {
    const questionAnswer = await this.questionAnswerRepository.findOne({ where: { id: id } });
    if (!questionAnswer){
      throw new NotFoundException('Failed to save the entity');
    }
    return questionAnswer;
  }

  async update(
    id: number,
    updateQuestionAnswerDto: UpdateQuestionAnswerDto,
  ): Promise<QuestionAnswer> {
    let quiz = await this.questionAnswerRepository.findOne({
      where: { id: id },
    });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    Object.assign(quiz, updateQuestionAnswerDto);
    const entity = await this.questionAnswerRepository.save(quiz);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.questionAnswerRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the record');
    }
  }
}
