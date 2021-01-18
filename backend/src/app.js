const app = require('express')();
const routes = require('./routes');
const adminRoutes = require('./adminRoutes');
const { port } = require('./secrets.js');

app.use('/api/', routes);
app.use('/admin/api/', adminRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})