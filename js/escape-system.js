const sidebar = document.getElementById("sidebar");

const status = document.getElementById("status");
const result = document.getElementById("result");
const problem = document.getElementById("problem");

const xyArea = document.getElementById("xyArea");

// メニュー
function toggleMenu() {
    sidebar.classList.toggle("open");
}

// 音声
function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.9;
    speechSynthesis.speak(u);
}

// ローディング
function fakeLoading(callback, success = true) {
    status.classList.add("loading");

    const logs = [
        ">> 接続中...",
        ">> データ取得中...",
        ">> 解析中...",
        ">> 照合中...",
        ">> 復号中..."
    ];

    let i = 0;

    const interval = setInterval(() => {
        status.textContent = logs[i % logs.length];
        i++;
    }, 500);

    setTimeout(() => {
        clearInterval(interval);
        status.classList.remove("loading");

        if (success) {
            status.textContent = ">> 解析成功";
        } else {
            status.textContent = ">> ERROR";
        }

        setTimeout(callback, 500);
    }, 3000);
}

// 解析
function analyze() {
    const inputField = document.getElementById("input");
    let input = inputField.value.replace(/\s/g, "");

    inputField.value = "";
    result.textContent = "";
    problem.textContent = "";
    xyArea.style.display = "none";
    document.getElementById("phoneBtn").style.display = "none";

    // 10階
    if (input === "さっぽろ東急百貨店10階") {
        fakeLoading(() => {
            problem.textContent = "Xがある場所にY";
            xyArea.style.display = "block";
        }, true);
        return;
    }

    // 9階
    if (input === "9" || input === "9階") {
        fakeLoading(() => {
            problem.textContent = "機密データは21のKにある";

            result.innerHTML = `
                <input id="secretInput" placeholder="機密データを入力">
                <br>
                <button onclick="submitSecret()">解析</button>
            `;
        }, true);
        return;
    }

    // 🔥 8階
    if (input === "8" || input === "8階") {
        fakeLoading(() => {
            problem.textContent = "真偽を見極め、真実である記号だけを通って左から右へ進め";

            result.innerHTML = `
                <input id="floor8Input" placeholder="答えを入力">
                <br>
                <button onclick="submitFloor8()">解析</button>
            `;
        }, true);
        return;
    }

    // 🔥 7階
    if (input === "7" || input === "7階") {
        fakeLoading(() => {
            problem.textContent = "3つのコードを入力せよ";

            result.innerHTML = `
                <div class="multi-input">
                    <div class="input-block">
                        <label>1</label>
                        <input id="f7_1">
                    </div>
                    <div class="input-block">
                        <label>2</label>
                        <input id="f7_2">
                    </div>
                    <div class="input-block">
                        <label>3</label>
                        <input id="f7_3">
                    </div>
                </div>
                <button onclick="submitFloor7()">解析</button>
            `;
        }, true);
        return;
    }

    // 失敗
    fakeLoading(() => {
        result.textContent = "INVALID";
    }, false);
}

// 7階入力後
function normalize(str) {
    return str.replace(/\s/g, "").toUpperCase();
}

function submitFloor7() {
    const a = normalize(document.getElementById("f7_1").value);
    const b = normalize(document.getElementById("f7_2").value);
    const c = normalize(document.getElementById("f7_3").value);

    if (a === "09BLACK" && b === "L47" && c === "483924") {
        fakeLoading(() => {
            problem.textContent = "赤と青の間にありし、文字列をスキャンせよ";

            result.innerHTML = `
                <div class="scan-area">
                    <video id="camera" autoplay></video>
                    <div class="scan-frame"></div>
                </div>
                <button onclick="startScan()">スキャン</button>
            `;
        }, true);
    } else {
        fakeLoading(() => {
            result.textContent = "INVALID";
        }, false);
    }
}

async function startScan() {
    const video = document.getElementById("camera");

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        });
        video.srcObject = stream;
    } catch (e) {
        alert("カメラが使えません");
        return;
    }

    // スキャンボタン押したら判定（簡易）
    setTimeout(() => {
        fakeLoading(() => {
            result.innerHTML = `<div class="big-result">1234</div>`;
        }, true);
    }, 2000);
}

// 8階入力後
function submitFloor8() {
    const input = document.getElementById("floor8Input").value;

    if (input === "ささみふらい") {
        fakeLoading(() => {
            problem.textContent = "";
            result.innerHTML = `<div class="big-result">4623</div>`;
        }, true);
    } else {
        fakeLoading(() => {
            result.textContent = "INVALID";
        }, false);
    }
}

// 9階入力後
function submitSecret() {
    fakeLoading(() => {
        problem.textContent = "";
        result.innerHTML = `<div class="big-result">CDACHGEJBF</div>`;

        // 電話ボタン表示
        document.getElementById("phoneBtn").style.display = "block";
    }, true);
}

// 10階
function checkXY() {
    const x = document.getElementById("xInput").value;
    const y = document.getElementById("yInput").value;

    document.getElementById("xInput").value = "";
    document.getElementById("yInput").value = "";

    if (x === "ATM" && y === "保険") {
        fakeLoading(() => {

            // 🔥 問題文消す
            problem.textContent = "";

            // 🔥 XYエリア消す
            xyArea.style.display = "none";

            // 🔥 通常入力戻す
            document.getElementById("mainInputArea").style.display = "block";

            // 🔥 暗号だけ表示
            result.textContent = "CODE: 44267789";

            // 🔥 プレースホルダ変更
            document.getElementById("input").placeholder = "階を入力";

        }, true);
    } else {
        fakeLoading(() => {
            result.textContent = "INVALID";
        }, false);
    }
}

// 電話へ
function openPhone() {
    location.href = "phone.html";
}