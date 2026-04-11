document.addEventListener("DOMContentLoaded", () => {
    // ハンバーガーメニュー
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if(menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
        });
    }

    // ヒントカード処理
    const hints = {
        1: "ヒント1: 街の中央にあるビルを調べよ。",
        2: "ヒント2: 監視カメラに怪しい影。",
        3: "ヒント3: 探偵が最後に残したメモを確認。",
        4: "ヒント4: 暗号のパターンに注意。",
        5: "ヒント5: 犯人の行動パターンを追え。"
    };

    const hintCards = document.querySelectorAll(".hint-card");

    hintCards.forEach(card => {
        const btn = card.querySelector(".hint-btn");
        const content = card.querySelector(".hint-content");
        const number = card.getAttribute("data-number");

        btn.addEventListener("click", () => {
            // ヒントをカード下に表示
            content.textContent = hints[number] || "ヒントはありません";
            
            // アラートで速報
            alert("速報！");
        });
    });
});