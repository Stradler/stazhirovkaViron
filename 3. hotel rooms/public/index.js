//  

const rooms = [new Room('Люкс 1', 50), new Room('Люкс 2', 49.99), new Room('Обычная 1', 49.99), new Room('Обычная 2', 49.99), new Room('Обычная 3', 49.99)];

const week = [];
const today = new Date();

for (let i = 0; i < 7; i += 1) {
  const tempDay = new Date(today);
  tempDay.setDate(today.getDate() + i);
  week.push(tempDay.getDate() + '.' + tempDay.getMonth() + '.' + tempDay.getFullYear());
}

renderBookTable(week, rooms);
addListeners(week, rooms);




/*
 
  Functions and Classes

*/
function Room(name, cost) {
  this.name = name;
  this.cost = cost;
  this.bookedDays = [];
}

function renderBookTable(week, rooms) {
  let thead = '<thead><tr><td>Название комнаты</td>';
  for (let i = 0; i < week.length; i += 1) {
    thead += '<td>' + week[i].split( "." )[0] + '</td>';
  }
  thead += '</thead>';

  let rows = '';
  rooms.forEach(function (n, i){
    rows += '<tr><td>' + n.name + '</td>';
    for(let i = 0; i < week.length; i += 1){
      if(n.bookedDays.includes(week[i])){
        rows += '<td class="red room' + i + '"></td>';
      } else {
        rows += '<td class="green room' + i + '"></td>';
      }
    }

    rows += '</tr>';
  });
  const table = document.getElementById('bookingTable');

  table.innerHTML = thead + rows;

}

function addListeners(week, rooms){
  rooms.forEach(function(n, index){
    let td = document.querySelectorAll('.room' + index);
    for(let i = 0; i < td.length; i++){
      td[i].addEventListener("click", handleDayClick.bind(null, week[i], index, rooms));
    }
  });
}

function handleDayClick(beginDate, roomId, rooms){
  if (rooms[roomId].bookedDays.includes(beginDate)){
    //do somethin amazing later on
  } else {
    console.log(beginDate);
    let form = document.querySelector("#bookingForm");
    form.classList.remove("hidden");

    let dateInputFrom = document.getElementById("dateInputFrom");
    let dateInputTo = document.getElementById("dateInputTo");


    dateInputFrom.value = beginDate;
    dateInputTo.addEventListener("change", handleDateChange.bind(null, beginDate, dateInputTo.value, rooms, roomId));
  }

}

function handleDateChange(beginDate,endDate, rooms, roomId){
  var days = 1;
  console.log(endDate);
  var bYear = beginDate.split(".")[2];
  var bMonth = beginDate.split(".")[1];
  var bDay = beginDate.split(".")[0];
  var beginDateObject = new Date(bYear, bMonth, bDay);

  var eYear = endDate.split(".")[2];
  var eMonth = endDate.split(".")[1];
  var eDay = endDate.split(".")[0];
  var endDateObject = new Date(eYear, eMonth, eDay);

  var bookedDaysArray = [];

  var daysCount = document.getElementById("daysCount"); 
  var price = document.getElementById("price");
  // while(beginDateObject.getTime() !== endDateObject.getTime()){
  //   var stringDate = beginDateObject.getDate() + beginDateObject.getMonth() + beginDateObject.getFullYear();
  //   bookedDaysArray.push(stringDate);
  //   beginDateObject.setDate(beginDateObject.getDate() + 1);
  //   days++;
  // }

  daysCount.textContent = days;
  price.textContent = days * rooms[roomId].cost;

  let bookButton = document.getElementById("bookButton");
  bookButton.addEventListener("click", handleBookClick.bind(null));
}

function handleBookClick(beginDate, endDate, rooms, roomId){
  
}

