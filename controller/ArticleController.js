const articleDao = require("../dao/ArticleDao");
const validateUtil = require("../utils/validateUtil")
module.exports = {
    /**
     * 查询文章
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
     * 根据id删除文章
     * @param {*} req 
     * @param {*} res 
     */
    deleteArticle: function(req, res) {
        console.log("删除文章：", req.query.id)
        articleDao.deleteArticle(req.query.id).then(result => {
            res.send(result);
        }).catch(error => {
            res.send(error)
        })
    },

    /**
     * 更新文章的内容
     * @param {*} req 
     * @param {*} res 
     */
    updateArticleContent: function(req, res) {
        articleDao.updateArticleContent(req.body).then(result => {
            res.send(result);
        }).catch(error => {
            res.send(error);
        })
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