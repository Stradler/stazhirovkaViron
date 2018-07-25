var Worker = (function(){
    var instance;
    function init(fullName){
        var firstName = fullName.split(" ")[0];
        var lastName = fullName.split(" ")[1];
        var payment = 0;
        return {
            getName: function(){
                return firstName + " " + lastName;
            },
            setName: function(name){
                firstName = name.split(" ")[0];
                lastName = name.split(" ")[1];
            },
            getPayment: function(){
                return payment;
            },
            setPayment: function(newPayment){
                payment = newPayment;
            }
        }
    };

    return {
        create: function(fullName){
            
            instance = init(fullName);

            return instance;
        }
    }
})();

var workers = [];
workers.push(Worker.create("Eugene Trakhanov"));
workers.push(Worker.create("Eugene Somboler"));


function getInfo(){
    var tbody = document.querySelector("tbody");
    var rows = "";

    workers.forEach(function(worker){
        rows = rows + "<tr><td>" + worker.getName() + "</td>" + 
                "<td>" + worker.getPayment() + "</td></tr>"; 
    });

    tbody.innerHTML = rows;
}


var button = document.querySelector("button");

button.addEventListener("click", getInfo);