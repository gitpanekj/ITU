import { Injectable } from '@nestjs/common';
import { CreateTextReferenceDto } from '../dto/create-text-reference.dto';
import { UpdateTextReferenceDto } from '../dto/update-text-reference.dto';
import { TextReference } from '../entities/text-reference.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TextReferenceService {
  constructor(
    @InjectRepository(TextReference)
    private textReferenceRepository: Repository<TextReference>,
  ) {}

  async create(createTextReferenceDto: CreateTextReferenceDto): Promise<TextReference> {
    const newQuiz = this.textReferenceRepository.create(createTextReferenceDto);
    return await this.textReferenceRepository.save(newQuiz);
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters: Record<string, string>;
  }): Promise<{data: TextReference[], total: number}> {
    const { page, limit, filters } = params;

    const [data, total] = await this.textReferenceRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<TextReference> {
    return await this.textReferenceRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateTextReferenceDto: UpdateTextReferenceDto,
  ): Promise<TextReference> {
    let quiz = await this.textReferenceRepository.findOne({ where: { id: id } });
    if (!quiz) {
      throw new Error(`QUestion with ID ${id} not found`);
    }

    Object.assign(quiz, updateTextReferenceDto);
    return await this.textReferenceRepository.save(quiz);
  }

  async remove(id: number): Promise<void> {
    await this.textReferenceRepository.delete(id);
  }
}