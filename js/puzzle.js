let stage = 1; // File番号
let step = 0;  // 問題番号

// 問題データ
const data = {
    1: [
        { q: "この街の中心に立つ塔", a: "1" },
        { q: "北に流れる大いなる川", a: "2" },

        // ←ここが音ギミック
        { q: "音を聞け\n答えを導き出せ", a: "3", type: "piano" },

        { q: "RASORAに向かえ", a: "12", type: "final" }
    ],
    2: [
        { q: "この2つの画像の作品名は？", a: ["4", "5"], type: "image2" },

        { q: "File2-Bが示しているものは？", a: "6" },

        { 
            q: "A：北緯〇〇 東経〇〇 角度〇〇\nB：北緯〇〇 東経〇〇 角度〇〇\nC：北緯〇〇 東経〇〇 角度〇〇\n\n何が見える？",
            a: ["7", "8", "9"],
            type: "abc"
        },

        { q: "File2-DのQを入力", a: "10", type: "final2" }
    ],
    3: [
        { 
            q: "カードの位置を読み取れ",
            a: ["11", "12", "13"],
            type: "image3" // ←ここ変更
        },

        { q: "File3-Bの地図を辿り答えを入力せよ", a: "14", type: "map" }
    ],
    4: [
        { q: "最後の問い\nすべてを繋げよ", a: "？？？" },
        { q: "ヒント：最初に戻れ", a: "？？？" },
        { q: "集めた情報を使え", a: "？？？" },
        { q: "導き出される言葉は？", a: "？？？" }
    ]
};

// 初期表示
loadQuestion();

function checkAnswer() {
    const current = data[stage][step];

    // ABC問題
    if(current.type === "abc") {
        const a = document.getElementById("inputA").value;
        const b = document.getElementById("inputB").value;
        const c = document.getElementById("inputC").value;

        if(
            a.includes(current.a[0]) &&
            b.includes(current.a[1]) &&
            c.includes(current.a[2])
        ) {
            step++;

            if(step < data[stage].length) {
                loadQuestion();
            } else {
                nextFile();
            }

            showMessage("…推理命中");
        } else {
            showMessage("…違うようだ");
        }
        return;
    }

    // 画像2問
    if(current.type === "image2") {
        const a1 = document.getElementById("imgAnswer1").value;
        const a2 = document.getElementById("imgAnswer2").value;

        if(
            a1.includes(current.a[0]) &&
            a2.includes(current.a[1])
        ) {
            step++;

            if(step < data[stage].length) {
                loadQuestion();
            } else {
                nextFile();
            }

            showMessage("…推理命中");
        } else {
            showMessage("…違うようだ");
        }
        return;
    }

    if(current.type === "image3") {
    const a = document.getElementById("img3A").value;
    const b = document.getElementById("img3B").value;
    const c = document.getElementById("img3C").value;

    if(
        a.includes(current.a[0]) &&
        b.includes(current.a[1]) &&
        c.includes(current.a[2])
    ) {
        step++;

        if(step < data[stage].length) {
            loadQuestion();
        } else {
            nextFile();
        }

        showMessage("…推理命中");
    } else {
        showMessage("…違うようだ");
    }
    return;
}

    // 通常問題
    const ans = document.getElementById("answer").value.replace(/\s/g, "");

    if(ans.includes(current.a)) {
        step++;

        if(step < data[stage].length) {
            loadQuestion();
            showMessage("…推理命中");
        } else {
            nextFile();
        }
    } else {
        showMessage("…違うようだ");
    }
}

function showMessage(text) {
    const msg = document.getElementById("message");

    msg.textContent = text;

    setTimeout(() => {
        msg.textContent = "";
    }, 3000); // ←3秒で消える
}

function loadQuestion() {
    const current = data[stage][step];

    document.getElementById("fileTitle").textContent = "File " + stage;
    document.getElementById("question").innerHTML =
        current.q.replace(/\n/g, "<br>");

    // 全部リセット（これが重要）
    document.getElementById("answer").value = "";
    document.getElementById("imgAnswer1").value = "";
    document.getElementById("imgAnswer2").value = "";
    document.getElementById("inputA").value = "";
    document.getElementById("inputB").value = "";
    document.getElementById("inputC").value = "";

    document.getElementById("img3A").value = "";
    document.getElementById("img3B").value = "";
    document.getElementById("img3C").value = "";

    // 一旦全部非表示
    document.getElementById("answer").style.display = "none";
    document.getElementById("imageArea").style.display = "none";
    document.getElementById("abcArea").style.display = "none";
    document.getElementById("pianoArea").style.display = "none";
    document.getElementById("image3Area").style.display = "none";

    // タイプごとに表示
    if(current.type === "piano") {
            document.getElementById("pianoArea").style.display = "block";
            document.getElementById("answer").style.display = "inline-block";

        } else if(current.type === "image2") {
            document.getElementById("imageArea").style.display = "block";

        } else if(current.type === "abc") {
            document.getElementById("abcArea").style.display = "block";

        } else if(current.type === "image3") {
            document.getElementById("image3Area").style.display = "block";

        } else {
            document.getElementById("answer").style.display = "inline-block";
    }

    // grid問題のときだけ生成
}

function nextFile() {

    if(stage === 1) {
        document.getElementById("fileBox").style.display = "none";

        document.getElementById("final").innerHTML =
            "位置情報：札幌市〇〇区〇〇<br><br>" +
            "暗号：『次は赤き記憶を辿れ』";

        document.getElementById("nextBtn").style.display = "inline-block";
        return;
    }

    if(stage === 2) {
        document.getElementById("fileBox").style.display = "none";

        document.getElementById("final").innerHTML =
            "暗号：『次は影を辿れ』";

        document.getElementById("nextBtn3").style.display = "inline-block";
        return;
    }

    // 🔥 これ追加
    if(stage === 3) {
    document.getElementById("fileBox").style.display = "none";

    document.getElementById("final").innerHTML =
        "暗号：『最後の鍵は通信の中にある』";

    showNotification(); // ←これ追加！！

    return;
}

    stage++;
    step = 0;

    if(stage <= 4) {
        loadQuestion();
        document.getElementById("message").textContent =
            "File " + (stage - 1) + " 完了…次のファイルを開く";
    } else {
        finishGame();
    }
}

function finishGame() {
    document.getElementById("fileBox").style.display = "none";

    document.getElementById("final").innerHTML =
        "最終暗号：<br><br>" +
        "『すべての答えを並べ替えよ』<br>" +
        "—— 探偵の遺言";
}

//piano
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

const notes = {
    do: 261.6,
    re: 293.7,
    mi: 329.6,
    fa: 349.2,
    so: 392.0,
    la: 440.0,
    si: 493.9
};

function playNote(note) {
    initAudio();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.frequency.value = notes[note];
    osc.type = "sine";

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();

    gain.gain.setValueAtTime(1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

    setTimeout(() => osc.stop(), 500);
}

function playMelody() {
    initAudio();

    const melody = ["la", "so", "la"];

    melody.forEach((note, i) => {
        setTimeout(() => playNote(note), i * 600);
    });
}




//次のファイルへ
function goToFile(fileNumber, btnId) {
    stage = fileNumber;
    step = 0;

    document.getElementById("fileBox").style.display = "block";
    document.getElementById("final").innerHTML = "";

    // ボタン消す
    if(btnId) {
        document.getElementById(btnId).style.display = "none";
    }

    loadQuestion();
}

function showNotification() {
    const noti = document.getElementById("notification");

    setTimeout(() => {
        noti.style.top = "0"; // 上から出てくる
    }, 500);
}

function goMail() {
    location.href = "mail.html";
}