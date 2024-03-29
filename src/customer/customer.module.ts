import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    CustomerRepository
  ])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
