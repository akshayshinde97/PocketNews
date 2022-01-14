// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS5ha6oQGAQlLPPq67nITi8X3Fxp9Z-0o",
  authDomain: "pocknews.firebaseapp.com",
  databaseURL: "https://pocknews-default-rtdb.firebaseio.com/",
  projectId: "pocknews",
  storageBucket: "pocknews.appspot.com",
  messagingSenderId: "955950035940",
  appId: "1:955950035940:web:354fd9dadf7d8d655bcdf1"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth(app);
const db = getDatabase(app);


var Signupevent = document.getElementById("signupform");
Signupevent.onsubmit = function(e) {sgnUp(e)};
function sgnUp(e) {
  e.preventDefault();
  var toggle = validate_password(e.target.elements.pwd.value);
  if(toggle != true)
  {
    alert("password should be 6 charcters or more!");
    return 
  }
  createUserWithEmailAndPassword(auth,e.target.elements.email.value,e.target.elements.pwd.value)
  .then(function() {
    var user = auth.currentUser

    var userId  = user.uid
    set(ref(db, 'users/'+ userId),{
      username: e.target.elements.Name.value,
      email: e.target.elements.email.value
    })
    .then(()=>{
      window.location ="login.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert("data strorage failed.");
    });
    alert("User Created Successfully,Please login!");  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message 
      alert(error_message,error_code);
    })
}

 
var SgNINevent = document.getElementById("btnsignIn");
SgNINevent.addEventListener("click", siginfun ); 

function siginfun(e){
  e.preventDefault();
  let email = document.getElementById("email").value;
  let pwd = document.getElementById("pwd").value;
  signInWithEmailAndPassword(auth, email,pwd)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      // console.log("this is user:-",user)
      // console.log("this",user.username);
      var uid = user.uid;
      const usernameref = ref(db, 'users/' + uid );
      onValue(usernameref, (snapshot) => {
        var data = snapshot.val();
        if(data.Choices){
          window.location ='./index.html';
        }
        else
        {
          window.location ='./welcome.html';
        }
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode);
      // console.error("fancy me",error);
      alert( errorCode,errorMessage)
    });
}
// Validate Functions
function validate_email(email) {
  let expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  }
  return false
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  console.log(password);
  if (password.length < 6) {
    return false
  }
  return true;
}

function validate_field(field) {
  if (field == null) {
    return false
  }
  if (field.length <= 0) {
    return false
  }
  return true;
}
function ShwPSD() {
  var x = document.getElementById("pwd");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
// exporting variables and function
export { auth , signOut, ShwPSD };
