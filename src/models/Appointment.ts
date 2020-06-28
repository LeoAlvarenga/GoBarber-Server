import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'


// set "experimentalDecorators": true, and "emitDecoratorMetadata": true, on tsconfig.json to enable decorators


@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider: string

    @Column('timestamp with time zone')
    date: Date

// set "strictPropertyInitialization": false, on tsconfig.json

}

export default Appointment