
export interface IPost {
  id?: string;
  title: string;
  body: string;
  userId: string;
}

export interface IPostRes {
  [key: string]: IPost;
}

export interface IResponse<T> {
  msg: string;
  data: T;
}
