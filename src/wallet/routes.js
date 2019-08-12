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
  }
];

module.exports = router;
