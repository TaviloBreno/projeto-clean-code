import { type Repository, type DataSource } from 'typeorm'
import { type LoadUserAccount, type SaveFacebookAccount } from '../../../data/contracts/repos'
import { User } from '../entities'

export class UserAccountRepository implements LoadUserAccount, SaveFacebookAccount {
  private readonly userRepo: Repository<User>

  constructor (dataSource: DataSource) {
    this.userRepo = dataSource.getRepository(User)
  }

  async load ({ email }: LoadUserAccount.Params): Promise<LoadUserAccount.Result> {
    const user = await this.userRepo.findOne({ where: { email } })
    if (user !== null) {
      return {
        id: user.id,
        name: user.name
      }
    }
  }

  async saveWithFacebook (params: SaveFacebookAccount.Params): Promise<SaveFacebookAccount.Result> {
    let userId: string

    if (params.id !== undefined) {
      await this.userRepo.update({ id: params.id }, {
        name: params.name,
        facebookId: params.facebookId
      })
      userId = params.id
    } else {
      const user = await this.userRepo.save({
        name: params.name,
        email: params.email,
        facebookId: params.facebookId
      })
      userId = user.id
    }

    return { id: userId }
  }
}
