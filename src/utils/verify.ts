import bcrypt from 'bcrypt';
import { saltRound } from '../config/verifyConfig';

export const makeHash = async (idx: number, pincode: number): Promise<string> => {
  const newPincode: string = `${idx}-${pincode}`;
  const hash: string = await bcrypt.hashSync(newPincode, saltRound);
  return hash;
};

export const verifyHash = async (idx: number, pincode: number, hash: string) => {
  const verifyPincode: string = `${idx}-${pincode}`;
  const verified: boolean = await bcrypt.compareSync(verifyPincode, hash);
  return verified;
};
