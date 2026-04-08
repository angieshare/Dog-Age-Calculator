const calcBtn = document.getElementById('calcBtn');
const birthdayInput = document.getElementById('dogBirthday');
const dogAgeDisplay = document.getElementById('dogAge');
const humanAgeDisplay = document.getElementById('humanAge');
const statusMsg = document.getElementById('status');

const STORAGE_KEY = 'hermione_birthday_data';

// --- 1. 初始化：檢查瀏覽器有沒有存過資料 ---
window.onload = function() {
    const savedDate = localStorage.getItem(STORAGE_KEY);
    if (savedDate) {
        birthdayInput.value = savedDate;
        calculateAndDisplay(savedDate);
        statusMsg.textContent = "已自動載入上次儲存的生日 ✨";
    }
};

// --- 2. 點擊按鈕：計算並存檔 ---
calcBtn.addEventListener('click', function() {
    const birthdayValue = birthdayInput.value;
    
    if (!birthdayValue) {
        alert("請先選擇妙麗的生日喔！");
        return;
    }

    // 儲存到 localStorage
    localStorage.setItem(STORAGE_KEY, birthdayValue);
    
    // 執行計算
    calculateAndDisplay(birthdayValue);
    statusMsg.textContent = "計算完成，已更新紀錄！ ✅";
});

// --- 3. 核心計算函式 ---
function calculateAndDisplay(birthdayStr) {
    const birthday = new Date(birthdayStr);
    const today = new Date();
    
    // 計算實際歲數
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }
    age = age < 0 ? 0 : age;

    // 換算人類歲數邏輯 (15, 9, 4)
    let humanAge = 0;
    if (age === 1) {
        humanAge = 15;
    } else if (age >= 2) {
        humanAge = 24 + (age - 2) * 4;
    } else {
        humanAge = age * 15;
    }

    // 顯示到網頁上
    dogAgeDisplay.textContent = age;
    humanAgeDisplay.textContent = Math.floor(humanAge);
}