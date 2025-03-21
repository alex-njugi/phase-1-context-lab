const createEmployeeRecord = function ([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
};

const createEmployeeRecords = function (employeeData) {
    return employeeData.map(createEmployeeRecord);
};

const createTimeInEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour) });
    return this;
};

const createTimeOutEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour) });
    return this;
};

const hoursWorkedOnDate = function (date) {
    let inEvent = this.timeInEvents.find(e => e.date === date);
    let outEvent = this.timeOutEvents.find(e => e.date === date);
    return (outEvent.hour - inEvent.hour) / 100;
};

const wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(e => e.date);
    const payable = eligibleDates.reduce((memo, d) => memo + wagesEarnedOnDate.call(this, d), 0);
    return payable;
};

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(emp => emp.firstName === firstName);
};

const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce((total, emp) => total + allWagesFor.call(emp), 0);
};
