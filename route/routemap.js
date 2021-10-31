const catalogController = require("../controller/CatalogController");
const articleController = require("../controller/ArticleController")
const fileController = require("../controller/FileController")
module.exports = function(app){
    app.get('/', (res) => {
        res.send('welcome to the nodejs!');
    });

    // 获取分类
    app.get('/getCatalogInfoList', (req, res) => {
        const catalogController = require("../controller/CatalogController");
        catalogController.queryCatalogList(res);
    });

    // 新增分类
    app.post('/addCatalog', (req, res) => {
        catalogController.addCatalog(req, res);
    });

    // 删除分类
    app.post('/deleteCatalog', (req, res) => {
        catalogController.deleteCatalogById(req, res);
    });

    // 查询文章
    app.post('/queryArticles', (req, res) => {
        articleController.queryArticles(req, res);
    });

    // 新增文章
    app.post('/newArticle', (req, res) => {
        articleController.newArticle(req, res);
    });

    // 删除文章
    app.delete('/deleteArticle', (req, res) => {
        articleController.deleteArticle(req, res);
    });

    // 更新文章内容
    app.post('/updateArticleContent', (req, res) => {
        articleController.updateArticleContent(req, res);
    });

    // 根据id查询文章
    app.get('/getArticleDetail', (req, res) => {
        articleController.queryArticleDetailById(req, res);
    })

    // 上传图片
    app.post('/uploadImg', (req, res) => {
        fileController.uploadImg(req, res);
    })
}