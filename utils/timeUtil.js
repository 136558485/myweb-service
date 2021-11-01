module.exports = {
    /**
     * 转换时间格式
     * 
     * @param {*} datetime 时间戳毫秒值 
     */
    simpleDateFormate: function(datetime) {
        let newDate = new Date(datetime);
        let y = newDate.getFullYear();
        let m = newDate.getMonth() + 1;
        let d = newDate.getDate();
        let h = newDate.getHours();
        let mm = newDate.getMinutes();
        let s = newDate.getSeconds();
        return y + "-" + this.repair0(m) + "-" + this.repair0(d) + " " + this.repair0(h) + ":" + this.repair0(mm) + ":" + this.repair0(s);
    },
    repair0: function(m) {
        return m<10 ? "0"+m : m;
    }
}