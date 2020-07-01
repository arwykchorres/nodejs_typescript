import express, { Request, Response } from 'express';

const router = express.Router();

router.route('/home').get((req: Request, res: Response) => {
  res.status(200).json({ result: 'response' });
});

export default router;
