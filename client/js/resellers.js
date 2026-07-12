const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){

    window.location.href = "../index.html";

}

if(currentUser.role !== "admin"){

    window.location.href = "resellerDashboard.html";

}

const createBtn = document.getElementById("createBtn");
const list = document.getElementById("list");

// Load saved resellers
let resellers = JSON.parse(localStorage.getItem("resellers")) || [];

function saveData(){
localStorage.setItem("resellers", JSON.stringify(resellers));
}

function render(){

if(resellers.length===0){  

    list.innerHTML="<p style='color:#94A3B8;'>No resellers yet.</p>";  

    return;  

}  

list.innerHTML="";  

resellers.forEach((user,index)=>{  

    list.innerHTML+=`  

    <div class="action-card">  

        <div>  

            <h4>${user.username}</h4>

<p>ID : ${user.id}</p>

            <p>Coins : <b>${user.coins}</b></p>  

        </div>  

        <div style="display:flex;gap:8px;align-items:center;">  

            <button onclick="addCoins(${index})">+100</button>  

            <button onclick="removeCoins(${index})">-100</button>  

            <button onclick="removeReseller(${index})">🗑</button>  

        </div>  

    </div>  

    `;  

});

}

createBtn.onclick=function(){

const username=document.getElementById("username").value.trim();  
const password=document.getElementById("password").value.trim();  
const coins=document.getElementById("coins").value.trim();  

if(username==="" || password==="" || coins===""){  
    alert("Fill all fields.");  
    return;  
}  

const id = "RS" + String(resellers.length + 1).padStart(3,"0");

resellers.push({

    id,
    username,
    password,
    coins

});

saveData();  
render();  

document.getElementById("username").value="";  
document.getElementById("password").value="";  
document.getElementById("coins").value="";

}

function removeReseller(index){

resellers.splice(index,1);  

saveData();  

render();

}

render();

function addCoins(index){

resellers[index].coins = Number(resellers[index].coins)+100;  

saveData();  

render();

}

function removeCoins(index){

if(Number(resellers[index].coins)>=100){  

    resellers[index].coins = Number(resellers[index].coins)-100;  

}  

saveData();  

render();

}