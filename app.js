import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getDatabase, ref, set , onValue } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyDS5ha6oQGAQlLPPq67nITi8X3Fxp9Z-0o",
  authDomain: "pocknews.firebaseapp.com",
  databaseURL: "https://pocknews-default-rtdb.firebaseio.com/",
  projectId: "pocknews",
  storageBucket: "pocknews.appspot.com",
  messagingSenderId: "955950035940",
  appId: "1:955950035940:web:354fd9dadf7d8d655bcdf1"
};
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(user.uid)
      const db = getDatabase();
      const usernameref = ref(db, 'users/' + uid );
      onValue(usernameref, (snapshot) => {
        const data = snapshot.val();
        // document.getElementById("hello").textContent = data.username;
        document.getElementById("addusername").textContent = data.username;
        // updateStarCount(postElement, data);
      });
     
      // ...
    } else {
      // User is signed out
      // ...
      console.log("User is signed out");
    }


// console.log("this is here",catgArr);
// document.getElementById("signOut").addEventListener("click", (e) => {
//   //Prevent Default Form Submission Behavior
//     e.preventDefault()
//     console.log("clicked")
    
//     signOut(auth)
//     alert("Signed Out")
//     window.location = "login.html";
// })

});

export  { signOut, auth , getDatabase, onAuthStateChanged, onValue };

