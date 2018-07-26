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

  let rows: string = '';
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
  addListeners(week, rooms);

}

function addListeners(week, rooms){
  rooms.forEach(function(n, index){
    let td = document.querySelectorAll('.room' + index);
    for(let i: number = 0; i < td.length; i++){
      td[i].addEventListener("click", handleDayClick.bind(null, week[i], index, rooms));
    }
  });
}

function handleDayClick(beginDate, roomId, rooms){
  if (rooms[roomId].bookedDays.includes(beginDate)){
    //do somethin amazing later on
  } else {
    renderForm();
    let form: any = document.querySelector("#bookingForm");
    form.classList.remove("hidden");

    let dateInputFrom: any = document.getElementById("dateInputFrom");
    let dateInputTo: any = document.getElementById("dateInputTo");
    let confirmButton: any = document.getElementById("confirmButton");
    dateInputFrom.value = beginDate;
    dateInputTo.addEventListener("change", function(){
      handleDateChange(dateInputTo, dateInputTo.value, beginDate, rooms, roomId);
    });
  }

}

//end date beryot s eventa
function handleDateChange(dateInputTo, endDate, beginDate, rooms, roomId){
  var days = 1;
  var bYear: number = Number(beginDate.split(".")[2]);
  var bMonth: number = Number(beginDate.split(".")[1]);
  var bDay: number = Number(beginDate.split(".")[0]);
  var beginDateObject: Date = new Date(bYear, bMonth, bDay);
  var eYear: number = Number(endDate.split(".")[2]);
  var eMonth: number = Number(endDate.split(".")[1]);
  var eDay: number = Number(endDate.split(".")[0]);
  var endDateObject = new Date(eYear, eMonth, eDay);

  var bookedDaysArray = [];

  var daysCount: any = document.getElementById("daysCount"); 
  var price: any = document.getElementById("price");
  if(beginDateObject.getTime() > endDateObject.getTime()){
    alert("Нельзя поставить конечное число раньше начального!");
    endDateObject = beginDateObject;
    dateInputTo.value = beginDate;
  } else {
    while (beginDateObject.getTime() !== endDateObject.getTime()){
        let stringDate: string = beginDateObject.getDate() + "." + beginDateObject.getMonth() + "." + beginDateObject.getFullYear();
        bookedDaysArray.push(stringDate);
        beginDateObject.setDate(beginDateObject.getDate() + 1);
        days++;
      }
  }
  
  let stringDate: string = beginDateObject.getDate() + "." + beginDateObject.getMonth() + "." + beginDateObject.getFullYear();
  bookedDaysArray.push(stringDate);
  daysCount.textContent = days;
  price.textContent = days * rooms[roomId].cost;

  let bookButton: any = document.getElementById("bookButton");
  bookButton.addEventListener("click", function(e){
    e.preventDefault();
    handleBookClick(this, dateInputTo, bookedDaysArray, rooms, roomId);
  });
}

function handleBookClick(bookButton, dateInputTo, bookedDays, rooms, roomId){
  bookedDays.forEach(function(n){
    rooms[roomId].bookedDays.push(n);
  });
  renderBookTable(week, rooms);
  deleteForm();
}


function renderForm(){
  let form: any = document.getElementById("bookingForm");

  let formRow = 'Въезд:<input type="text" id="dateInputFrom">Выезд<input type="text" id="dateInputTo"><!-- <p>Полное имя <input type="text"></p> --><p>Кол-во дней: <span id="daysCount"></span></p><p>Общая цена: <span id="price"></span></p><button id="bookButton">Забронировать</button>';
  form.innerHTML = formRow;
}

function deleteForm(){
  let form: any = document.getElementById("bookingForm");
  form.innerHTML = "";
}

