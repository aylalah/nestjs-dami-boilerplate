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
  success,
  trimUser,
  unifyPhoneNumber,
} from '../../utils';
import { UserService, User } from '../user';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { ConfigService } from '@nestjs/config';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto, StatusDto } from './dto/update-product.dto';
import { MultipartFile } from 'fastify-multipart';
import { IsNull, Like, Not } from 'typeorm';
import * as moment from "moment";
const fs = require("fs");
const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
@Controller('product')
export class ProductController {
  constructor(
    @Inject(forwardRef(() => ProductService))
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async create(@Body() createProductDto: CreateProductDto, @GetUser() authUser: User) {

    console.log(createProductDto);
    const validator =  this.eventEmitter.emit(Event.USER_BEFORE_REGISTER, { createProductDto });

    let {
      product_name,
      product_type,
      description,
      image,
      status
    } = createProductDto;

    const existingProduct = await this.productService.productRepository.findOne({
      select: ['id', 'product_name'],
      where: [{ product_name: product_name }],
    }) ?? null;

    // enforce unique phone number code
    if (existingProduct?.product_name === product_name) {
      return error('Registration', 'Looks like you already have this product. Product already exist');
    }


  let fileName = '';
    if (image == 'product.jpg') {
       fileName = 'product.jpg';
    } else {
       fileName = product_name+'_'+product_type+'.png';
      // to declare some path to store your converted image
      const base64Data  = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
      if (base64Data.length !== 3) {
        return new Error('Invalid input string');
      }
      const fileContents =  Buffer.from(base64Data[2], 'base64')
      const imag = fs.writeFile(`public/images/${fileName}`, fileContents, 'base64', (err) => {
        if (err) return console.error(err)
        console.log('file saved to ', `public/images/${fileName}`)
      })
    }

    const newProduct = await this.productService.create({
      product_name,
      product_type,
      description,
      image: fileName,
      status: 1,
      created_by: authUser.id,
      created_at: todatsDate,
      updated_at: now
    });

    // return this.productService.create(createProductDto);

    return success(
      {
        product: {
          product_name: newProduct.product_name,
          product_type: newProduct.product_type,
          description: newProduct.description,
          image: newProduct.image,
          status
        },
        products: await this.productService.findAll(),
      },
      'User Registration',
      'User successfully registered',
    );
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
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
  async update(@Param('id') id: string, @Body() product: UpdateProductDto, @GetUser() authUser: User) {

    let {
      product_name,
      product_type,
      description,
      image
    } = product;

    let fileName = '';
    if (image == '') {
      const prod = await this.productService.findOne(id);
       fileName = prod.image;
    } else {
       fileName = product_name+'_'+product_type+'.png';
      // to declare some path to store your converted image
      const base64Data  = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
      if (base64Data.length !== 3) {
        return new Error('Invalid input string');
      }
      const fileContents =  Buffer.from(base64Data[2], 'base64')
      const imag = fs.writeFile(`public/images/${fileName}`, fileContents, 'base64', (err) => {
        if (err) return console.error(err)
        console.log('file saved to ', `public/images/${fileName}`)
      })
    }

     const result = await this.productService.update(id, 
      
      { product_name,
        product_type,
        description,
        image: fileName,
        updated_by: authUser.id,
        updated_at: now
      });

    return success(
      {
        id,
        product: await this.productService.findOne(id)
      },
      'product',
      'product details updated',
    );
  }

  @Patch(':id/activation')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async suspend(@Param('id') id: string, @GetUser() authUser: User, @Body() body: StatusDto) {
    const { status } = body
    let statusDesc = '';

    if (status == 0) {
      statusDesc = 'Inactive';
    }

    if (status == 1) {
      statusDesc = 'Pending';
    }

    if (status == 2) {
      statusDesc = 'Active';
    }

    const existingProduct = await this.productService.findOne(id);
    if (existingProduct.status == status) {
      return error(
        'Product Status',
        `'This Product already ${statusDesc}.'`,
      );
    }
    await this.productService.update(id, {
      status: status,
      updated_at: new Date(),
    });

    // this.eventEmitter.emit(Event.LOG_ACTIVITY, {
    //   action: 'Suspend',
    //   category: 'User',
    //   message: null,
    //   data: {
    //     message,
    //     id,
    //   },
    //   user: {
    //     id: authUser.id,
    //   },
    // });

    return success(
      {
        id,
        product: await this.productService.findOne(id)
      },
      'product',
      'product activated successfully',
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
