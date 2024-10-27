import type { AccountRoleEnum } from '@/enums/account-role.enum'
import type { BaseModel } from '@/models/base.model'

export interface UserModel extends BaseModel {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  roles?: AccountRoleEnum[]
  phone: string
  gender: string
  designation: string
  bio: string
  profilePhoto: string
  location: string
  resetPasswordToken: string
  resetPasswordSendAt: Date
  resetPasswordAt: Date
  website: string
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  emailConfirmed: boolean
}

export interface CreateUserModel extends Partial<UserModel> {}
