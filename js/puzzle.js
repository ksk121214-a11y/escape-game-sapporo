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
});