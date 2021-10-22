
const validateUtil = require("../utils/validateUtil")
module.exports = {
    newArticleInfo: function (param) {
        return new Promise((resolve, reject) => {
            const db = require("./commonDB")();
            // 参数校验
            if (validataNewParam(param, reject)) {
                reject("校验失败！")
                return;
            }
            let sql = "insert into lau_article_info SET ?";
            let values = { id: new Date().getTime().toString(), createdate: new Date(), title: param.title, author: param.author, summary: param.summary, catalogid: param.catalogid }
            db.query(sql, values, (error, result) => {
                if (error) {
                    console.log("操作失败！");
                    reject(error);
                    return;
                }
                resolve(result);
            })
            db.end();
        })
    },

    queryArticles: function (param) {
        return new Promise((resolve, reject) => {
            const db = require("./commonDB")();
            if (validateQueryParam(param)) {
                reject("校验失败！")
                return;
            }
            let sql = "select  * from lau_article_info where catalogid=? order by createdate limit ? offset ?";
            let value = [param.catalogid, param.limit, param.offset];
            db.query(sql, value, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result)
            })
            db.end();
        })
    },

    deleteArticle: function(param) {
        return new Promise((resolve, reject) => {
            const db = require("./commonDB")();
            let sql = "delete from lau_article_info where id = ?";
            let value = [param];
            db.query(sql, value, (error, result) => {
                if(error){
                    reject(error);
                    return;
                }
                resolve(result)
            })
            db.end();
        })
    },

    updateArticleContent: function(param) {
        return new Promise((resolve, reject) => {
            const db = require("./commonDB")();
            let sql = "update lau_article_info set content = ? where id = ?";
            let value = [param.content, param.id];
            db.query(sql, value, (error, result) => {
                if(error) {
                    reject(error);
                    return ;
                }
                resolve(result);
            })
            db.end();
        })
    }

}

function validataNewParam(param, reject) {
    console.log("param:", param)
    if (validateUtil.checkNull(param)) {
        reject("参数不能为空")
        return true;
    }
    if (validateUtil.checkNull(param.title) || param.title.length > 64) {
        reject("标题不能为空且长度不能超过64")
        return true;
    }
    if (validateUtil.checkNull(param.author) || param.author.length > 64) {
        reject("作者不能为空且长度不能超过64")
        return true;
    }
    if (validateUtil.checkNull(param.catalogid) || param.catalogid.length > 64) {
        // 这里还要校验目录id是否存在，后面补上
        reject("目录id不能为空且长度不能超过64")
        return true;
    }
    return false;
}

function validateQueryParam(param) {
    if (validateUtil.checkNull(param)) {
        return true;
    }
    if (validateUtil.checkNull(param.limit) || param.limit > 1000) {
        return true;
    }
    if (validateUtil.checkNull(param.offset)) {
        return true;
    }

    if (validateUtil.checkNull(param.catalogid)) {
        return true;
    }
    return false;
}