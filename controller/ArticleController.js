const articleDao = require("../dao/ArticleDao");
const validateUtil = require("../utils/validateUtil")
// 锁定状态
const LOCK_STATE = 1; 
// 未锁定状态
const UNLOCK_STATE = 0;
module.exports = {
    /**
     * 查询文章
     * 
     * @param {*} req 请求体
     * @param {*} res 返回体
     */
    queryArticles: function (req, res) {
        // 查询参数校验
        if(validateQueryParam(req.body, res)) {
            return;
        }
        articleDao.queryArticles(req.body).then(values => {
            res.send(values);
        }).catch(error => {
            res.send(error);
        })
    },

    /**
     * 新增文章
     * 
     * @param {*} req 请求体
     * @param {*} res 返回体
     */
    newArticle: function (req, res) {
        // 新增参数校验
        if(validataNewParam(req.body, res)){
            return;
        }
        console.log("新增文章：", req.body);
        articleDao.newArticleInfo(req.body).then(values => {
            res.send(values);
        }).catch(error => {
            res.send(error)
        })
    },

    /**
     * 根据id获取文章详情
     * 
     * @param {*} req 
     * @param {*} res 
     */
    queryArticleDetailById: function(req, res) {
        articleDao.queryArticleById(req.query.id).then(result => {
            res.send(result);
        }).catch(error => {
            res.send(error);
        })
    },

    /**
     * 根据id删除文章
     * 
     * @param {*} req 
     * @param {*} res 
     */
    deleteArticle: function(req, res) {
        console.log("删除文章：", req.query.id)
        
        articleDao.queryArticleById(req.query.id).then(result => {
            // 判断文章是否存在
            if(result.length <= 0) {
                res.send(constructErrorRes("未找到对应的文章，情检查传入id"));
                return;
            }
            // 判断文章是否被锁定
            if(result[0].islock === 1) {
                res.send(constructErrorRes("该文章已被作者锁定，无法进行当前操作！"));
                return;
            }
            articleDao.deleteArticle(req.query.id).then(result => {
                res.send(result);
            }).catch(error => {
                res.status(500);
                res.send(error);
            })
        }).catch(error => {
            res.status(500);
            res.send(error);
        })
    },

    /**
     * 更新文章的内容
     * 
     * @param {*} req 
     * @param {*} res 
     */
    updateArticleContent: function(req, res) {
        articleDao.queryArticleById(req.body.id).then(result => {
            // 判断文章是否存在
            if(result.length <= 0) {
                res.send(constructErrorRes("未找到对应的文章，情检查传入id"));
                return;
            }
            // 判断文章是否被锁定
            if(result[0].islock === 1) {
                res.send(constructErrorRes("该文章已被作者锁定，无法进行当前操作！"));
                return;
            }
            articleDao.updateArticleContent(req.body).then(result => {
                res.send(result);
            }).catch(error => {
                res.status(500);
                res.send(error);
            })
        }).catch(error => {
            res.status(500);
            res.send(error);
        })
    },

    /**
     * 锁定文章
     * 
     * @param {*} req 
     * @param {*} res 
     */
    articleLock: function(req, res) {
        articleDao.queryArticleById(req.body.id).then((result) => {
            // 判断文章是否存在
            if(result.length <= 0) {
                res.send(constructErrorRes("未找到对应的文章，情检查传入id"));
                return;
            }
            // 判断文章是否已被锁定
            if(result[0].islock === LOCK_STATE) {
                res.send("已锁定");
                return;
            }

            let param = {
                "lockstate": LOCK_STATE,
                "id": req.body.id,
                "lockpwd": req.body.pwd
            }
            articleDao.articleLock(param).then(result => {
                res.send(result);
            }).catch(error => {
                res.status(500);
                res.send(error);
            });
        }).catch(error => {
            res.status(500);
            res.send(error);
        });
    },

    /**
     * 解锁文章
     * 
     * @param {*} req 
     * @param {*} res 
     */
    articleUnLock: function(req, res) {
        articleDao.queryArticleById(req.body.id).then((result) => {
            // 判断文章是否存在
            if(result.length <= 0) {
                res.send(constructErrorRes("未找到对应的文章，情检查传入id"));
                return;
            }
            // 判断文章是否已被锁定
            if(result[0].islock === UNLOCK_STATE) {
                res.send("已解锁");
                return;
            }

            // 校验密码
            if(result[0].lockpwd !== req.body.pwd) {
                res.send(constructErrorRes("密码不对，请检查"));
                return;
            }

            let param = {
                "lockstate": UNLOCK_STATE,
                "id": req.body.id
            }
            articleDao.articleLock(param).then(result => {
                res.send(result);
            }).catch(error => {
                res.status(500);
                res.send(error);
            });
        }).catch(error => {
            res.status(500);
            res.send(error);
        });
    }
}

/**
 * 新增文章参数校验
 * 
 * @param {*} param 
 * @param {*} reject 
 * @returns 
 */
 function validataNewParam(param, res) {
    console.log("param:", param)
    if (validateUtil.checkNull(param)) {
        res.send("参数不能为空")
        return true;
    }
    if (validateUtil.checkNull(param.title) || param.title.length > 64) {
        res.send("标题不能为空且长度不能超过64")
        return true;
    }
    if (validateUtil.checkNull(param.author) || param.author.length > 64) {
        res.send("作者不能为空且长度不能超过64")
        return true;
    }
    if (validateUtil.checkNull(param.catalogid) || param.catalogid.length > 64) {
        // 这里还要校验目录id是否存在，后面补上
        res.send("目录id不能为空且长度不能超过64")
        return true;
    }
    return false;
}

/**
 * 查询文章列表参数校验
 * 
 * @param {*} param 
 * @returns 
 */
function validateQueryParam(param, res) {
    if (validateUtil.checkNull(param)) {
        res.send("查询参数不能为空！");
        return true;
    }
    if (validateUtil.checkNull(param.limit) || param.limit > 1000) {
        res.send("limit为空或者limit超过限制");
        return true;
    }
    if (validateUtil.checkNull(param.offset)) {
        res.send("offset为空");
        return true;
    }
    return false;
}

function constructErrorRes(msg) {
    let resp = {};
    resp.code = 1;
    resp.errmsg = msg;
    return resp; 
}