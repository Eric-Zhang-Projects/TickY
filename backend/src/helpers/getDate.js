exports.todaysDate = function() {
    let date = new Date();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let today = date.getFullYear() + "-" + month + "-" + day;
    return today;
}

exports.daysFromNow = function(days){
    let date = new Date();
    date.setDate(date.getDate() + days);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let result = date.getFullYear() + "-" + month + "-" + day;
    return result;
}

exports.monthsFromNow = function(months){
    let date = new Date();
    let month = ("0" + (date.getMonth() + 1 + months)%12).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let result = date.getFullYear() + "-" + month + "-" + day;
    return result;
}

