import { verifyIdToken } from 'lib/fireadmin';
import { NextApiRequest, NextApiResponse } from 'next';

const tokenHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if(token){
      const decodedToken = await verifyIdToken(token);
      res.status(200).json({ message: 'トークンが有効です' });
    } else {
      res.status(400).json({ error: 'トークンが提供されていません' });
    }
  } catch (error) {
    console.error('トークン検証エラー:', error);
    res.status(401).json({ error: 'トークンが無効です' });
  }
};

export default tokenHandler;
