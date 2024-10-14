import { Injectable } from '@nestjs/common';
import { CreateTextDto } from '../dto/create-text.dto';
import { UpdateTextDto } from '../dto/update-text.dto';
import { QuizText } from '../entities/text.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuizTextService {
  constructor(
    @InjectRepository(QuizText)
    private quizTextRepository: Repository<QuizText>,
  ) {}

  async create(createQuizTextDto: CreateTextDto): Promise<QuizText> {
    const newQuiz = this.quizTextRepository.create(createQuizTextDto);
    return await this.quizTextRepository.save(newQuiz);
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters: Record<string, string>;
  }): Promise<{data: QuizText[], total: number}> {
    const { page, limit, filters } = params;

    const [data, total] = await this.quizTextRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<QuizText> {
    return await this.quizTextRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateQuizTextDto: UpdateTextDto,
  ): Promise<QuizText> {
    let quiz = await this.quizTextRepository.findOne({ where: { id: id } });
    if (!quiz) {
      throw new Error(`QUestion with ID ${id} not found`);
    }

    Object.assign(quiz, updateQuizTextDto);
    return await this.quizTextRepository.save(quiz);
  }

  async remove(id: number): Promise<void> {
    await this.quizTextRepository.delete(id);
  }
}
