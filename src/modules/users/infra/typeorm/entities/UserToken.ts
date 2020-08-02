import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm'


// set "experimentalDecorators": true, and "emitDecoratorMetadata": true, on tsconfig.json to enable decorators


@Entity('user_tokens')
class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @Generated('uuid')
    token: string

    @Column()
    user_id: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

// set "strictPropertyInitialization": false, on tsconfig.json

}

export default UserToken