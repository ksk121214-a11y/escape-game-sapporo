document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // ハンバーガーメニュー
    // =========================
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if(menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
        });
    }

    // =========================
    // パズル処理
    // =========================
    const submitBtn = document.getElementById("submitPuzzle");
    const input = document.getElementById("puzzleCode");
    const result = document.getElementById("puzzleResult");

    if(submitBtn && input && result) {
        const correctCode = "246810"; // 正解の6桁数字
        submitBtn.addEventListener("click", () => {
            const code = input.value.trim();
            if(code === correctCode) {
                result.style.color = "#28a745";
                result.innerHTML = `
                    <p>正解！ウイルスの場所: 中央区ビルA地下室</p>
                    <p>犯人: Dr. X</p>
                `;
            } else {
                result.style.color = "#d9534f";
                result.textContent = "数字が違います。もう一度確認してください。";
            }
        });
    }
   // =========================
    // piano
    // =========================

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    function playSound(freq){

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.frequency.value = freq;
        osc.type = "sine";

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();

        gain.gain.setValueAtTime(1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);

        osc.stop(audioCtx.currentTime + 1);
    }

    const notes = {
        C: 261,
        D: 294,
        E: 329,
        F: 349,
        G: 392,
        A: 440,
        B: 493,
        C2: 523
    };

    document.querySelectorAll(".key").forEach(key => {
        key.addEventListener("click", () => {

            const note = key.dataset.note;
            playSound(notes[note]);

        });
    });
});