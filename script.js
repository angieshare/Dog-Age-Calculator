document.addEventListener('DOMContentLoaded', function() {
    const calcBtn = document.getElementById('calcBtn');
    const birthdayInput = document.getElementById('dogBirthday');
    const dogAgeDisplay = document.getElementById('dogAge');
    const humanAgeDisplay = document.getElementById('humanAge');
    const statusMsg = document.getElementById('status');

    const STORAGE_KEY = 'hermione_birthday_data';

    // --- 步驟 1：網頁載入時，自動從瀏覽器拿資料 ---
    const savedDate = localStorage.getItem(STORAGE_KEY);
    if (savedDate) {
        birthdayInput.value = savedDate;
        calculateAndDisplay(savedDate);
        if (statusMsg) statusMsg.textContent = "已自動載入上次儲存的生日 ✨";
    }

    // --- 步驟 2：按下計算按鈕 ---
    calcBtn.addEventListener('click', function() {
        const birthdayValue = birthdayInput.value;
        
        if (!birthdayValue) {
            alert("請先選擇妙麗的生日喔！");
            return;
        }

        // 存進保險箱 (localStorage)
        localStorage.setItem(STORAGE_KEY, birthdayValue);
        
        // 執行計算並更新畫面
        calculateAndDisplay(birthdayValue);
        if (statusMsg) statusMsg.textContent = "計算完成，已存檔！ ✅";
    });

    // --- 步驟 3：換算邏輯 ---
    function calculateAndDisplay(birthdayStr) {
        const birthday = new Date(birthdayStr);
        const today = new Date();
        
        // 計算實際歲數
        let age = today.getFullYear() - birthday.getFullYear();
        const monthDiff = today.getMonth() - birthday.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }
        if (age < 0) age = 0;

        // 換算人類歲數 (1歲=15, 2歲=24, 之後+4)
        let humanAge = 0;
        if (age === 0) {
            humanAge = 0;
        } else if (age === 1) {
            humanAge = 15;
        } else if (age >= 2) {
            humanAge = 24 + (age - 2) * 4;
        }

        // 更新顯示內容
        dogAgeDisplay.textContent = age;
        humanAgeDisplay.textContent = humanAge;
    }
});