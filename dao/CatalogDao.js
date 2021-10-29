module.exports = {
    queryCatalogList: function () {
        return new Promise((resolve, reject) => {
            let db = require("./commonDB")
            db().query("select * from lau_catalog_info", function (error, results) {
                //if (error) throw error
                // 这里注意，如果有错误要reject捕获而不是直接抛出，直接抛出会导致整个服务挂掉
                if (error) {
                    console.log("error:", error)
                    reject(error)
                }
                let dataString = JSON.stringify(results)
                let data = JSON.parse(dataString)
                resolve(data)
            })
            db().end();
        })
    },
    addCatalog: function (param) {
        return new Promise((resolve, reject) => {
            let db = require("./commonDB")
            let sql = "insert into lau_catalog_info SET ?"
            let values = { catalogid: new Date().getTime().toString(), catalogname: param.catalogname, catalogparentid: param.catalogparentid, createdate: new Date() }
            db().query(sql, values, function (error, result) {
                if (error) {
                    console.log("error:", error)
                    reject(error)
                    return;
                }
                console.log("result:", result)
                resolve(result)
            })
            db().end();
        })
    },
    deleteCatalog: function (param) {
        return new Promise((resolve, reject) => {
            let db = require("./commonDB")
            let sql = "delete from lau_catalog_info where catalogid in(?)"
            db().query(sql, [param], (error, result) => {
                if (error) {
                    console.log("删除操作失败！失败原因：", error)
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
}