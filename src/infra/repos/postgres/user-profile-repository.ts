import { type Repository, getRepository } from 'typeorm'
import { type SaveUserPicture, type LoadUserProfile } from '@/data/contracts/repos/user-profile'
import { PgUser } from '@/infra/repos/postgres/entities/user'

export class PgUserProfileRepository implements SaveUserPicture, LoadUserProfile {
  private readonly pgUserRepo: Repository<PgUser>

  constructor () {
    this.pgUserRepo = getRepository(PgUser)
  }

  async savePicture (params: SaveUserPicture.Params): Promise<SaveUserPicture.Result> {
    const updateData: Partial<PgUser> = {}
    if (params.pictureUrl !== undefined) {
      updateData.pictureUrl = params.pictureUrl
    }
    if (params.initials !== undefined) {
      updateData.initials = params.initials
    }

    await this.pgUserRepo.update({ id: params.id }, updateData)
    return undefined
  }

  async load (params: LoadUserProfile.Params): Promise<LoadUserProfile.Result> {
    const user = await this.pgUserRepo.findOne({
      where: { id: params.id },
      select: ['name']
    })
    const result: LoadUserProfile.Result = {}
    if (user?.name) {
      result.name = user.name
    }
    return result
  }
}
