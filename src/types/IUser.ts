import {IPost} from './IPost';

export interface IUser {
  id: number,
  firstName: string,
  lastName: string,
  nickname: string,
  phone?: string,
  email?: string,
  updateTime: string,
  createTime: string,
  avatarId: number,
  pinnedPostId: number,
  description: string,
  subscriptions?: unknown[],
  posts?: IPost[],
}
