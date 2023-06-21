export type Post = {
  pid?: string,
  uid?: string,
  id?: string,
  title: string,
  release: string,
  category: string,
  article: string,
  createdAt?: Timestamp | undefined,
  updatedAt?: Timestamp | undefined,
}

type Timestamp = {
  nanoseconds: number;
  seconds: number;
};