const articleDao = require("../dao/ArticleDao")
module.exports = {
    /**
     * 查询文章
     * @param {*} req 请求体
     * @param {*} res 返回体
     */
    queryArticles: function (req, res) {
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