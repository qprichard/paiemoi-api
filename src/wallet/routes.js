const Wallet = require('./models');
const WalletController = require('./controllers');
const { authTokenMiddleware } = require('../authentication/middlewares');

const walletController = new WalletController(Wallet);

const router = [
  {
    method: 'POST',
    url: '/api/wallets',
    preHandler: [authTokenMiddleware],
    handler: (...args) => walletController.add(...args)
  },
  {
    method: 'GET',
    url: '/api/wallets',
    preHandler: [authTokenMiddleware],
    handler: (...args) => walletController.all(...args)
  },
  {
    method: 'GET',
    url: '/api/wallets/:id',
    preHandler: [authTokenMiddleware],
    handler: (...args) => walletController.getById(...args)
  }
];

module.exports = router;
