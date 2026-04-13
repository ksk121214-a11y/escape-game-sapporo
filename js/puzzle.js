let stage = 1;

function checkAnswer() {
    const ans = document.getElementById("answer").value;

    if(stage === 1 && ans.includes("時計台")) {
        nextFile(2, "北に流れる大いなる川\nその名を答えよ");
    }
    else if(stage === 2 && ans.includes("豊平川")) {
        nextFile(3, "赤いレンガの建物\nかつての役目は何だ");
    }
    else if(stage === 3 && ans.includes("道庁")) {
        nextFile(4, "地下に広がる巨大な通路\nその名は？");
    }
    else if(stage === 4 && ans.includes("地下歩行空間")) {
        finishGame();
    }
    else {
        document.getElementById("message").textContent = "…違うようだ";
    }
}

function nextFile(num, questionText) {
    stage = num;

    document.getElementById("fileTitle").textContent = "File " + num;
    document.getElementById("question").innerHTML = questionText.replace(/\n/g, "<br>");
    document.getElementById("answer").value = "";
    document.getElementById("message").textContent = "解析成功…次のファイルを開く";
}

function finishGame() {
    document.getElementById("fileBox").style.display = "none";

    document.getElementById("final").innerHTML =
        "最終暗号：<br><br>" +
        "『カギは最初に戻る』<br>" +
        "—— 探偵より";
}