import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column()
    name!: string

  @Column()
    email!: string

  @Column({ name: 'facebook_id', nullable: true })
    facebookId?: string
}
