let stage = 1;
let step = 0;


// 問題データ
const data = {
    1: [
        { q: "File 1-Aは何？", a: "東札幌" },
        { q: "File 1-Aの2番出口を出る前のピアハーブの看板は何色？", a: "オレンジ" },

        // ←ここが音ギミック
        { q: "音を聞け\n答えを導き出せ", a: "ラソラ", type: "piano" },

        { q: "RASORAに向かえ File 1-D", a: "青", type: "final" }
    ],
    2: [
        { q: "この2つの画像の作品名は？", a: ["妙夢", "白い風のソナタ"], type: "image2" },

        { q: "File2-Bが示しているものは？", a: "たまごレタスチャーハン" },

        { 
            q: "何が見える？",
            a: ["妙夢", "吉野家", "五右衛門"],
            type: "abc"
        },

        { q: "File2-Dの？を入力", a: "247", type: "final2" }
    ],
    3: [
        { 
            q: "品名は？",
            a: ["25%混合果汁入り飲料", "紅茶飲料", "ココア飲料"],
            type: "image3" // ←ここ変更
        },

        { q: "File3-Bの地図を辿り答えを入力せよ", a: "263", type: "map" }
    ],
    4: [
        { q: "最後の問い\nすべてを繋げよ", a: "？？？" },
        { q: "ヒント：最初に戻れ", a: "？？？" },
        { q: "集めた情報を使え", a: "？？？" },
        { q: "導き出される言葉は？", a: "？？？" }
    ]
};

// 初期表示
window.onload = () => {
    sessionStorage.setItem("restored", "1");
    stage = Number(localStorage.getItem("stage")) || 1;

    const savedStep = localStorage.getItem("step");

    step = (savedStep === null) ? 0 : Number(savedStep);

    const mode = localStorage.getItem("mode");

    if (mode === "final1") return showFinal1();
    if (mode === "final2") return showFinal2();
    if (mode === "final3") return showFinal3();

    loadQuestion();
};

function saveState() {
    localStorage.setItem("stage", stage);
    localStorage.setItem("step", step);
}

function loadState() {
    stage = Number(localStorage.getItem("stage")) || 1;
    step = Number(localStorage.getItem("step")) || 0;
}

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
            localStorage.setItem("stage", stage);
            localStorage.setItem("step", step);

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
            saveState();

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
        localStorage.setItem("stage", stage);
        localStorage.setItem("step", step);

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

        localStorage.setItem("stage", stage);
        localStorage.setItem("step", step);

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

    if (!sessionStorage.getItem("restored")) {
    document.getElementById("imgAnswer1").value = "";
    document.getElementById("imgAnswer2").value = "";
}

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
    
    localStorage.setItem("stage", stage);
    localStorage.setItem("step", step);

    if(stage === 1) {
        localStorage.setItem("mode", "final1");
        showFinal1();
        return;
    }

    if(stage === 2) {

        step = data[stage].length; // ←これ追加（重要）

        localStorage.setItem("stage", stage);
        localStorage.setItem("step", step);
        localStorage.setItem("mode", "final2");

        showFinal2();
        return;
    }

    if(stage === 3) {

        step = data[stage].length;

        localStorage.setItem("stage", stage);
        localStorage.setItem("step", step);
        localStorage.setItem("mode", "final3");

        showFinal3();
        return;
    }

    stage++;
    step = 0;

    localStorage.setItem("stage", stage);
    localStorage.setItem("step", step);
    localStorage.removeItem("mode");

    loadQuestion();
}

function showFinal1() {
    localStorage.setItem("stage", stage);
    localStorage.setItem("step", step);
    localStorage.setItem("mode", "final1");

    document.getElementById("fileBox").style.display = "none";

    document.getElementById("final").innerHTML =
        "位置情報：〒003-0002 北海道札幌市白石区東札幌２条２丁目４<br><br>" +
        "東札幌駅改札出てすぐの一番出口<br><br>" +
        "暗号：あいことば";

    document.getElementById("nextBtn").style.display = "inline-block";
}

function showFinal2() {
    localStorage.setItem("stage", stage);
    localStorage.setItem("step", step);
    localStorage.setItem("mode", "final2");

    document.getElementById("fileBox").style.display = "none";

    document.getElementById("final").innerHTML =
        "位置情報：〒060-0806 北海道札幌市北区北６条西４丁目<br><br>" +
        "札幌駅北口切符売り場の近く<br><br>" +
        "暗号：さつまいも";

    document.getElementById("nextBtn3").style.display = "inline-block";
}

function showFinal3() {
    localStorage.setItem("stage", stage);
    localStorage.setItem("step", step);
    localStorage.setItem("mode", "final3");

    document.getElementById("fileBox").style.display = "none";

    document.getElementById("final").innerHTML =
       "位置情報：〒060-0063 北海道札幌市中央区南３条西４丁目１２−１<br><br>" +
       "ポールタウンからメガドンキ入り口付近<br><br>" +
        "暗号：なつやすみ";

    showNotification();
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

    localStorage.removeItem("mode");

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

function resetGame() {
    // 保存データ全部削除
    localStorage.removeItem("stage");
    localStorage.removeItem("step");
    localStorage.removeItem("mode");

    // もし他にもあれば一括でもOK
    // localStorage.clear();

    // 初期化
    stage = 1;
    step = 0;

    // 画面リセット
    document.getElementById("fileBox").style.display = "block";
    document.getElementById("final").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("nextBtn3").style.display = "none";

    // 最初の問題へ
    loadQuestion();

    showMessage("リセット完了");
}