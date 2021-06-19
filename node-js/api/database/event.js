exports.get_event_by_time = function (req, res) {
    var start_year, start_month, start_day;
    var end_year, end_month, end_day;
    var sql = "SELECT * FROM Event natural join time_slot WHERE start_year BETWEEN " + start_year + " AND " + end_year + "";
}