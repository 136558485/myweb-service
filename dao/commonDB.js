let databaseConfig = require("../resource/config/database.config");
let mysql = require("mysql");
function server(){
    let conn = mysql.createConnection({
        host: databaseConfig.host,
        user: databaseConfig.user,
        password: databaseConfig.password,
        database: databaseConfig.database
    });
    conn.connect();
    return conn;
}
module.exports = server
