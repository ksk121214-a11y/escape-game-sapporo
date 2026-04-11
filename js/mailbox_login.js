document.addEventListener("DOMContentLoaded", () => {

const loginBtn = document.getElementById("loginBtn");
const errorMessage = document.getElementById("errorMessage");

const terminalBtn = document.getElementById("terminalBtn");
const terminal = document.getElementById("terminal");

const runBtn = document.getElementById("runBtn");

const cursor = document.getElementById("terminalCursor");
const terminalResult = document.getElementById("terminalResult");


/* ===== ログイン ===== */

loginBtn.addEventListener("click", () => {

errorMessage.textContent = "暗証番号が違います";

});


/* ===== ターミナル起動 ===== */

terminalBtn.addEventListener("click", () => {

terminal.style.display = "block";

startBootSequence();

});


/* ===== 起動演出 ===== */

function startBootSequence(){

const lines = [

"Initializing terminal...",
"Loading modules...",
"Connecting to remote server...",
"Bypassing firewall...",
"Accessing system..."

];

let i = 0;

terminalResult.innerHTML = "";

const interval = setInterval(()=>{

terminalResult.innerHTML += lines[i] + "<br>";

i++;

if(i >= lines.length){

clearInterval(interval);

setTimeout(()=>{

terminalResult.innerHTML = "START HACKING? (yes/no)";

},800);

}

},600);

}


/* ===== ターミナル入力 ===== */

let terminalBuffer = "";
let terminalStage = 0;
/*
0 = yes/no
1 = 計算
*/

document.addEventListener("keydown",(e)=>{

if(terminal.style.display !== "block") return;

if(e.key === "Enter"){

runTerminal();
return;

}

if(e.key === "Backspace"){

terminalBuffer = terminalBuffer.slice(0,-1);

}else if(e.key.length === 1){

terminalBuffer += e.key;

}

updateCursor();

});


function updateCursor(){

cursor.textContent = terminalBuffer + "_";

}


/* ===== 実行ボタン ===== */

runBtn.addEventListener("click",()=>{

runTerminal();

});


/* ===== ターミナル処理 ===== */

function runTerminal(){

if(terminalStage === 0){

if(terminalBuffer.toLowerCase() === "yes"){

terminalResult.innerHTML = `
Security verification<br><br>
a² + b² = c²<br><br>
enter c:
`;

terminalStage = 1;

}else{

terminalResult.textContent = "Access denied.";

}

terminalBuffer="";
updateCursor();

return;

}


/* ===== 計算 ===== */

if(terminalStage === 1){

if(terminalBuffer.trim() === "10"){

startHack();

}else{

terminalResult.style.color="red";
terminalResult.textContent="Wrong answer.";

}

terminalBuffer="";
updateCursor();

}

}


/* ===== ハッキング画面 ===== */

function startHack(){

terminalResult.style.color="lime";
terminalResult.textContent="HACKING START...";

setTimeout(()=>{

window.location.href = "mailbox_hack.html";

},1000);

}

});