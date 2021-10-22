const server = require('express');
const app = server();
// 下面两项如果不配置会导致request读不到请求参数
app.use(server.json());
app.use(server.urlencoded({extended: false}))

require('./route/routemap.js')(app);

app.listen(3030);