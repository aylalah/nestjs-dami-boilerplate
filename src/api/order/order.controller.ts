import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  forwardRef,
  Inject,
  Query,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt-strategy/jwt.guard';
import { GetUser } from '../../decorators';
import {
  error,
  Event,
  makeFilter,
  mask,
  randomDigits,
  random,
  success,
  trimUser,
  unifyPhoneNumber,
} from '../../utils'; 
// import { AuthController } from '../auth/auth.controller';
import { UserService, User } from '../user';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { ConfigService } from '@nestjs/config';
import { MultipartFile } from 'fastify-multipart';
import { IsNull, Like, Not } from 'typeorm';
import * as moment from "moment";

let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");

@Controller('order')
export class OrderController {

  constructor(
    @Inject(forwardRef(() => OrderService))
    private readonly userService: UserService,
    // private readonly authController: AuthController,
    private readonly orderService: OrderService,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async create(@Body() createOrderDto: CreateOrderDto, @GetUser() authUser: User) {

    console.log(createOrderDto);
    const validator =  this.eventEmitter.emit(Event.USER_BEFORE_REGISTER, { createOrderDto });

    let {
      product_id, plan, school_name, address, about, country, state, town, poster_code,
      email, mobile, phone, document, fax, website, app_url, contact_person,status
    } = createOrderDto;

    // const useer = {
    //   first_name: createOrderDto.school_name,
    //   last_name: createOrderDto.product_id,
    //   email: createOrderDto.email,
    //   image: 'user.png',
    //   phone_number: createOrderDto.phone,
    //   gender: createOrderDto.plan,
    //   home_address: createOrderDto.address,
    //   password: ''
    // };

    // const auth = this.authController.register(useer);
    
    const existingProduct = await this.orderService.orderRepository.findOne({
      select: ['id', 'serial_number', 'school_name'],
      where: [{ school_name: school_name }],
    }) ?? null;

    // enforce unique phone number code
    if (existingProduct?.school_name === school_name) {
      return error('Registration', 'Looks like you already have this school registered. school already exist');
    }

         // generate user serial code
         const serial_numberExist = async (referral_code: string) => {
          const order = await this.orderService.orderRepository.findOne(school_name);
          return !!order?.serial_number;
        };

        console.log(serial_numberExist);
        
        let productSerialNumber = random(16);
        while ((await serial_numberExist(productSerialNumber)) === true) {
          productSerialNumber = random(12);
        }
    
        console.log(productSerialNumber);

    const newOrder = await this.orderService.create({
      product_id, serial_number: productSerialNumber, plan, school_name, address, about, country, state, town, poster_code,
      email, mobile, phone, document: 'document.pdf', fax, website, app_url, contact_person,status,
      created_by: authUser.id,
      created_at: todatsDate,
      updated_at: now
    });

    // return this.productService.create(createProductDto);

    return success(
      {
        product_name: newOrder.school_name,
        serial_number: newOrder.serial_number,
        product_id,
        about,
        status
      },
      'Order',
      'Product successfully ordered',
    );
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const product = await this.orderService.findOne(id);
    return success(
      product ? {
        ...product
      } : null,
      'product',
      'product details',
    );
  }

  
  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() order: UpdateOrderDto, @GetUser() authUser: User) {

    let {
      product_id, plan, serial_number, school_name, address, about, country, state, town, poster_code,
      email, mobile, phone, document, fax, website, app_url, contact_person,status,
    } = order;

        // generate user serial code
    const serial_numberExist = async (referral_code: string) => {
      const order = await this.orderService.orderRepository.findOne(school_name);
      return !!order?.serial_number;
    };

    console.log(serial_numberExist);

    let productSerialNumber = random(16);
    while ((await serial_numberExist(productSerialNumber)) === true) {
      productSerialNumber = random(12);
    }

    console.log(productSerialNumber);

     const result = await this.orderService.update(id, 
      { 
        product_id, plan, serial_number: productSerialNumber, school_name, address, about, country, state, town, poster_code,
        email, mobile, phone, document, fax, website, app_url, contact_person,status,
        updated_by: authUser.id,
        updated_at: now
      });

    return success(
      {
        id,
        result
      },
      'product',
      'product details updated',
    );
  }
  
  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    const product = await this.userService.remove(id);
    return success(
      {
        id,
        product
      },
      'product',
      'Product deleted',
    );
  }
}
