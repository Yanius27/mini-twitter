import {ITag} from './ITag';

export interface IPostRequest {
  title?: string,
  text?: string,
  file?: FileList,
  tags?: ITag[],
}
