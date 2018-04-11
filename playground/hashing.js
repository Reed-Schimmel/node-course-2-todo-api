const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {
  id: 10
};

const token = jwt.sign(data, '123abc');
console.log(token);

const decoded = jwt.verify(token, '123abc');
console.log(decoded);

// const message = 'I am user number 3';

// const hash = SHA256(message).toString();
// console.log(message);
// console.log(hash);

// const data = {
//   id: 4,
// };
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'someSecret').toString(),
// };

// const resultHast = SHA256(JSON.stringify(token.data) + 'someSecret').toString();

// if (resultHast === token.hash) {
//   console.log('Data was not changed')
// } else {
//   console.log('Data was change, do not trust')
// }