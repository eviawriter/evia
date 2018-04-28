const electron = require("electron");
const ipc = electron.ipcRenderer;

document.addEventListener("DOMContentLoaded", function() {
    ipc.send("itsloaded")
    ipc.on("resultSent", function(evt, result){
        let resultEl = document.getElementById("chapters");
        console.log(result);
        for(var i = 0; i < result.length;i++){
        chaptersEl.innerHTML += "h2" + result[i].chapter.toString() + "h2";
        }
    });
});
