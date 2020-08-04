const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const hashSize = 32,
  saltSize = 16,
  hashAlgorithm = 'sha512',
  iterations = 1000;

const generatePasswordWithHashSalt = (password) => {
  const salt = crypto.randomBytes(saltSize);
  const hash = crypto.pbkdf2Sync(password, salt, iterations, hashSize, hashAlgorithm);
  return Buffer.concat([hash, salt]).toString('hex');
};

const checkPassword = (userPasswordHash, enteredPassword) => {
  const expectedHashPassword = userPasswordHash.substring(0, hashSize * 2);
  const salt = Buffer.from(userPasswordHash.substring(hashSize * 2), 'hex');
  const binaryHash = crypto.pbkdf2Sync(enteredPassword, salt, iterations, hashSize, hashAlgorithm);
  const resultHashPassword = binaryHash.toString('hex');
  return expectedHashPassword === resultHashPassword;
};

exports.generateJwtToken = (data) => jwt.sign(data, jwtConfig.secret);
exports.verifyJwtToken = (token, callback) => jwt.verify(token, jwtConfig.secret, callback);

exports.generatePasswordWithHashSalt = generatePasswordWithHashSalt;
exports.checkPassword = checkPassword;
