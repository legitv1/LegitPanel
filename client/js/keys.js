const prices = {

    "1 Hour":10,

    "6 Hours":30,

    "12 Hours":50,

    "1 Day":100,

    "3 Days":250,

    "7 Days":500,

    "15 Days":900,

    "30 Days":1500

};

const generateBtn = document.getElementById("generateBtn");
const generatedKey = document.getElementById("generatedKey");

const durationSelect = document.getElementById("duration");
const quantityInput = document.getElementById("quantity");
const costText = document.getElementById("cost");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const resellerSelect = document.getElementById("reseller");
const resellerLabel = document.getElementById("resellerLabel");

if(currentUser && currentUser.role === "reseller"){

    resellerLabel.style.display = "none";
    resellerSelect.style.display = "none";

}

if(currentUser && currentUser.role === "reseller"){

    resellerSelect.style.display = "none";

}

let resellers = JSON.parse(localStorage.getItem("resellers")) || [];

function loadResellers(){

    resellerSelect.innerHTML = "";

    if(resellers.length === 0){

        resellerSelect.innerHTML = "<option>No Resellers</option>";
        return;

    }

    resellers.forEach(user=>{

        resellerSelect.innerHTML += `
            <option value="${user.username}">
                ${user.username}
            </option>
        `;

    });

}

loadResellers();

const settings = JSON.parse(localStorage.getItem("settings")) || {
    panelName: "Legit Premium Panel",
    keyBrand: "LEGITPANEL"
};

// Generate random characters
function randomPart(length){

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let result = "";

    for(let i=0;i<length;i++){

        result += chars.charAt(Math.floor(Math.random()*chars.length));

    }

    return result;

}

// Convert duration to prefix
function getPrefix(duration){

    switch(duration){

        case "1 Hour": return "1Hx";
        case "6 Hours": return "6Hx";
        case "12 Hours": return "12Hx";

        case "1 Day": return "1Dx";
        case "3 Days": return "3Dx";
        case "7 Days": return "7Dx";
        case "15 Days": return "15Dx";
        case "30 Days": return "30Dx";

        default: return "1Dx";

    }

}

function updateCost(){

    const duration = durationSelect.value;

    const quantity = Number(quantityInput.value);

    const total = prices[duration] * quantity;

    costText.innerHTML = total + " Coins";

}

durationSelect.onchange = updateCost;
quantityInput.oninput = updateCost;

updateCost();

generateBtn.onclick = async function(){

    const duration = document.getElementById("duration").value;
    const devices = document.getElementById("devices").value;
    if(devices === "" || Number(devices) < 0){

    alert("Enter a valid device limit.");

    return;

}
    const quantity = Number(document.getElementById("quantity").value);
    let reseller;

if(currentUser && currentUser.role === "reseller"){

    reseller = resellers.find(user =>

        user.username === currentUser.username

    );

}else{

    reseller = resellers.find(user =>

        user.username === resellerSelect.value

    );

}

const totalCost = prices[duration] * Number(quantity);

if(currentUser && currentUser.role === "reseller"){

    if(!reseller){

        alert("Reseller not found.");
        return;

    }

    if(Number(reseller.coins) < totalCost){

        alert(
            "Not enough coins!\n\n" +
            "Available: " + reseller.coins +
            "\nRequired: " + totalCost
        );

        return;

    }

}

    let output = "";

    for(let i=0;i<quantity;i++){

    try{

    const response = await fetch("http://127.0.0.1:3000/api/key/generate",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            duration:duration
        })

    });

    const data = await response.json();

    if(data.success){

        output += data.key + "<br>";

    }else{

        alert(data.message);

    }

}catch(err){

    console.log(err);
    alert("Unable to connect to the server.");

}

}
if(currentUser && currentUser.role === "reseller"){

    reseller.coins = Number(reseller.coins) - totalCost;

    localStorage.setItem("resellers", JSON.stringify(resellers));

}

if(!currentUser || currentUser.role !== "reseller"){

    loadResellers();

}


    generatedKey.innerHTML = output;

}