export type User = {
  id?: string,
  admin?: boolean | null;
  age?: number;
  postId?: number,
  name: string,
  address: string,
  email: string,
  gender: string,
  hobby: string[],
  selectValue: string,
  comment: string,
}
