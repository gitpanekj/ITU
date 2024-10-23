import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReadingSessionDto } from '../dto/create-reading-session.dto';
import { UpdateReadingSessionDto } from '../dto/update-reading-session.dto';
import { Text } from '../entities/text.entity';
import { CreateTextDto } from '../dto/create-text.dto';
import { UpdateTextDto } from '../dto/update-text.dto';


@Injectable()
export class TextService {
  constructor(
    @InjectRepository(Text)
    private textRepository: Repository<Text>,
  ) {}
  async create(
    dto: CreateTextDto,
  ): Promise<Text> {
    const text = this.textRepository.create(dto);
    if (!text){
      throw new BadRequestException('Bad data provided');
    }
    const entity = await this.textRepository.save(text);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters: Record<string, string>;
  }): Promise<{ data: Text[]; total: number }> {
    const { page, limit, filters } = params;

    const [data, total] = await this.textRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Text> {
    const text = await this.textRepository.findOne({ where: { id: id } });
    if (!text){
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return text;
  }

  async update(
    id: number,
    dto: UpdateTextDto,
  ): Promise<Text> {
    let text = await this.textRepository.findOne({ where: { id: id } });
    if (!text) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    Object.assign(text, dto);
    const entity = await this.textRepository.save(text);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }

    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.textRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the record');
    }
  }
}
