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
    name: 'roles',
    // orderBy: {
    //   email: 'ASC',
    // },
  })
  @Unique(['id'])
  export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { name: 'role_name', nullable: true, length: 100 })
    role_name?: string;

    @Column('varchar', { name: 'description', nullable: true, length: 200 })
    description?: string;

    @Column('varchar', { name: 'status', nullable: true, length: 50 })
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