//  

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
        rows += '<td class="red"></td>';
      } else {
        rows += '<td class="green"></td>';
      }
    }

    rows += '</tr>';
  });
  const table = document.getElementById('bookingTable');

  table.innerHTML = thead + rows;

}

const rooms = [new Room('Люкс 1', 50), new Room('Люкс 2', 49.99), new Room('Обычная 1', 49.99), new Room('Обычная 2', 49.99), new Room('Обычная 3', 49.99)];

const week = [];
const today = new Date();

for (let i = 0; i < 7; i += 1) {
  const tempDay = new Date(today);
  tempDay.setDate(today.getDate() + i);
  week.push(tempDay.getDate() + '.' + tempDay.getMonth() + '.' + tempDay.getFullYear());
}

renderBookTable(week, rooms);
