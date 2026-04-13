let stage = 1; // File番号
let step = 0;  // 問題番号

// 問題データ
const data = {
    1: [
        { q: "この街の中心に立つ塔", a: "時計台" },
        { q: "北に流れる大いなる川", a: "豊平川" },

        // ←ここが音ギミック
        { q: "音を聞け\n答えを導き出せ", a: "ラソラ", type: "piano" },

        { q: "RASORAに向かえ", a: "12", type: "final" }
    ],
    2: [
        { q: "白く輝く塔\n夜には光を放つ\nその名は？", a: "テレビ塔" },
        { q: "広大な公園\n四季折々の姿を見せる", a: "大通公園" },
        { q: "札幌の玄関口\n多くの人が行き交う", a: "札幌駅" },
        { q: "地下に広がる商業空間", a: "地下街" }
    ],
    3: [
        { q: "動物たちが集う場所", a: "円山動物園" },
        { q: "山の上にある神社", a: "北海道神宮" },
        { q: "夜景が美しい山", a: "藻岩山" },
        { q: "札幌の代表的な市場", a: "二条市場" }
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
    const ans = document.getElementById("answer").value.replace(/\s/g, "");
    const correct = data[stage][step].a;

    if(ans.includes(correct)) {
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

    document.getElementById("answer").value = "";

    // 鍵盤表示制御
    if(current.type === "piano") {
        document.getElementById("pianoArea").style.display = "block";
    } else {
        document.getElementById("pianoArea").style.display = "none";
    }
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
function goNextFile() {
    stage = 2;
    step = 0;

    document.getElementById("fileBox").style.display = "block";
    document.getElementById("final").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";

    loadQuestion();
}