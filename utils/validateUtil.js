module.exports = {
    checkNull(str){
        if(str == null || str === '' || !/[^\s]/.test(str)){
            return true;
        }
        return false;
    }
}

