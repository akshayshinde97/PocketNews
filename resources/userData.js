import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getDatabase, ref, set , onValue, update } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDS5ha6oQGAQlLPPq67nITi8X3Fxp9Z-0o",
    authDomain: "pocknews.firebaseapp.com",
    databaseURL: "https://pocknews-default-rtdb.firebaseio.com",
    projectId: "pocknews",
    storageBucket: "pocknews.appspot.com",
    messagingSenderId: "955950035940",
    appId: "1:955950035940:web:354fd9dadf7d8d655bcdf1"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

  onAuthStateChanged(auth, (user) => {
      if (user) {
        document.getElementById("loader").style.display="none";
        document.getElementById("cusCon").style.display="block";
          var db = getDatabase();
          var uid = user.uid;
          const usernameref = ref(db, 'users/' + uid );
          onValue(usernameref, (snapshot) => {
          const data = snapshot.val();
          var Topics = data.Choices;
          console.log(data.Choices);
          customcontent(Topics);
          });
      }
      else if(user == null)
      {
            document.getElementById("Nouser").style.display ="block";
            document.getElementById("loader").style.display="none";
      }
      else{
          document.getElementById("loader").style.display="block";
      }
  
  });

// filling coursal card 
async function fetchdata(url){
    var data;
    let response = await fetch(url);
    if (response.ok) {
        data = response.json();
      }
    return data;  
}

 var datamap = new Map()
 datamap.set("tech","https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/technology.rss")
 datamap.set("sports",'https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/indiansports.rss',);
 datamap.set("covid","https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fflipboard.com%2F%40thenewsdesk%2Fthe-latest-on-coronavirus-covid-19-t82no8kmz.rss");
 datamap.set("food","https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/food.rss");
 datamap.set("business","https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/business.rss");
 datamap.set("entertainment","https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/entertainment.rss");
console.log(datamap.get("tech"));
var divmap = new Map()
divmap.set("tech","Tech-accordion");
divmap.set("sports","Sports-accordion");
divmap.set("covid","Covid-accordion");
divmap.set("food","Food-accordion");
divmap.set("business","Business-accordion");
divmap.set("entertainment","Entertainment-accordion");
console.log(divmap.get("tech"))
function customcontent(topics)
{
    topics.forEach(loadData);
}

// async function loadDataSports(){

//     var odiv = document.getElementById("Sports-accordion-content");
//     var url = 'https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/indiansports.rss'
//     var data = await fetchdata(url);
//     console.log(data['items'].length);
//     for(let card = 0; card<data['items'].length; card++)
//     {
//         var coursalitemdiv= document.createElement("div");
//         var carddiv = document.createElement("div");
//         var img = document.createElement("img");
//         var cardbody = document.createElement("div");
//         var title = document.createElement("h5");
//         var summary = document.createElement("p");
//         var pubd = document.createElement("p");
//         cardbody.classList.add("card-body");
//         img.classList.add("card-img-top")
//         title.classList.add("card-title")
//         summary.classList.add("card-text")
//         pubd.classList.add("card-title")
//         coursalitemdiv.classList.add("carousel-item");
//         carddiv.classList.add("card");
//         carddiv.classList.add("mb-3");
//         if(card == 0)
//         {
//             // add active class
//             coursalitemdiv.classList.add("active");
//         }
//         var art_link = document.createElement("a");
//         art_link.href = data["items"][card]["link"];
//         img.src = data['items'][card]['enclosure']['link'];
                
//         art_link.append(img);
//         carddiv.appendChild(art_link);
//         var art_link = document.createElement("a");
//         title.textContent = data['items'][card]['title'];
//         art_link.setAttribute('href',data["items"][card]["link"]);
//         art_link.appendChild(title);
//         cardbody.append(art_link);
//         summary.textContent = data['items'][card]['content'];

//         pubd.textContent = data['items'][card]['pubDate'];
//         cardbody.append(pubd);
        
//         cardbody.append(summary);

//         carddiv.append(cardbody);
//         coursalitemdiv.append(carddiv);
//         odiv.append(coursalitemdiv);

//     }
    

// };
// async function loadDataPolitics(){


//     var odiv = document.getElementById("Politics-accordion-content");
//     var url = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fflipboard.com%2F%40thenewsdesk%2Fthe-latest-on-coronavirus-covid-19-t82no8kmz.rss'
//     var data = await fetchdata(url);
//     console.log(data['items'].length);
//     for(let card = 0; card<data['items'].length; card++)
//     {
//         var coursalitemdiv= document.createElement("div");
//         var carddiv = document.createElement("div");
//         var img = document.createElement("img");
//         var cardbody = document.createElement("div");
//         var title = document.createElement("h5");
//         var summary = document.createElement("p");
//         var pubd = document.createElement("p");
//         cardbody.classList.add("card-body");
//         img.classList.add("card-img-top")
//         title.classList.add("card-title")
//         summary.classList.add("card-text")
//         pubd.classList.add("card-title")
//         coursalitemdiv.classList.add("carousel-item");
//         carddiv.classList.add("card");
//         carddiv.classList.add("mb-3");
//         if(card == 0)
//         {
//             // add active class
//             coursalitemdiv.classList.add("active");
//         }
//         var art_link = document.createElement("a");
//         art_link.href = data["items"][card]["link"];
//         img.src = data['items'][card]['enclosure']['link'];
                
//         art_link.append(img);
//         carddiv.appendChild(art_link);
//         var art_link = document.createElement("a");
//         title.textContent = data['items'][card]['title'];
//         art_link.setAttribute('href',data["items"][card]["link"]);
//         art_link.appendChild(title);
//         cardbody.append(art_link);
//         summary.textContent = data['items'][card]['content'];

//         pubd.textContent = data['items'][card]['pubDate'];
//         cardbody.append(pubd);
//         cardbody.append(summary);
        
//         carddiv.append(cardbody);
//         coursalitemdiv.append(carddiv);
//         odiv.append(coursalitemdiv);

//     }
    

// };
// async function loadDataTech(){


//     var odiv = document.getElementById("Tech-accordion-content");
//     var url = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fflipboard.com%2F%40dfletcher%2Findia-tech-b2meqpd6z.rss'
//     var data = await fetchdata(url);
//     console.log(data['items'].length);
//     for(let card = 0; card<data['items'].length; card++)
//     {
//         var coursalitemdiv= document.createElement("div");
//         var carddiv = document.createElement("div");
//         var img = document.createElement("img");
//         var cardbody = document.createElement("div");
//         var title = document.createElement("h5");
//         var summary = document.createElement("p");
//         var pubd = document.createElement("p");
//         cardbody.classList.add("card-body");
//         img.classList.add("card-img-top")
//         title.classList.add("card-title")
//         summary.classList.add("card-text")
//         pubd.classList.add("card-pubd")
//         coursalitemdiv.classList.add("carousel-item");
//         carddiv.classList.add("card");
//         carddiv.classList.add("mb-3");
//         if(card == 0)
//         {
//             // add active class
//             coursalitemdiv.classList.add("active");
//         }
//         var art_link = document.createElement("a");
//         art_link.href = data["items"][card]["link"];
//         img.src = data['items'][card]['enclosure']['link'];
                
//         art_link.append(img);
//         carddiv.appendChild(art_link);
//         var art_link = document.createElement("a");
//         title.textContent = data['items'][card]['title'];
//         art_link.setAttribute('href',data["items"][card]["link"]);
//         art_link.appendChild(title);
//         cardbody.append(art_link);
//         pubd.textContent = data['items'][card]['pubDate'];
//         cardbody.append(pubd);
//         summary.textContent = data['items'][card]['content'];
//         cardbody.append(summary);
//         carddiv.append(cardbody);
//         coursalitemdiv.append(carddiv);
//         odiv.append(coursalitemdiv);

//     }
    

// }
async function loadData(id)
{
    console.log(id);
    document.getElementById(divmap.get(id)).style.display = "block";
    var odiv = document.getElementById(id);
    var url = datamap.get(id);
    var data = await fetchdata(url);
    console.log(data['items'].length);
    for(let card = 0; card<data['items'].length; card++)
    {
        var coursalitemdiv= document.createElement("div");
        var carddiv = document.createElement("div");
        var img = document.createElement("img");
        var cardbody = document.createElement("div");
        var title = document.createElement("h5");
        var summary = document.createElement("p");
        var pubd = document.createElement("p");
        cardbody.classList.add("card-body");
        img.classList.add("card-img-top")
        title.classList.add("card-title")
        summary.classList.add("card-text")
        pubd.classList.add("card-pubd")
        coursalitemdiv.classList.add("carousel-item");
        carddiv.classList.add("card");
        carddiv.classList.add("mb-3");
        if(card == 0)
        {
            // add active class
            coursalitemdiv.classList.add("active");
        }
        var art_link = document.createElement("a");
        art_link.href = data["items"][card]["link"];
        img.src = data['items'][card]['enclosure']['link'];         
        art_link.append(img);
        carddiv.appendChild(art_link);
        var art_link = document.createElement("a");
        title.textContent = data['items'][card]['title'];
        art_link.setAttribute('href',data["items"][card]["link"]);
        art_link.appendChild(title);
        cardbody.append(art_link);
        pubd.textContent = data['items'][card]['pubDate'];
        cardbody.append(pubd);
        summary.textContent = data['items'][card]['content'];
        cardbody.append(summary);
        carddiv.append(cardbody);
        coursalitemdiv.append(carddiv);
        odiv.append(coursalitemdiv);
    }

}

function logout()
{
    signOut(auth);
    window.location = "./login.html"
}
export {logout}

