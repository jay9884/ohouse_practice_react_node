const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://localhost:3003/',
          changeOrigin: true
      })
  )
};

// const proxy = require('http-proxy-middleware');

// module.exports = (app) => {
//   app.use(
//     proxy('/api', {
//       target: 'http://localhost:3003/'
//     })
//   );
// };