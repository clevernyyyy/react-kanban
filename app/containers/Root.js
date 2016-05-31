if(process.env.NODE_ENV === 'production') {
  // Run without redux sidebar
  module.exports = require('./Root.prod.js');
}
else {
  // Run with redux sidebar
  module.exports = require('./Root.dev.js');
}
