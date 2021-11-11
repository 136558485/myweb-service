const timeUtil = require("../utils/timeUtil");
module.exports = {
    newArticleInfo: function (param) {
        return new Promise((resolve, reject) => {
            const db = require("./commonDB")();
            let sql = "insert into lau_article_info SET ?";
            let values = { id: new Date().getTime().toString(), createdate: new Date(), title: param.title, author: param.author, summary: param.summary, catalogid: param.catalogid }
            db.query(sql, values, (error, result) => {
                if (error) {
                    console.log("新增文章失败！原因：", error);
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
            let sql = "";
            let value = [];
            // 判断是否有分类id的查询条件
            if (param.catalogid) {
                sql = "select id, title, author, createdate, summary, catalogid, islock from lau_article_info where catalogid=? order by createdate desc limit ? offset ?";
                value = [param.catalogid, param.limit, param.offset];
            } else {
                sql = "select id, title, author, createdate, summary, catalogid, islock from lau_article_info order by createdate desc limit ? offset ?";
                value = [param.limit, param.offset];
            }
            db.query(sql, value, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                result.map(item => {
                    // 转换一下时间格式
                    item.createdate = timeUtil.simpleDateFormate(item.createdate.getTime())
                })
                resolve(result)
            })
            db.end();
        })
    },

    queryArticleById: function(param) {
        return new Promise((resolve, reject) => {
            const db = require("./commonDB")();
            let sql = "select * from lau_article_info where id = ?"
            let value = [param];
            db.query(sql, value, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                result.map(item => {
                    // 转换一下时间格式
                    item.createdate = timeUtil.simpleDateFormate(item.createdate.getTime())
                })
                resolve(result);
            });
            db.end();
        })
    },

    deleteArticle: function (param) {
        return new Promise((resolve, reject) => {
            const db = require("./commonDB")();
            let sql = "delete from lau_article_info where id = ?";
            let value = [param];
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

    updateArticleContent: function (param) {
        return new Promise((resolve, reject) => {
            const db = require("./commonDB")();
            let sql = "update lau_article_info set content = ? where id = ?";
            let value = [param.content, param.id];
            db.query(sql, value, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            })
            db.end();
        })
    },

    articleLock: function(param) {
        return new Promise((resolve, reject) => {
            const db = require("./commonDB")();
            let sql = "";
            let value = [];
            if(param.lockpwd) {
                sql = "update lau_article_info set islock=?, lockpwd=? where id=?";
                value = [param.lockstate, param.lockpwd, param.id];
            } else {
                sql = "update lau_article_info set islock = ? where id = ?";
                value = [param.lockstate, param.id];
            }
            
            db.query(sql, value, (error, result) => {
                if(error) {
                    reject(error);
                    return;
                }
                resolve(result);
            })
        })
    },
}