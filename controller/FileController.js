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
        const fileUrl = "http://" + req.headers.host + "/" + fileName.substr(fileName.indexOf("\\") + 1);
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