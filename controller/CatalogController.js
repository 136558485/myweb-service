module.exports = {
    /**
     * 查询目录列表
     * 
     * @param  res response
     */
    queryCatalogList: function (res) {
        console.log("开始查询目录列表！");
        let catalogDao = require("../dao/CatalogDao");
        catalogDao.queryCatalogList().then(value => {
            let result = value.filter(item => {
                return item.catalogparentid === '' || item.catalogparentid === null
            })
            result.map(item => {
                getThechildNode(item, value);
            })
            res.send(result);
        }).catch(error => {
            res.send(error)
        });
    },
    /**
     * 新增目录列表
     * 
     * @param {*} req 
     * @param {*} res 
     */
    addCatalog: function (req, res) {
        console.log("插入新目录...");
        console.log("请求参数：", req.body);
        let catalogDao = require("../dao/CatalogDao");
        catalogDao.addCatalog(req.body).then(value => {
            res.send(value);
        }).catch(error => {
            res.send(error)
        })
    },
    /**
     * 删除目录节点
     * 
     * @param {*} req 
     * @param {*} res 
     */
    deleteCatalogById: function (req, res) {
        console.log("删除节点:", req.body);
        // 1.先获取所有节点信息
        let catalogDao = require("../dao/CatalogDao");
        catalogDao.queryCatalogList().then(values => {
            let delCatalogId = "";
            if (req.body) {
                delCatalogId = req.body.id;
            }
            let catalogs = values.filter(item => {
                return item.catalogid === delCatalogId
            })
            if (catalogs.length <= 0) {
                res.send("未在数据库中找到对应的节点！删除失败！")
                return;
            }
            // 2.获取该节点下所有的子节点id
            let catalogId = catalogs[0].catalogid;
            let resultList = [catalogId]
            resultList = getChildNodes(catalogId, values, resultList)
            // 3.删除这些节点数据
            console.log("deleteList:", resultList);
            catalogDao.deleteCatalog(resultList).then(result => {
                res.send(result)
            }).catch(error => {
                res.send(error)
            })
        }).catch(error => {
            res.send(error)
        });
        
    }
}
/**
 * 递归获取根节点以及其下子节点数据，并构造成树类型的数据结构
 * 
 * @param {*} rootNode 根节点
 * @param {*} nodeList 所有节点列表
 */
function getThechildNode(rootNode, nodeList) {
    let list = nodeList.filter(item => {
        if (item.catalogparentid === rootNode.catalogid) {
            item.catalogparentname = rootNode.catalogname;
            return true
        }
        return false;
    })
    rootNode.child = list;
    if (list.length > 0) {
        list.map(item => {
            getThechildNode(item, nodeList);
        })
    }
}

/**
 * 递归获取节点以及其下所有的子节点id
 * 
 * @param {*} nodeid 节点id
 * @param {*} nodelist 节点列表
 * @param {*} resultList 存放结果
 */
function getChildNodes(nodeid, nodelist, resultList) {
    let childNodes = nodelist.filter(item => {
        return item.catalogparentid === nodeid;
    })
    childNodes.map(item => {
        resultList.push(item.catalogid)
        resultList = getChildNodes(item.catalogid, nodelist, resultList)
    })
    return resultList;
}
