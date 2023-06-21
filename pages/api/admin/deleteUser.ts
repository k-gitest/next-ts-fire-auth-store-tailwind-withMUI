import {adminAuth} from 'lib/fireadmin'
import { NextApiRequest, NextApiResponse } from 'next';

type Query = {
  id: string;
  uid?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id, uid} = req.query as Query;
  console.log(`id: ${id}`, `uid: ${uid}`)

  if(req.method === 'DELETE'){
    if (!uid) {
      res.status(400).end();
      return;
    }
    try {
      await adminAuth.deleteUser(uid);
      console.log('アカウントを削除しました');
    } catch (error) {
      console.error('アカウント削除エラー:', error);
    }
  }
  
}
  
