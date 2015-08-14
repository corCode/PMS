parseDate = function (dateStr) {

    var dateParts = dateStr.split("-");

    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

}

formateDates = function (dateObj) {

    //formate date to YYYY-MM-DD

    var month = (dateObj.getMonth() + 1).toString();
    var day = dateObj.getDate().toString();

    var monthStr = ("0" + month).substr(month.length - 1, 2);
    var dayStr = ("0" + day).substr(day.length - 1, 2);

    return dateObj.getFullYear() + "-" + monthStr + "-" + dayStr;
}

formateDateForDisplay = function (dateObj) {

    return dateObj.toDateString();
}

addDaystoDate = function (dateObj, daysToAdd) {

    return dateObj.setDate(dateObj.getDate() + daysToAdd);

}