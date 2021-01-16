const app = require('express')();
const routes = require('./routes');
const { port } = require('./secrets.js');

app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})