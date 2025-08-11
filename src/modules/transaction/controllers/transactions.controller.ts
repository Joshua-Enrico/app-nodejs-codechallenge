import { Controller, Post, Get, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { CreateTransactionServiceTsService } from '../services/aplication/create-transaction-event.service';
import { GetTransactionService } from '../services/aplication/get-transaction.service';
@Controller('transactions')
export class TransactionsController {

  constructor(
    private readonly createTransactionService: CreateTransactionServiceTsService,
    private readonly getTransactionService: GetTransactionService,
  ) {}
  
  // Endpoint para crear una transacción
  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    console.log('Creating transaction with data:', createTransactionDto);
    // Aquí iría la lógica para crear la transacción
    // Por ejemplo, llamar a un servicio que guarde la transacción
    const response = await this.createTransactionService.produceTransactionEvent(createTransactionDto);
    return { message: 'Transaccion', data: response };
  }

  //Endpoint para consultar una transacción por ID
  @Get(':id')
  async getTransaction(@Param('id', new ParseUUIDPipe()) id: string) {

    console.log('Fetching transaction with ID:', id);
    // Aquí iría la lógica
    const response = await this.getTransactionService.getTransactionById(id);
    return response;
  }
}
