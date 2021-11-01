const commomConfig = require("../resource/config/common.config");
module.exports = {
    /**
     * 富文本上传图片操作
     * 
     * @param {*} req 
     * @param {*} res 
     */
    uploadImg: function (req, res) {
        const fs = require('fs');
        const path = require('path');
        const fileName = req.files[0].path + path.parse(req.files[0].originalname).ext;
        const fileUrl = "http://" + commomConfig.getUploadFileIp + "/" + fileName.substr(fileName.lastIndexOf("/") + 1);
        console.log("upload file, fileName:", fileName);
        fs.rename(req.files[0].path, fileName, error => {
            if (error) {
                res.send(err)
            } else {
                res.send(fileUrl)
            }
        });
    }
}