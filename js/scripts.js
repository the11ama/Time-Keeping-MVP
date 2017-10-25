// Setting necessary global variables.
var username = "empty";
let loginSuccess = "false";

// Reveals or hides sections depending on login type.
var cssHideChange = () => {
          document.getElementById("timedataCover").style.visibility = "hidden";
          document.getElementById("login").style.visibility = "hidden";
          document.getElementById("timedata").style.visibility = "visible";
          document.getElementById("logout").style.visibility = "visible";
          document.getElementById("bottom").style.margin = "11px";
          document.getElementById("punchIn").style.visibility = "visible";
          document.getElementById("punchOut").style.visibility = "visible";
};
var cssHideReset = () => {
          document.getElementById("timedataCover").style.visibility = "visible";
          document.getElementById("login").style.visibility = "visible";
          document.getElementById("timedata").style.visibility = "hidden";
          document.getElementById("logout").style.visibility = "hidden";
          document.getElementById("bottom").style.margin = "-20px";
          document.getElementById("punchIn").style.visibility = "hidden";
          document.getElementById("punchOut").style.visibility = "hidden";
};

// Table information is constructed here.
class Entry {
  constructor(employeeNumber, date, time, inOut) {
    this.employeeNumber = employeeNumber;
    this.date = date;
    this.time = time;
    this.inOut = inOut;
  }
}

// sets demo times.
const clockSheet = [];
if (clockSheet.length === 0) {
  clockSheet.push(new Entry("222456", "09/23/2013", "12:00:00", "in"));
  clockSheet.push(new Entry("222456", "11/09/2013", "08:45:22", "out"));
  clockSheet.push(new Entry("224333", "10/04/2015", "09:30:00", "in"));
}

const clockSheetWS = clockSheet;

// Login form is called here.
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  var account = 0;
  var loginArray = [['222456','1Password1'],['224333','2Password2'],
['330000','3Password3']];
        var un = e.target.elements.uname.value;
        var pw = e.target.elements.psw.value;
        //var pw = e.loginForm.psw.value;
        username = "username";
        var password = "password";
        for (var i = 0; i < loginArray.length; i++) {
          if ((un == loginArray[i][0]) && (pw == loginArray[i][1])) {
            account = loginArray[i][0];
            username = account;
            loginSuccess = true;
          }
        }
        // on login, call methods.
        if (loginSuccess === true) {
          cssHideChange();
          punchCard(account);
          // logout here
          document.getElementById("out").addEventListener("submit", e => {
            //e.preventDefault(); left out due to issues with tables.
            loginSuccess = false;
            cssHideReset();
            return username;
          });
        } 
        else {
          alert ("Login was unsuccessful, please check your username and password");
          return false;
        }
});
  
  // more stuff to come.
  
// This displays the punch card.
function punchCard(username) {
  var inOut = "out";
  var logStatus = false;
  var div = "";
  var table  = "";
  var tr = "";
  var td1 = "";
  var td2 = "";
  var td3 = "";
    $("#record").empty();
    $("table").empty();
    $("tr").empty();
    $("td1").empty();
    $("td2").empty();
    $("td3").empty();
  div = document.getElementById("record");
  table  = document.createElement('table');
  var siftedSheet = clockSheetWS.filter(function (name) {
                                      return name.employeeNumber == username;
                                      });
  // Determines which table type to call
  if (siftedSheet.length !== 0) {
  var lastArrNumber = siftedSheet.length - 1;
  if (siftedSheet[lastArrNumber].inOut == "in") {
    logStatus = true;
  }
  if (logStatus === false){
    document.getElementById("punchIn").style.visibility = "visible";
    document.getElementById("punchOut").style.visibility = "hidden";
    
  } else {
    document.getElementById("punchIn").style.visibility = "hidden";
    document.getElementById("punchOut").style.visibility = "visible";
  }
    // This table is called when there is at least one entry.
    $("#record").empty();
    $("table").empty();
    for(var i = 0; i < siftedSheet.length + 1; i++){
        tr = table.insertRow();
        if (i === 0) {
          td1 = tr.insertCell();
          td1.appendChild(document.createTextNode("Date"));
          td2 = tr.insertCell();
          td2.appendChild(document.createTextNode("Time"));
          td3 = tr.insertCell();
          td3.appendChild(document.createTextNode("In/Out"));
        } else {
          td1 = tr.insertCell();
          td1.appendChild(document.createTextNode(siftedSheet[i - 1].date));
          td2 = tr.insertCell();
          td2.appendChild(document.createTextNode(siftedSheet[i - 1].time));
          td3 = tr.insertCell();
          td3.appendChild(document.createTextNode(siftedSheet[i - 1].inOut));
        }
      }
      i = 0;
      div.appendChild(table);
  } else {
    // This table called when there are no entries.
    document.getElementById("punchIn").style.visibility = "visible";
    document.getElementById("punchOut").style.visibility = "hidden";
    $("#record").empty();
    $("table").empty();
    for(var i = 0; i < 2; i++){
        tr = table.insertRow();
        if (i == 0) {
          td1 = tr.insertCell();
          td1.appendChild(document.createTextNode("Date"));
          td2 = tr.insertCell();
          td2.appendChild(document.createTextNode("Time"));
          td3 = tr.insertCell();
          td3.appendChild(document.createTextNode("In/Out"));
        } else {
          td1 = tr.insertCell();
          td1.appendChild(document.createTextNode("No Entries"));
          td2 = tr.insertCell();
          td2.appendChild(document.createTextNode("Click 'Punch In' above"));
          td3 = tr.insertCell();
          td3.appendChild(document.createTextNode("New Sheet"));
        }
      }
      div.appendChild(table);
  }
  // Punch in and out buttons are listened to here.
    document.getElementById("punchIn").addEventListener("submit", e => {
      e.preventDefault();
      inOut = "in";
      punchClock(username, inOut);
    });
    document.getElementById("punchOut").addEventListener("submit", e => {
      e.preventDefault();
      punchClock(username, inOut);
    });
}

// The punchClock function adds the time when it is operated to the punch card.
function punchClock(username, inOut) {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var day = d.getDate();
    var month = (d.getMonth()+1);
    var year = d.getFullYear();
    var date = (month + "/" + day + "/" + year);
    var time = (h + ":" + m + ":" + s);
  if (inOut == "in") {
    clockSheetWS.push(new Entry(username, date, time, "in"));
    punchCard(username);
  } else {
    clockSheetWS.push(new Entry(username, date, time, "out"));
    punchCard(username);
  }
}