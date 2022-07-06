const bcrypt = require('bcrypt');

const saltRounds = 10; //global scope

export const cipherService = {
  generatePassword: generatePasswordHash,
  checkPassword,
};

export async function generatePasswordHash(plaintextPassword: string) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(plaintextPassword, salt);
}

export async function checkPassword(
  allegedPlaintextPassword: string,
  dbPasswordHash: string
) {
  return await bcrypt.compare(allegedPlaintextPassword, dbPasswordHash);
}
