import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import User from './User'


// set "experimentalDecorators": true, and "emitDecoratorMetadata": true, on tsconfig.json to enable decorators


@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider_id: string

    @ManyToOne(() => User)
    @JoinColumn({name: 'provider_id'})
    provider: User

    @Column('timestamp with time zone')
    date: Date

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

// set "strictPropertyInitialization": false, on tsconfig.json

}

export default Appointment