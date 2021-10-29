const config = require("./resource/config/common.config")
const server = require('express');
const multer = require('multer')
const app = server();
// 下面两项如果不配置会导致request读不到请求参数
app.use(server.json());
app.use(server.urlencoded({extended: false}))
// 配置multer用于文件上传
app.use(multer({
    dest: config.uploadFilePath
}).any());

app.use(server.static(config.uploadFilePath));

require('./route/routemap.js')(app);

app.listen(config.outport);