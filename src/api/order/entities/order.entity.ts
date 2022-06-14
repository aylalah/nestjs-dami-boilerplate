import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({
    name: 'orders',
    // orderBy: {
    //   email: 'ASC',
    // },
  })
  @Unique(['id'])
  export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { name: 'product_id', nullable: true, length: 100 })
    product_id?: string;

    @Column('varchar', { name: 'app_code', nullable: true, length: 5 })
    app_code?: string;

    @Column('varchar', { name: 'serial_number', nullable: true, length: 16 })
    serial_number?: string;

    @Column('varchar', { name: 'plan', nullable: true, length: 50 })
    plan?: string;

    @Column('varchar', { name: 'school_name', nullable: true, length: 52 })
    school_name?: string;
  
    @Column('varchar', { name: 'address', nullable: true, length: 200 })
    address?: string;

    @Column('varchar', { name: 'about', nullable: true, length: 200 })
    about?: string;

    @Column('varchar', { name: 'country', nullable: true, length: 50 })
    country?: string;

    @Column('varchar', { name: 'state', nullable: true, length: 50 })
    state?: string;

    @Column('varchar', { name: 'town', nullable: true, length: 50 })
    town?: string;

    @Column('varchar', { name: 'poster_code', nullable: true, length: 20 })
    poster_code?: string;

    @Column('varchar', { name: 'email', nullable: true, length: 100 })
    email?: string;

    @Column('varchar', { name: 'password', nullable: true, length: 100 })
    password?: string;

    @Column('varchar', { name: 'mobile', nullable: true, length: 20 })
    mobile?: string;

    @Column('varchar', { name: 'phone', nullable: true, length: 20 })
    phone?: string;
    
      @Column('varchar', { name: 'document', nullable: true, length: 255, transformer: {
        to: (value: string) => value,
        from: (value: string) => value ? `${process.env.DOCUMENT_BASE_URL}/${value}` : value,
      } })
      document?: string;

    @Column('varchar', { name: 'fax', nullable: true, length: 20 })
    fax?: string;

    @Column('varchar', { name: 'website', nullable: true, length: 100 })
    website?: string;

    @Column('varchar', { name: 'app_url', nullable: true, length: 100 })
    app_url?: string;

    @Column('varchar', { name: 'contact_person', nullable: true, length: 100 })
    contact_person?: string;

    @Column('varchar', { name: 'status', nullable: true, length: 10 })
    status?: string;

    @Column('varchar', { name: 'created_by', nullable: true, length: 100 })
    created_by?: string;

    @Column('varchar', { name: 'updated_by', nullable: true, length: 100 })
    updated_by?: string;

    @Column('date', { name: 'created_at', nullable: true })
    created_at?: Date | string;
  
    @Column('datetime', { name: 'updated_at', nullable: true })
    updated_at?: Date | string;

    @CreateDateColumn({ name: 'timestamp' })
    timestamp?: Date;
  }