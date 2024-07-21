function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records from an array of arrays
  function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));
  }
  
  // Function to create a timeIn event for an employee
  function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  // Function to create a timeOut event for an employee
  function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  // Function to calculate the hours worked on a specific date
  function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
  }
  
  // Function to calculate total wages for an employee
  function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(event => event.date);
    return eligibleDates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
  }
  
  // Function to calculate total payroll for multiple employees
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }