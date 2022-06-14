import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Event, formatPhoneNumber, getTier, isNullOrUndefined, isNumeric } from '../../utils';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) public orderRepository: Repository<Order>,
    private readonly eventEmitter: EventEmitter2
  ) {}
  create(createOrderDto: Partial<Order>): Promise<Order> {
    return this.orderRepository.save(createOrderDto);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: string): Promise<Order> {
    return this.orderRepository.findOne(id);
  }


  async update(id: string, order: Partial<Order>) {
    const result = await this.orderRepository.update(id, order);
    return result
  }

  remove(id: string): Promise<DeleteResult> {
    return this.orderRepository.delete(id);
  }
}
