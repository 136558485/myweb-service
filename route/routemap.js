const catalogController = require("../controller/CatalogController");
const articleController = require("../controller/ArticleController")
module.exports = function(app){
    app.get('/', (res) => {
        res.send('welcome to the nodejs!');
    });

    app.get('/getCatalogInfoList', (req, res) => {
        const catalogController = require("../controller/CatalogController");
        catalogController.queryCatalogList(res);
    });

    app.post('/addCatalog', (req, res) => {
        catalogController.addCatalog(req, res);
    });

    app.post('/deleteCatalog', (req, res) => {
        catalogController.deleteCatalogById(req, res);
    });

    app.post('/queryArticles', (req, res) => {
        articleController.queryArticles(req, res);
    });

    app.post('/newArticle', (req, res) => {
        articleController.newArticle(req, res);
    });

    app.delete('/deleteArticle', (req, res) => {
        articleController.deleteArticle(req, res);
    });

    app.post('/updateArticleContent', (req, res) => {
        articleController.updateArticleContent(req, res);
    });
}