import { Injectable } from '@nestjs/common';

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
    return await this.FlashcardRepository.save(card);
  }

  async findAll(): Promise<FlashCard[]> {
    return await this.FlashcardRepository.find();
  }

  async findOne(id: number): Promise<FlashCard> {
    return await this.FlashcardRepository.findOne({where: {id:id}});
  }

  async update(id: number, updateFlashcardDto: UpdateFlashcardDto): Promise<FlashCard> {
    let card = await this.FlashcardRepository.findOne({where: {id:id}});
    if (!card)
    {
      throw new Error(`Exercise with ID ${id} not found`);
    }

    Object.assign(card, updateFlashcardDto);

    return await this.FlashcardRepository.save(card);
  }

  async remove(id: number) : Promise<void>{
    await this.FlashcardRepository.delete(id);
  }
}
