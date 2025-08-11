import { Controller, Post, Get, Param, Body, ParseUUIDPipe, Logger } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { CreateTransactionServiceTsService } from '../services/aplication/create-transaction-event.service';
import { GetTransactionService } from '../services/aplication/get-transaction.service';
@Controller('transactions')
export class TransactionsController {
  private readonly logger = new Logger(TransactionsController.name);

  constructor(
    private readonly createTransactionService: CreateTransactionServiceTsService,
    private readonly getTransactionService: GetTransactionService,
  ) {}

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    this.logger.log(`Creating transaction with data: ${JSON.stringify(createTransactionDto)}`);
    const response = await this.createTransactionService.produceTransactionEvent(createTransactionDto);
    return { message: 'Transaccion', data: response };
  }

  @Get(':id')
  async getTransaction(@Param('id', new ParseUUIDPipe()) id: string) {
    this.logger.log(`Fetching transaction with ID: ${id}`);
    const response = await this.getTransactionService.getTransactionById(id);
    return response;
  }
}
