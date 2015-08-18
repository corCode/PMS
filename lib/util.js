parseDate = function (dateStr) {

    console.log("inside parseDate...");
    console.log(dateStr);
    var dateParts = dateStr.split("-");
    console.log(dateParts);

    if (dateParts[0] > 2000)
        // yyyy-mm-dd
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    else
        // dd-mm-yyyy
        return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

}

isValidFutureDate = function (dateStr) {

    var dashDate = dateStr.replace("/", "-");

    var dateParts = dateStr.split("-");
    var today = new Date();

    console.log("inside isValidFutureDate...");
    /****
    console.log(dateParts);
    console.log(dateParts.length);
    console.log(today);
    console.log(parseDate(dashDate));
    console.log(parseDate(dashDate) > today);
    ***/
    if (dateParts.length === 3)
        return parseDate(dashDate) > today;
    else
        return false;

}

formateDates = function (dateObj) {

    //formate date to YYYY-MM-DD

    console.log("inside formateDates...");
    console.log(dateObj);

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