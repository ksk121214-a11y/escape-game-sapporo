document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // メール復元
    // =========================
    const emailList = document.querySelector(".email-list");

    if(emailList && localStorage.getItem("emails")){
        emailList.innerHTML = localStorage.getItem("emails");

        document.querySelectorAll(".email-item").forEach(email => {
            addEmailEvents(email);
        });

        // 復元したメールにもイベント付与
        document.querySelectorAll(".email-item").forEach(email => {
            addEmailEvents(email);
        });
    }

    function saveEmails(){
        const list = document.querySelector(".email-list");
        if(list){
            localStorage.setItem("emails", list.innerHTML);
        }
    }

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
    // メールページの展開処理
    // =========================
    const emails = document.querySelectorAll(".email-item");
    if(emails.length > 0) {
        emails.forEach(email => {

            const header = email.querySelector(".email-header");

            if(header){

                header.addEventListener("click", () => {

                    email.classList.toggle("open");

                    // 未読処理
                    if(email.classList.contains("unread")){
                        email.classList.remove("unread");

                        const dot = email.querySelector(".unread-dot");
                        if(dot) dot.remove();
                    }

                });

            }

        });
    }

    // =========================
// ニュース開閉関数（外に出す）
// =========================
function addNewsToggle(news){

    const title = news.querySelector(".news-title");
    const body = news.querySelector(".news-body");

    if(title && body){
        title.addEventListener("click", () => {
            body.style.display =
            body.style.display === "block" ? "none" : "block";
        });
    }

}

// =========================
// トップページだけで動かす
// =========================
if(document.body.id === "topPage"){

    const main = document.querySelector("main");

    // =========================
    // 復元処理（ページ読み込み時）
    // =========================
    if(localStorage.getItem("urgentNews") === "true"){

        if(main && !document.querySelector(".urgent-news")){

            const urgentNews = document.createElement("article");
            urgentNews.className = "news-item urgent-news";

            urgentNews.innerHTML = `
            <div class="news-content">
                        <img src="img/Component 1.png" alt="探偵死亡速報" class="news-img">

                        <div class="news-text">

                            <h2 class="news-title">
                            世界的名探偵Mr. Michael、死亡しているのが発見される
                            </h2>

                                <p class="news-body">
                                世界No.1とも称される名探偵、Mr. Michael（ミスター・マイケル）が死亡しているのが発見されました。<br>
                                警察によりますと、Mr. Michaelは自身の事務所で倒れているところを関係者により発見され、その場で死亡が確認されたということです。<br>

                                現場の状況から、何者かに殺害された可能性が高いとみられており、警察は事件として捜査を進めています。<br>

                                関係者によると、Mr. Michaelは死亡する直前まである重大な事件を追っていたとされ、その調査の途中で何者かに襲われた可能性もあるとみられています。<br>

                                警察は、事件との関連を含めて詳しい経緯を調べています。
                                </p>

                        </div>
                    </div>
                    `;

            main.prepend(urgentNews);
            addNewsToggle(urgentNews); // ←超重要
        }
    }

    // =========================
    // クリックで出現
    // =========================
    const importantNews = document.querySelector(".important-news");

    if(importantNews){

        importantNews.addEventListener("click", () => {

            if(localStorage.getItem("urgentNews") === "true") return;

            const urgentNews = document.createElement("article");
            urgentNews.className = "news-item urgent-news";

            urgentNews.innerHTML = `
            <div class="news-content">
                        <img src="img/Component 1.png" alt="探偵死亡速報" class="news-img">

                        <div class="news-text">

                            <h2 class="news-title">
                            世界的名探偵Mr. Michael、死亡しているのが発見される
                            </h2>

                                <p class="news-body">
                                世界No.1とも称される名探偵、Mr. Michael（ミスター・マイケル）が死亡しているのが発見されました。<br>
                                警察によりますと、Mr. Michaelは自身の事務所で倒れているところを関係者により発見され、その場で死亡が確認されたということです。<br>

                                現場の状況から、何者かに殺害された可能性が高いとみられており、警察は事件として捜査を進めています。<br>

                                関係者によると、Mr. Michaelは死亡する直前まである重大な事件を追っていたとされ、その調査の途中で何者かに襲われた可能性もあるとみられています。<br>

                                警察は、事件との関連を含めて詳しい経緯を調べています。
                                </p>

                        </div>
                    </div>
                    `;

            main.prepend(urgentNews);
            addNewsToggle(urgentNews); // ←これないと開けない

            localStorage.setItem("urgentNews", "true");

        });

    }

}

    // =========================
    // メールボックス初回ハッキング制御
    // =========================
    if(mobileMenu){
        const mailboxLink = mobileMenu.querySelector('a[href="mailbox.html"]');
        if(mailboxLink){
            mailboxLink.addEventListener("click", (e) => {
                if(localStorage.getItem("mailboxUnlocked") !== "true"){
                    // 初回 → ハッキングページに飛ばす
                    e.preventDefault();
                    window.location.href = "mailbox_login.html";
                }
            });
        }
    }

    // =========================
    // 謎解きページ
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
    // リセットボタン
    // =========================
    const resetBtn = document.getElementById("resetBtn");
    if(resetBtn){
        resetBtn.addEventListener("click", () => {
            localStorage.removeItem("urgentNews");
            localStorage.removeItem("mailboxUnlocked");
            localStorage.removeItem("emails");

            const urgentNews = document.querySelector(".urgent-news");
            if (urgentNews) urgentNews.remove();

            alert("リセット完了！ページを更新すると最初の状態に戻ります。");
        });
    }

    // =========================
    // メール保存（★ここ外に出す）
    // =========================
    function saveEmails(){
        const list = document.querySelector(".email-list");
        if(list){
            localStorage.setItem("emails", list.innerHTML);
        }
    }

    // =========================
    // メール開閉
    // =========================
    function addEmailEvents(email){

        const header = email.querySelector(".email-header");

        if(header){
            header.addEventListener("click", () => {

                email.classList.toggle("open");

                if(email.classList.contains("unread")){
                    email.classList.remove("unread");

                    const dot = email.querySelector(".unread-dot");
                    if(dot) dot.remove();

                    saveEmails(); // ★開いたら保存
                }

            });
        }
    }

    // =========================
    // メール返信機能
    // =========================
    const sendBtn = document.getElementById("sendReply");
    const replyText = document.getElementById("replyText");

    if(sendBtn && replyText){

        sendBtn.addEventListener("click", () => {

            const text = replyText.value.trim();
            if(text === "") return;

            const firstLine = text.split("\n")[0];
            const parentEmail = sendBtn.closest(".email-item");

            // =========================
            // 自分のメール
            // =========================
            const newMail = document.createElement("li");
            newMail.className = "email-item sent";

            newMail.innerHTML = `
            <div class="email-header">
                <span class="email-from">↪ From: Mr. Michael</span>
                <span class="email-subject">Subject: Re: ${firstLine}</span>
                <span class="email-date">${new Date().toLocaleString("ja-JP")}</span>
            </div>
            <div class="email-body">
                ${text.replace(/\n/g,"<br>")}
            </div>
            `;

            parentEmail.insertAdjacentElement("afterend", newMail);

            addEmailEvents(newMail);

            // =========================
            // 入力欄削除
            // =========================
            const replyBox = sendBtn.closest(".reply-box");
            if(replyBox) replyBox.remove();

            saveEmails(); // ★ここ超重要

            // =========================
            // 10秒後 博士返信
            // =========================
            setTimeout(()=>{

                const replyMail = document.createElement("li");
                replyMail.className = "email-item unread";

                replyMail.innerHTML = `
                <div class="email-header">
                    <span class="unread-dot"></span>
                    <span class="email-from">From: Dr. A. Heinrich</span>
                    <span class="email-subject">Subject: 返信ありがとう</span>
                    <span class="email-date">${new Date().toLocaleString("ja-JP")}</span>
                </div>
                <div class="email-body">
                    ……そうか<br><br>
                    君に託すしかない<br><br>
                    札幌を救ってくれ
                </div>
                `;

                document.querySelector(".email-list").prepend(replyMail);

                addEmailEvents(replyMail);

                saveEmails(); // ★これも絶対必要

                // =========================
                // さらに5秒後 → 緊急アラート
                // =========================
                setTimeout(()=>{

                    const alertBox = document.createElement("div");

                    alertBox.style.position = "fixed";
                    alertBox.style.top = "0";
                    alertBox.style.left = "0";
                    alertBox.style.width = "100%";
                    alertBox.style.background = "red";
                    alertBox.style.color = "white";
                    alertBox.style.padding = "15px";
                    alertBox.style.textAlign = "center";
                    alertBox.style.fontWeight = "bold";
                    alertBox.style.zIndex = "9999";

                    alertBox.innerHTML = `
                    🚨 緊急アラート 🚨<br>
                    東急百貨店内で異常反応検出<br>
                    館内の移動経路を封鎖します
                    `;

                    document.body.appendChild(alertBox);

                    saveEmails(); // 念のため

                    // =========================
                    // さらに2秒後 → 博士メール（次の指示）
                    // =========================
                    setTimeout(()=>{

                        const nextMail = document.createElement("li");
                        nextMail.className = "email-item unread";

                        nextMail.innerHTML = `
                        <div class="email-header">
                            <span class="unread-dot"></span>
                            <span class="email-from">From: Dr. A. Heinrich</span>
                            <span class="email-subject">Subject: 緊急指示</span>
                            <span class="email-date">${new Date().toLocaleString("ja-JP")}</span>
                        </div>
                        <div class="email-body">
                            ……まずい<br><br>

                            これは通常の封鎖じゃない<br><br>

                            テロ組織が建物の制御システムに侵入している<br><br>

                            移動経路はすべてロックされているはずだ<br><br>

                            だが——<br><br>

                            奴らは「認証コード」で制御している<br><br>

                            正しいコードを入力すれば解除できる<br><br>

                            さらに<br>
                            システムは階ごとに分断されている<br><br>

                            各フロアごとに突破しなければ下には降りられない<br><br>

                            ここに解除コードを入れなさい ↓<br><br>

                            <a href="puzzle.html" style="color:#007bff;">▶ 謎解きページへ</a>
                        </div>
                        `;

                        document.querySelector(".email-list").prepend(nextMail);

                        addEmailEvents(nextMail);

                        saveEmails(); // ★保存忘れない

                    },2000);

                },5000);

            },10000);

        });

    }
    
});