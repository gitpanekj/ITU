import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { FlashCard } from '../entities/flashcard.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFlashcardDto } from '../dto/create-flashcard.dto';
import { UpdateFlashcardDto } from '../dto/update-flashcard.dto';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectRepository(FlashCard) private FlashcardRepository: Repository<FlashCard>
  ){}
  async create(createFlashcardDto: CreateFlashcardDto) {
    const card = this.FlashcardRepository.create(createFlashcardDto);
    if (!card){
      throw new BadRequestException('Bad data provided');
    }
    const entity = await this.FlashcardRepository.save(card);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async findAll(params: {page: number, limit: number, filters: Record<string, string>}): Promise<{data: FlashCard[], total: number}> {
    const {page, limit, filters} = params;
    console.log({page, limit, filters});
    const [data, total] = await this.FlashcardRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit
    });

    return {data, total};
  }

  async findOne(id: number): Promise<FlashCard> {
    const flashcard = await this.FlashcardRepository.findOne({where: {id:id}});
    if (!flashcard){
      throw new NotFoundException(`Flashcard with ID ${id} not found`);
    }
    return flashcard;
  }

  async update(id: number, updateFlashcardDto: UpdateFlashcardDto): Promise<FlashCard> {
    let card = await this.FlashcardRepository.findOne({where: {id:id}});
    if (!card)
    {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    Object.assign(card, updateFlashcardDto);

    const entity = await this.FlashcardRepository.save(card);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }

    return entity;
  }

  async remove(id: number) : Promise<void>{
    const result = await this.FlashcardRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the record');
    }
  }
}
