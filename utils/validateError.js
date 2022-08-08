module.exports.validateError=async function(params=null){
    var paramsStr=params.toString();
    var errArr=paramsStr.split(":");
    var res=errArr.slice(-1).pop();
    console.log(res);
    return res;
}