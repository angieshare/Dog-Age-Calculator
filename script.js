const calcBtn = document.getElementById('calcBtn');

calcBtn.addEventListener('click', function() {
    const birthdayValue = document.getElementById('dogBirthday').value;
    if (!birthdayValue) {
        alert("請先選擇日期喔！");
        return;
    }

    const birthday = new Date(birthdayValue);
    const today = new Date();
    
    // 1. 計算狗狗實際歲數 (考慮月份與日期)
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }

    // 防止年齡出現負數（如果選了未來的日期）
    age = age < 0 ? 0 : age;

    // 2. 換算人類年齡邏輯 (中小型犬公式)
    // 第一年 = 15 歲
    // 第二年 = +9 歲 (共 24 歲)
    // 之後每年 = +4 歲
    let humanAge = 0;
    if (age === 1) {
        humanAge = 15;
    } else if (age >= 2) {
        humanAge = 24 + (age - 2) * 4;
    } else if (age < 1) {
        // 未滿一歲的簡化算法：若想更精確可依月份計算，這裡先以 0 歲計
        humanAge = age * 15; 
    }

    // 3. 將結果渲染到網頁上
    document.getElementById('dogAge').textContent = age;
    document.getElementById('humanAge').textContent = Math.floor(humanAge);
});