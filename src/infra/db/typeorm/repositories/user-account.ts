import { type LoadUserAccount, type SaveFacebookAccount } from '../../../../data/contracts/repos'
import { BaseRepository } from '@/infra/db/typeorm/repositories/base-repository'
import { User } from '../entities'

export class UserAccountRepository extends BaseRepository<User> implements LoadUserAccount, SaveFacebookAccount {
  constructor () {
    super(User)
  }

  async load ({ email }: LoadUserAccount.Params): Promise<LoadUserAccount.Result> {
    const user = await this.findOne({ where: { email } })
    if (user !== null) {
      return {
        id: user.id,
        name: user.name
      }
    }
    return undefined
  }

  async saveWithFacebook (params: SaveFacebookAccount.Params): Promise<SaveFacebookAccount.Result> {
    let userId: string

    if (params.id !== undefined) {
      await this.update({ id: params.id }, {
        name: params.name,
        facebookId: params.facebookId
      })
      userId = params.id
    } else {
      const repository = this.getRepository()
      const user = repository.create({
        name: params.name,
        email: params.email,
        facebookId: params.facebookId
      })
      const savedUser = await repository.save(user)
      userId = savedUser.id
    }

    return { id: userId }
  }
}
