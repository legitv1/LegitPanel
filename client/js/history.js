const historyList = document.getElementById("historyList");

let keys = JSON.parse(localStorage.getItem("keys")) || [];

render();

function render(){

    historyList.innerHTML = "";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

let historyKeys = keys;

if(currentUser && currentUser.role === "reseller"){

    historyKeys = keys.filter(key =>

        key.reseller === currentUser.username

    );

}

    if(keys.length===0){

        historyList.innerHTML = "<p style='color:#94A3B8;'>No Keys Generated Yet.</p>";

        return;

    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

let historyKeys = keys;

if(currentUser && currentUser.role === "reseller"){

    historyKeys = keys.filter(key =>

        key.reseller === currentUser.username

    );

}

historyhistoryKeys.slice().reverse().forEach((key,index)=>{

        historyList.innerHTML += `

        <div class="history-card">

            <div class="history-key">
                🔑 ${key.key}
            </div>

            <div class="history-info">

                <p><b>👤 Reseller</b><br>${key.reseller}</p>

                <p><b>🆔 ID</b><br>${key.resellerId}</p>

                <p><b>⏳ Duration</b><br>${key.duration}</p>

                <p><b>📱 Devices</b><br>${key.devices==0 ? "Unlimited" : key.usedDevices + "/" + key.devices}</p>

                <p><b>🟢 Status</b><br>${key.status}</p>

                <p><b>📅 Created</b><br>${key.created}</p>

            </div>

            <div class="history-buttons">

                <button onclick="copyKey('${key.key}')">
                    📋 Copy
                </button>

                <button onclick="deleteKey(keys.indexOf(key))">
                    🗑 Delete
                </button>

            </div>

        </div>

        `;

    });

}

function copyKey(text){

    navigator.clipboard.writeText(text);

    alert("Key Copied!");

}

function deleteKey(index){

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(currentUser && currentUser.role === "reseller"){

        alert("You cannot delete keys.");

        return;

    }

    if(confirm("Delete this key?")){

        keys.splice(index,1);

        localStorage.setItem("keys",JSON.stringify(keys));

        render();

    }

}