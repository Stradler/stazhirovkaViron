//  @flow

const rooms: Array<Room> = [new Room('Люкс 1', 50), new Room('Люкс 2', 49.99), new Room('Обычная 1', 49.99), new Room('Обычная 2', 49.99), new Room('Обычная 3', 49.99)];

const week: Array<string> = [];
const today: Date = new Date();

for (let i = 0; i < 7; i += 1) {
  const tempDay: Date = new Date(today);
  tempDay.setDate(today.getDate() + i);
  week.push(tempDay.getDate() + '.' + tempDay.getMonth() + '.' + tempDay.getFullYear());
}

renderBookTable(week, rooms);
addListeners(week, rooms);




/*
 
  Functions and Classes

*/
function Room(name: string, cost: number) {
  this.name = name;
  this.cost = cost;
  this.bookedDays = [];
}

function renderBookTable(week, rooms) {
  let thead: string = '<thead><tr><td>Название комнаты</td>';
  for (let i: number = 0; i < week.length; i += 1) {
    thead += '<td>' + week[i].split( "." )[0] + '</td>';
  }
  thead += '</thead>';

  let rows = '';
  rooms.forEach(function (n, index){
    rows += '<tr><td>' + n.name + '</td>';
    for(let i = 0; i < week.length; i += 1){
      if(n.bookedDays.includes(week[i])){
        rows += '<td class="red room' + index + '"></td>';
      } else {
        rows += '<td class="green room' + index + '"></td>';
      }
    }

    rows += '</tr>';
  });
  const table: any = document.getElementById('bookingTable');

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
  console.log(beginDate);
  if (rooms[roomId].bookedDays.includes(beginDate)){
    //do somethin amazing later on
  } else {
    let form: any = document.querySelector("#bookingForm");
    form.classList.remove("hidden");

    let dateInputFrom: any = document.getElementById("dateInputFrom");
    let dateInputTo: any = document.getElementById("dateInputTo");
    let confirmButton: any = document.getElementById("confirmButton");
    dateInputFrom.value = beginDate;
    dateInputTo.addEventListener("change", function(e){
      handleDateChange(e, beginDate, rooms, roomId);
    });
  }

}

//end date beryot s eventa
function handleDateChange(e, beginDate, rooms, roomId){
  console.log(beginDate);
  var days = 1;
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

