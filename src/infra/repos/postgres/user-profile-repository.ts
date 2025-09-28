import { type SaveUserPicture, type LoadUserProfile } from '@/data/contracts/repos/user-profile'
import { BaseRepository } from '@/infra/db/typeorm/repositories/base-repository'
import { PgUser } from '@/infra/repos/postgres/entities/user'

export class PgUserProfileRepository extends BaseRepository<PgUser> implements SaveUserPicture, LoadUserProfile {
  constructor () {
    super(PgUser)
  }

  async savePicture (params: SaveUserPicture.Params): Promise<SaveUserPicture.Result> {
    const updateData: Partial<PgUser> = {}
    if (params.pictureUrl !== undefined) {
      updateData.pictureUrl = params.pictureUrl
    }
    if (params.initials !== undefined) {
      updateData.initials = params.initials
    }

    await this.update({ id: params.id }, updateData)
    return undefined
  }

  async load (params: LoadUserProfile.Params): Promise<LoadUserProfile.Result> {
    const user = await this.findOne({
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
