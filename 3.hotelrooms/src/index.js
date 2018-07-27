//  @flow

const rooms: Array<Room> = [new Room('Люкс 1', 50), new Room('Люкс 2', 49.99), new Room('Обычная 1', 49.99), new Room('Обычная 2', 49.99), new Room('Обычная 3', 49.99)];

const week: Array<string> = [];
const today: Date = new Date();

for (let i: number = 0; i < 7; i += 1) {
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
  rooms.forEach(function (n: Room, index: number){
    rows += '<tr><td>' + n.name + '</td>';
    for(let i: number = 0; i < week.length; i += 1){

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

function addListeners(week, rooms:Array<Room>){
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
    renderForm("unbook");
    let form: any = document.querySelector("#bookingForm");
    let dateInputFrom: any = document.getElementById("dateInputFrom");
    let dateInputTo: any = document.getElementById("dateInputTo");
    dateInputFrom.value = beginDate;
      dateInputTo.addEventListener("change", function(){
      handleDateChange(dateInputTo, 
                        dateInputTo.value, 
                        beginDate, 
                        rooms, 
                        roomId, "delete");
    });
  } else {
    debugger;
    renderForm("book");
    let form: any = document.querySelector("#bookingForm");
    let dateInputFrom: any = document.getElementById("dateInputFrom");
    let dateInputTo: any = document.getElementById("dateInputTo");
    dateInputFrom.value = beginDate;
    dateInputTo.addEventListener("change", function(){
      handleDateChange(dateInputTo, dateInputTo.value, beginDate, rooms, roomId, "add");
    });
  }

}

//end date beryot s eventa
function handleDateChange(dateInputTo, endDate, beginDate, rooms, roomId, operationType){
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
  if(operationType === "add"){
    bookButton.addEventListener("click", function(e){
    e.preventDefault();
    handleBookClickAdd(this, dateInputTo, bookedDaysArray, rooms, roomId);
  });
  } else {
    bookButton.addEventListener("click", function(e){
    e.preventDefault();
    handleBookClickRemove(this, dateInputTo, bookedDaysArray, rooms, roomId);
  });
  }
  
}

function handleBookClickAdd(bookButton, dateInputTo, bookedDays, rooms, roomId){
  bookedDays.forEach(function(n){
    rooms[roomId].bookedDays.push(n);
  });
  renderBookTable(week, rooms);
  deleteForm();
}

function handleBookClickRemove(bookButton, dateInputTo, bookedDays, rooms, roomId){
  bookedDays.forEach(function(n){
    var index = rooms[roomId].bookedDays.indexOf(n);
    rooms[roomId].bookedDays = [...rooms[roomId].bookedDays.slice(0, index), ...rooms[roomId].bookedDays.slice(index+1)];
  });
  renderBookTable(week, rooms);
  deleteForm();
}


function renderForm(formType){
  let form: any = document.getElementById("bookingForm");
  if(formType === "unbook"){
    var formRow = 'Удалить бронь с:<input type="text" id="dateInputFrom">' + 
    'По<input type="text" id="dateInputTo"<p>Кол-во дней: <span id="daysCount"></span></p><p>Цена станет меньше на: <span id="price"></span></p><button id="bookButton">Забронировать</button>';
  } else {
    var formRow = 'Въезд:<input type="text" id="dateInputFrom">Выезд<input type="text" id="dateInputTo"><p>Кол-во дней: <span id="daysCount"></span></p><p>Общая цена: <span id="price"></span></p><button id="bookButton">Забронировать</button>';
  }
  console.log(form);
  form.innerHTML = formRow;
}

function deleteForm(){
  let form: any = document.getElementById("bookingForm");
  form.innerHTML = "";
}

