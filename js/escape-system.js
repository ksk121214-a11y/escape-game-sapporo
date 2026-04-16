const sidebar = document.getElementById("sidebar");

const status = document.getElementById("status");
const result = document.getElementById("result");
const problem = document.getElementById("problem");

const xyArea = document.getElementById("xyArea");

let isFloorUnlocked = false;
let phoneUnlocked = false;
let phoneBtnShown = false;
let hidePhoneBtn = false;

function saveState() {
    localStorage.setItem("escape_status", status.innerHTML);
    localStorage.setItem("escape_result", result.innerHTML);
    localStorage.setItem("escape_problem", problem.innerHTML);
    localStorage.setItem("escape_xy", xyArea.style.display);
}

function openPhone() {
    localStorage.setItem("return_page", location.href);
    location.href = "phone.html";
}

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

    if (isFloorUnlocked) {
        inputField.placeholder = "階を入力";
    }
    let input = inputField.value.replace(/\s/g, "");

    inputField.value = "";
    result.textContent = "";
    problem.textContent = "";
    xyArea.style.display = "none";
    

    // 10階
    if (input === "さっぽろ東急百貨店10階") {
        fakeLoading(() => {
            problem.textContent = "Xがある場所にY";
            xyArea.style.display = "block";
            saveState();
        }, true);
        return;
    }

    // 9階
    if (input === "9" || input === "9階") {
        fakeLoading(() => {

            if (phoneUnlocked) {
                problem.textContent = "";
                result.innerHTML = `<div class="big-result">CDACHGEJBF</div>`;
                if (!phoneBtnShown) {
                    document.getElementById("phoneBtn").style.display = "block";
                    phoneBtnShown = true;
                }

                // 入力欄を消す
                const inputField = document.getElementById("input");

                saveState();
                return;
            }

            // 通常状態
            problem.textContent = "機密データは21のKにある";

            result.innerHTML = `
                <input id="secretInput" placeholder="機密データを入力">
                <br>
                <button onclick="submitSecret()">解析</button>
            `;

            // 入力欄は表示
            document.getElementById("input").style.display = "block";

            saveState();

        }, true);

        return;
    }

    // 🔥 8階
    if (input === "8" || input === "8階") {
        hidePhoneBtn = true;
        fakeLoading(() => {
            problem.textContent = "真偽を見極め、真実である記号だけを通って左から右へ進め";

            result.innerHTML = `
                <input id="floor8Input" placeholder="答えを入力">
                <br>
                <button onclick="submitFloor8()">解析</button>
            `;
            saveState();
        }, true);
        return;
    }

    // 🔥 7階
    if (input === "7" || input === "7階") {
        hidePhoneBtn = true;
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
            saveState();
        }, true);
        return;
    }

    // 🔥 6階
        if (input === "6" || input === "6階") {
            hidePhoneBtn = true;
            fakeLoading(() => {
                problem.textContent = "6つの機器を正しく対応させよ";

                result.innerHTML = `
                    <div class="multi-input">

                        <div class="input-block">
                            <label>Z</label>
                            <input id="f6_A">
                        </div>

                        <div class="input-block">
                            <label>B</label>
                            <input id="f6_B">
                        </div>

                        <div class="input-block">
                            <label>C</label>
                            <input id="f6_C">
                        </div>

                        <div class="input-block">
                            <label>D</label>
                            <input id="f6_D">
                        </div>

                        <div class="input-block">
                            <label>E</label>
                            <input id="f6_E">
                        </div>

                        <div class="input-block">
                            <label>F</label>
                            <input id="f6_F">
                        </div>

                    </div>

                    <button onclick="submitFloor6()">解析</button>
                `;
                saveState();
            }, true);
            return;
        }

    // 失敗
    fakeLoading(() => {
        result.textContent = "INVALID";
        saveState();
    }, false);

}

// 6階入力後
function submitFloor6() {
    const A = document.getElementById("f6_A").value.trim();
    const B = document.getElementById("f6_B").value.trim();
    const C = document.getElementById("f6_C").value.trim();
    const D = document.getElementById("f6_D").value.trim();
    const E = document.getElementById("f6_E").value.trim();
    const F = document.getElementById("f6_F").value.trim();

    if (
        A === "テレビ" &&
        B === "カメラ" &&
        C === "照明" &&
        D === "洗濯機" &&
        E === "冷蔵庫" &&
        F === "炊飯器"
    ) {
        fakeLoading(() => {
            problem.textContent = "";
            result.innerHTML = `<div class="big-result">9876</div>`;
        }, true);
    } else {
        fakeLoading(() => {
            // ❗ここ重要：入力は消さない（innerHTML触らない）
            status.textContent = ">> ERROR";
        }, false);
    }
    saveState();
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
                <div class="big-result">スキャンモード起動中...</div>
                <button onclick="openScan()">スキャンを起動</button>
            `;
            saveState();
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
            saveState();
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
    saveState();
}

// 9階入力後
function submitSecret() {
    fakeLoading(() => {
        problem.textContent = "";
        result.innerHTML = `<div class="big-result">CDACHGEJBF</div>`;

        // 電話ボタン表示
        if (!phoneBtnShown) {
            document.getElementById("phoneBtn").style.display = "block";
            phoneBtnShown = true;
        }
    }, true);
    saveState();
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

            isFloorUnlocked = true;
            localStorage.setItem("floor_unlocked", "true");
            document.getElementById("input").placeholder = "階を入力";

            saveState();
            

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

// スキャンへs
function openScan() {
    location.href = "scan.html";
}

window.addEventListener("load", () => {
    

    const unlocked = localStorage.getItem("floor_unlocked");

    if (unlocked === "true") {
        isFloorUnlocked = true;
        document.getElementById("input").placeholder = "階を入力";
    }

    const s = localStorage.getItem("escape_status");
    const r = localStorage.getItem("escape_result");
    const p = localStorage.getItem("escape_problem");
    const xy = localStorage.getItem("escape_xy");

    if (s) status.innerHTML = s;
    if (r) result.innerHTML = r;
    if (p) problem.innerHTML = p;

    xyArea.style.display = (xy === "block") ? "block" : "none";

    const params = new URLSearchParams(location.search);

    // 電話成功・失敗どちらも「戻る時に画面復元」

    if (params.get("call") === "success" || params.get("call") === "fail") {
        phoneUnlocked = true;

        history.replaceState(null, "", location.pathname);

        fakeLoading(() => {
            problem.textContent = "";
            result.innerHTML = `<div class="big-result">CDACHGEJBF</div>`;
            if (phoneUnlocked) {
                if (!phoneBtnShown) {
                    document.getElementById("phoneBtn").style.display = "block";
                    phoneBtnShown = true;
                }
            }
        }, true);

        window.history.replaceState({}, document.title, location.pathname);
    }

    if (params.get("scan") === "ok") {
        fakeLoading(() => {
            result.innerHTML = `<div class="big-result">1234</div>`;
        }, true);
    }
});