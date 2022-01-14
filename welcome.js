import { signOut ,auth, onAuthStateChanged  } from "./app.js";
import { getDatabase, ref, set , onValue, update } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

function logout()
{
    signOut(auth);
    window.location = "./login.html"
}

var catgArr=[];
function add(e)
{
    e.preventDefault();
    var cat = e.target.id;
    if(document.getElementById(cat).classList.toggle("selected"))
    {
        catgArr.push(cat);
    }
    else
    {
        catgArr = catgArr.filter((value)=>value!= cat);
    }
    console.log(catgArr);
    
}

function userChoices()
{
    const user = auth.currentUser;
    var db = getDatabase();
    var uid = user.uid;
    onAuthStateChanged(auth, ( ) => {
        const user = auth.currentUser;
        if (user !== null) {
            update(ref(db, 'users/'+ uid),
            {
                Choices : catgArr
            })
            .then(()=>{
                alert("data stored");
                window.location ="index.html";
                const usernameref = ref(db, 'users/' + uid );
                onValue(usernameref, (snapshot) => {
                const data = snapshot.val();
                    console.log(data.Choices);
                    document.getElementById("show").textContent += data.Choices;
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("data strorage failed.");  
                alert(errorMessage);
            });
        }
    });
}

function validateChoices()
{
    if(catgArr.length == 0)
    {
        alert("Please atleast select 1 topic");
    }
    else
    {
        userChoices();
    }
}

export { validateChoices, add, logout, };


