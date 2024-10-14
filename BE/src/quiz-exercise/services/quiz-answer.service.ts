import { Injectable } from '@nestjs/common';
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
    const newQuiz = this.questionAnswerRepository.create(
      createQuestionAnswerDto,
    );
    return await this.questionAnswerRepository.save(newQuiz);
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
    return await this.questionAnswerRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateQuestionAnswerDto: UpdateQuestionAnswerDto,
  ): Promise<QuestionAnswer> {
    let quiz = await this.questionAnswerRepository.findOne({
      where: { id: id },
    });
    if (!quiz) {
      throw new Error(`Quiz with ID ${id} not found`);
    }

    Object.assign(quiz, updateQuestionAnswerDto);
    return await this.questionAnswerRepository.save(quiz);
  }

  async remove(id: number): Promise<void> {
    await this.questionAnswerRepository.delete(id);
  }
}
