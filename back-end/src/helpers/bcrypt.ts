import bcrypt from 'bcrypt';

export default async (pass:string) => {
  const rounds:number = 10;
  const hashedPass:string = await bcrypt.hash(pass, rounds);
  console.log('res', hashedPass);
  return hashedPass;
};
