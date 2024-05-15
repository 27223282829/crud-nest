import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DoctoresService } from './doctores.service';
import { CreateDoctoreDto } from './dto/create-doctore.dto';
import { UpdateDoctoreDto } from './dto/update-doctore.dto';

@Controller('doctores')
@UsePipes(new ValidationPipe())
export class DoctoresController {
  constructor(private readonly doctoresService: DoctoresService) {}
  @Post()
  create(@Body() createDoctoreDto: CreateDoctoreDto) {
    // console.log(createPacienteDto);
    return this.doctoresService.create(createDoctoreDto);
  }

  @Get()
  findAll(@Query() query: string) {
    console.log(query);
    return this.doctoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctoreDto: UpdateDoctoreDto) {
    return this.doctoresService.update(+id, updateDoctoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctoresService.remove(+id);
  }
}
