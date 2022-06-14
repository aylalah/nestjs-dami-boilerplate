import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Event, formatPhoneNumber, getTier, isNullOrUndefined, isNumeric } from '../../utils';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ProductService {


  constructor(
    @InjectRepository(Product) public productRepository: Repository<Product>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  create(createProductDto: Partial<Product>): Promise<Product> {
    return this.productRepository.save(createProductDto);
  }

  findAll() {
    return this.productRepository.find();
  }


  findOne(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async update(id: string, product: Partial<Product>) {
    const result = await this.productRepository.update(id, product);
    return result
  }

  remove(id: string): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }

}
