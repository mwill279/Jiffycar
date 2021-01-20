/*
  Holds a car's porerties to later be saved in the session
*/
var car_temp = {
  carID: 0,
  make: "",
  model: "",
  year: 0,
  num_seats: 0,
  price: 0,
  availability: "",
  rent_from: "",
  rent_to: ""
};

var display = "";
var car_info = "";
var edit_form = "";
var info = sessionStorage.getItem("car" + document.location.search.split('?car=').splice(1, 2));
var row = "";

//Grabs the date and time right now
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();

//formats the month and day
if(month < 10){
  month = "0"+ month;
}
if(day < 10){
  day = "0" + day;
}

//format the date to be (yyyy-MM-dd)
var today_date = new Date(year, month, day);

//Initialize the Id with the first car
if (sessionStorage.getItem("count") == null) {
  sessionStorage.setItem("count", "*");
}

//editCar.html
if (document.getElementById("form2") != null) {
  row = info.substring(info.indexOf("make: "), info.indexOf("<br>", info.indexOf("make: ")));

  edit_form += "<label>Make: </label>"
  edit_form += "<input type='text' name='carMake' value=" + row.split(" ")[1] + "><br>"


  row = info.substring(info.indexOf("model: "), info.indexOf("<br>", info.indexOf("model: ")));

  edit_form += "<label>Model: </label>"
  edit_form += "<input type='text' name='carModel' value=" + row.split(" ")[1] + "><br>"

  row = info.substring(info.indexOf("year: "), info.indexOf("<br>", info.indexOf("year: ")));

  edit_form += "<label>Year: </label>"
  edit_form += "<input type='number' name='carYear' value=" + row.split(" ")[1] + "><br>"



  row = info.substring(info.indexOf("num_seats: "), info.indexOf("<br>", info.indexOf("num_seats: ")));

  edit_form += "<label># of seats: </label>"
  edit_form += "<input type='number' name='carSeat' value=" + row.split(" ")[1] + "><br>"

  row = info.substring(info.indexOf("price: "), info.indexOf("<br>", info.indexOf("price: ")));

  edit_form += "<label>Price: </label>"
  edit_form += "<input type='number' name='carPrice' step= '0.01' value=" + row.split(" $")[1] + "><br>"

  document.getElementById("form2").innerHTML += edit_form;
}

//index.html
if (document.getElementById("display") != null) {
  for (var i = 1; i < sessionStorage.getItem("count").length; i++) {
    document.getElementById("display").innerHTML += sessionStorage.getItem(i);

  }
}

//if the button is click a new set of feilds with the dates
function date_on(){
  document.getElementById("avail").innerHTML = "<label>Rented From: </label>" +
  "<input type='date' name='carFrom' value=" + year + '-' + month + '-' + day + " min=" + year + '-' + month + '-' + day + "><br>" +
  "<label>Rented To: </label>" +
  "<input type='date' name='carTo' value=" + year + '-' + month + '-' + day + " min=" + year + '-' + month + '-' + day + "><br>";
}

function date_off(){
  document.getElementById("avail").innerHTML = "";
}

//if the button is click a new set of feilds with the dates
function addingCar() {
if(document.getElementsByName("carFrom")[0] != undefined){
  var d1 = new Date(document.getElementsByName("carFrom")[0].value);
  var d2 = new Date(document.getElementsByName("carTo")[0].value);
  car_temp.rent_from = d1.toLocaleDateString();
  car_temp.rent_to = d2.toLocaleDateString();
  if(today < d1){
    car_temp.availability = "Available";
  }
  else{
    car_temp.availability = "Rented"
  }

}
else{
  var d1 = new Date(0000,00,00);
  var d2 = new Date(0000,00,00);
  car_temp.rent_from = "";
  car_temp.rent_to = "";
  car_temp.availability = "Available";
}


  if (d2 < d1) {
    document.getElementById("error").innerHTML = "ERROR " + car_temp.rent_from + " is after " + car_temp.rent_to;
  }
  else {
    car_temp.carID = sessionStorage.getItem("count").length;
    sessionStorage.setItem("count", (sessionStorage.getItem("count") + "*"));
    car_temp.make = document.getElementsByName("carMake")[0].value;
    car_temp.model = document.getElementsByName("carModel")[0].value;
    car_temp.year = document.getElementsByName("carYear")[0].value;
    car_temp.num_seats = document.getElementsByName("carSeat")[0].value;
    car_temp.price = "$" + document.getElementsByName("carPrice")[0].value;


    for (var prop in car_temp) {
      if(prop.localeCompare("availability") == 0){
        if(car_temp.availability.localeCompare("Rented") == 0){
          car_info += "<div class='nonavail'>" + prop + ": " + car_temp[prop] + "</div>";
        }
        else{
          car_info += "<div class='avail'>" + prop + ": " + car_temp[prop] + "</div>";
        }
      }
      else{
        car_info += prop + ": " + car_temp[prop] + "<br>";
      }
    }
    car_info += "<br><br>";
    sessionStorage.setItem(("car" + car_temp.carID), car_info);

    display += "<input type='radio' name=car value=" + car_temp.carID + ">" + car_info;
    sessionStorage.setItem(car_temp.carID, display);
    document.getElementById("form1").submit();

  }

}


function editCar() {
  if(document.getElementsByName("carFrom")[0] != undefined){
    var d1 = new Date(document.getElementsByName("carFrom")[0].value);
    var d2 = new Date(document.getElementsByName("carTo")[0].value);
    car_temp.rent_from = d1.toLocaleDateString();
    car_temp.rent_to = d2.toLocaleDateString();
    if(today < d1){
      car_temp.availability = "Available";
    }
    else{
      car_temp.availability = "Rented"
    }

  }
  else{
    var d1 = new Date(0000,00,00);
    var d2 = new Date(0000,00,00);
    car_temp.rent_from = "";
    car_temp.rent_to = "";
    car_temp.availability = "Available";
  }


  if (d2 < d1) {
    document.getElementById("error").innerHTML = "ERROR " + car_temp.rent_from + " is after " + car_temp.rent_to;
  }
  else {


  row = info.substring(info.indexOf("carID: "), info.indexOf("<br>", info.indexOf("carID: ")));
  car_temp.carID = row.split(" ")[1];
  car_temp.make = document.getElementsByName("carMake")[0].value;
  car_temp.model = document.getElementsByName("carModel")[0].value;
  car_temp.year = document.getElementsByName("carYear")[0].value;
  car_temp.num_seats = document.getElementsByName("carSeat")[0].value;
  car_temp.price = "$" + document.getElementsByName("carPrice")[0].value;





    for (var prop in car_temp) {
      if(prop.localeCompare("availability") == 0){
        if(car_temp.availability.localeCompare("Rented") == 0){
          car_info += "<div class='nonavail'>" + prop + ": " + car_temp[prop] + "</div>";
        }
        else{
          car_info += "<div class='avail'>" + prop + ": " + car_temp[prop] + "</div>";
        }
      }
      else{
        car_info += prop + ": " + car_temp[prop] + "<br>";
      }

    }
    car_info += "<br><br>";
    sessionStorage.setItem(("car" + car_temp.carID), car_info);


    display += "<input type='radio' name=car value=" + car_temp.carID + ">" + car_info;



    sessionStorage.setItem(car_temp.carID, display);


    document.getElementById("form2").submit();
  }

}
