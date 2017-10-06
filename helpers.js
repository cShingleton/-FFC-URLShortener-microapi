const alphabet = "23456789bcdfghjkmnpqrstvwxyzABCDFGHJKLMNPQRSTVWXYZ";
const base = alphabet.length;

const encode = (num) => {
  let encoded = '';
  while (num > 0) {
    encoded = alphabet.charAt(num % base) + encoded;
    num = Math.floor(num / base);
  }
  return encoded;
};

const decode = (str) => {
  let decoded = 0;
  for (let i = 0; i < str.length; i++) {
    decoded = decoded * base + alphabet.indexOf(str.charAt(i));
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;