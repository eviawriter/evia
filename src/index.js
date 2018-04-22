const electron = require('electron')
const path = require('path')
const axios = require('axios')
const BrowserWindow = electron.remote.BrowserWindow
const notifyBtn = document.getElementById('notifyBtn')
// added for testing
const ipc = electron.ipcRenderer

var price = document.querySelector('h1')
var targetPriceVal;
var targetPrice = document.getElementById('targetPrice')

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$'+cryptos.toLocaleString('en')
    })
}

getBTC();
setInterval ( getBTC, 30000 );

notifyBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({
        alwaysOnTop: true,
        frame: false, 
        transparent: true, 
        width: 600, 
        height: 200 
    })

    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
})
ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})
