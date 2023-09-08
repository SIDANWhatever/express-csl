import { Request, Response } from 'express';
import { buildExampleTx } from './cslTx/buildExampleTx';

export const buildTx = (_req: Request, res: Response) => {
  const signedTx = buildExampleTx()
  res.json({ signedTx });
}
