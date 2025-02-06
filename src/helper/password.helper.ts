import * as bcrypt from 'bcrypt';

export async function hashPasswordFunc(password: string): Promise<string> {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const isMatch: boolean = await bcrypt.compare(password, hash);
  return isMatch;
}
