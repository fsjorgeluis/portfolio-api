import * as bcrypt from 'bcrypt';

/**
 * Hash password using bcrypt library
 * @param password String
 * @returns string type
 */
export const HashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

/**
 * Compare hashed password using bcrypt library
 * @param hash String
 * @param password String
 * @returns boolean type
 */
export const ComparePassword = async (
  hash: string,
  password: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
