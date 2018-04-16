const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

let hashedPassword = '$2a$10$/9t8cKmjQQYTQdVAfrU/cOyYJJenQsjjDbcRAdjbHoyZ9YOhmASgi';

bcrypt.compare(password, hashedPassword, (err, res) => console.log(res));

// const data = {
//   id: 10
// };

// const token = jwt.sign(data, '123abc');
// console.log(token);

// const decoded = jwt.verify(token, '123abc');
// console.log(decoded);

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