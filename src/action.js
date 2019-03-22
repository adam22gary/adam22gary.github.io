$("#menu").click(function(){
    document.getElementById("openSesame").style.width = "60%";
    document.getElementById("openSesame").style.display = "block";
})

$("#theNavNav a").click(function(){
    document.getElementById("openSesame").style.display = "none";
})
$("#x").click(function(){
    document.getElementById("openSesame").style.display = "none";
})

// get date
function startTime() {
    var today = new Date();
    var y = today.getFullYear();
    var mon = today.getMonth();
    var d = today.getDate();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById('date').innerHTML = d + " " + months[today.getMonth()] + " " + y;
    document.getElementById('date2').innerHTML = d + " " + months[today.getMonth()] + " " + y;
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;

    //already makes 24 hour
    // var makeNum = Number(h);
    // if(makeNum >= 0 && makeNum <= 12){
    //     var add12 = makeNum;
    // }else{
    //     var add12 = makeNum + 12;
    // }
    // alert(h)
    var add12 = 6;
    if(add12 >= 0 && add12 <= 11){
        document.getElementById('welcome').innerHTML = "Good morning";
    }else if(add12 >= 12 && add12 <= 17){
        document.getElementById('welcome').innerHTML = "Good afternoon";
    }else{
        document.getElementById('welcome').innerHTML = "Good evening";
    }
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
//weather
function getWeather(lat, lon) {
    $.ajax({
      url: "https://api.darksky.net/forecast/9c4e8944261ed3b6f5f3438431a5cfa0/" + lat + "," + lon,
      dataType: "jsonp",
      success: function(data) {
        console.log("Current temp: " + data.currently.temperature);
        // get all information
        var fahrenheit = data.currently.temperature.toFixed(2),
          locationName = data.timezone,
          splice = locationName.indexOf("/"),
          icon = data.currently.icon.toUpperCase()
        console.log(icon)
        console.log(splice)
        var celsius = ((fahrenheit - 32) * 5 / 9).toFixed(2); 
        console.log(celsius); 
        $("#tempC").html(celsius + "&deg;C");
        $("#locationName").html(locationName.substring(splice + 1).replace("_", " "));
        $("#tempF").html(fahrenheit + "&deg;F").hide();
 
        $("#toggle").click(function() {
          $("#tempC").toggle("slow")
          $("#tempF").toggle("slow")
        });
        var icons = new Skycons({
          "color": "555"
        });
        icons.set("icon", icon)
        icons.play(); 
      }
    });
  }
  // ask Garret how to always allow location
  // Gets the users long n lat 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      getWeather(lat, lon); 
    });
  }
