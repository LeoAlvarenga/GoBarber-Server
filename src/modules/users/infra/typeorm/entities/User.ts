import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'


// set "experimentalDecorators": true, and "emitDecoratorMetadata": true, on tsconfig.json to enable decorators


@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string
    
    @Column()
    email: string
    
    @Column()
    password: string

    @Column()
    avatar: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

// set "strictPropertyInitialization": false, on tsconfig.json

}

export default User