document.querySelector("form").addEventListener("submit", e => {
  let loginSuccess = 0;
  var account = 0;
  var loginArray = [['222456','1Password1'],['224333','2Password2'],
['330000','3Password3']];
        var un = e.target.elements.uname.value;
        var pw = e.target.elements.psw.value;
        //var pw = e.loginForm.psw.value;
        var username = "username"; 
        var password = "password";
        if ((un == loginArray[0][0]) && (pw == loginArray[0][1])) {
          loginSuccess = 1;
          account = loginArray[0][0];
          document.getElementById("timedataCover").style.visibility = "hidden";
          document.getElementById("login").style.visibility = "hidden";
          document.getElementById("timedata").style.visibility = "visible";
          document.getElementById("logout").style.visibility = "visible";
          document.querySelector("form").addEventListener("submit", e => {
            e.preventDefault();
            return true;
          });
        } else if ((un == loginArray[1][0]) && (pw == loginArray[1][1])) {
          loginSuccess = 1;
          account = loginArray[1][0];
          return true;
        } else if ((un == loginArray[2][0]) && (pw == loginArray[2][1])) {
          loginSuccess = 1;
          account = loginArray[2][0];
          return true;
        }
        else {
          alert ("Login was unsuccessful, please check your username and password");
          return false;
        }
  e.preventDefault();
});