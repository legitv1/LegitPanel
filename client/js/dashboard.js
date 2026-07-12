const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){

    window.location.href = "../index.html";

}

if(currentUser.role !== "admin"){

    window.location.href = "resellerDashboard.html";

}

const resellers = JSON.parse(localStorage.getItem("resellers")) || [];
const keys = JSON.parse(localStorage.getItem("keys")) || [];

document.getElementById("resellerCount").innerText = resellers.length;

document.getElementById("keyCount").innerText = keys.length;

let totalCoins = 0;

resellers.forEach(user=>{

    totalCoins += Number(user.coins);

});

document.getElementById("coinCount").innerText = totalCoins;

const today = new Date().toLocaleDateString();

let todayKeys = 0;

keys.forEach(key=>{

    if(key.created){

        if(key.created.includes(today)){

            todayKeys++;

        }

    }

});

document.getElementById("todayCount").innerText = todayKeys;