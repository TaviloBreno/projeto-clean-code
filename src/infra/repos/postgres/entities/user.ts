import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class PgUser {
  @PrimaryGeneratedColumn()
    id!: string

  @Column({ name: 'name', nullable: true })
    name?: string

  @Column({ name: 'email' })
    email!: string

  @Column({ name: 'facebook_id', nullable: true })
    facebookId?: string

  @Column({ name: 'picture_url', nullable: true })
    pictureUrl?: string

  @Column({ name: 'initials', nullable: true })
    initials?: string
}
