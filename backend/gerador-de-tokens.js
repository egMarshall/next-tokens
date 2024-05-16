const jwt = require('jsonwebtoken');


const SECRET_KEY = '3ed8923d'


const nossoToken = jwt.sign(
  {
    name: 'Érico', 
  },
  SECRET_KEY,
  {
    subject: '1',
    expiresIn: '10s'
  }
)

const verificaToken = jwt.verify(nossoToken, SECRET_KEY); // { name: 'Érico', iat: 1635730137, exp: 1635730147, sub: '1' }

console.log(verificaToken);

const decodificaToken = jwt.decode(nossoToken);

console.log(decodificaToken);