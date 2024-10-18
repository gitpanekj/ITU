import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ExerciseGroupService } from './exercise-group.service';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';
import { GlobalExceptionFilter } from 'src/exception-filter/filter';

@Controller('exercise-group')
@UseFilters(GlobalExceptionFilter)
export class ExerciseGroupController {
  constructor(private readonly exerciseGroupService: ExerciseGroupService) {}

  @Post()
  create(@Body() createExerciseGroupDto: CreateExerciseGroupDto) {
    return this.exerciseGroupService.create(createExerciseGroupDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 0,
    @Query() _filters: any,
  ) {
    const { page: _, limit: __, ...filters } = _filters;

    return this.exerciseGroupService.findAll({ page, limit, filters });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseGroupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseGroupDto: UpdateExerciseGroupDto,
  ) {
    return this.exerciseGroupService.update(+id, updateExerciseGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseGroupService.remove(+id);
  }
}
