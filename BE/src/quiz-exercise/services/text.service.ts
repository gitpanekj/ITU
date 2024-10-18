import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    if (!newQuiz){
      throw new BadRequestException('Provided bad data');
    }
    const entity = await this.quizTextRepository.save(newQuiz);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
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
    const quizText = await this.quizTextRepository.findOne({ where: { id: id } });
    if (!quizText){
      throw new NotFoundException(`Quiz text with ID ${id} not found`);
    }
    return quizText;
  }

  async update(
    id: number,
    updateQuizTextDto: UpdateTextDto,
  ): Promise<QuizText> {
    let quiz = await this.quizTextRepository.findOne({ where: { id: id } });
    if (!quiz) {
      throw new NotFoundException(`QUestion with ID ${id} not found`);
    }

    Object.assign(quiz, updateQuizTextDto);
    const entity = await this.quizTextRepository.save(quiz);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.quizTextRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the entity');
    }
  }
}
