/**用时 */
let startTime = Date.now();

function updateTimeCost() {
  const now = Date.now();
  const elapsedTime = now - startTime;

  const hours = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(2, '0');
  const minutes = String(Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const seconds = String(Math.floor((elapsedTime % (1000 * 60)) / 1000)).padStart(2, '0');

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  document.getElementById('time-cost-display').textContent = formattedTime;
}

/**欢迎页面 */
let nickname = '';
const welcomeDiv = document.querySelector('#welcome');
welcomeDiv.addEventListener('transitionend', function() {
  setInterval(updateTimeCost, 1000);
});

document.getElementById('begin-to-test').addEventListener('click', function() {
  welcomeDiv.style.transform = `translateY(-100%)`;
  
});

document.addEventListener('DOMContentLoaded', function() {
  // 获取当前时间的问候语
  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) {
      return "早上好";
    } else if (hour >= 12 && hour < 18) {
      return "下午好";
    } else {
      return "晚上好";
    }
  }

  // 设置时间问候语
  document.getElementById('welcome-greetbytime').textContent = getGreeting();

  // 提示用户输入昵称
  nickname = prompt("请输入你的昵称：", "火焰猫燐");
  if (nickname) {
    // 将昵称显示在指定元素中
    document.getElementById('welcome-greetbyname').textContent = nickname;
    document.getElementById('your-name-text').textContent = nickname;
  }
});

/**显示当前时间 */
function updateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  document.getElementById('now-time-display-date').textContent = formattedDate;
  document.getElementById('now-time-display-time').textContent = formattedTime;
}

setInterval(updateTime, 1000);
updateTime(); // 初始化时立即调用一次

const nextCard = document.querySelector('.next');
const prevCard = document.querySelector('.prev');

/**更新按钮的可见性 */
let currentIndex = 0; // 定义并初始化currentIndex
const totalCards = document.querySelectorAll('.card').length; // 获取卡片总数

// 更新按钮的可见性
function updateButtonVisibility() {
  const nextCard = document.querySelector('.next');
  const prevCard = document.querySelector('.prev');
  const submitButton = document.querySelector('.submit');
  
  if (currentIndex === 0) {
    prevCard.classList.add('hidden');
    nextCard.classList.remove('hidden');
    submitButton.classList.add('hidden');
  } else if (currentIndex === totalCards - 1) {
    prevCard.classList.remove('hidden');
    nextCard.classList.add('hidden');
    submitButton.classList.remove('hidden');
  } else {
    prevCard.classList.remove('hidden');
    nextCard.classList.remove('hidden');
    submitButton.classList.add('hidden');
  }
}

// 初始化按钮的可见性
updateButtonVisibility();

/**答题卡和左右箭头 */

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  const answerGrid = document.getElementById('answer-grid');
  const cardContainer = document.querySelector('.card-container');

  // 创建三列网格布局
  answerGrid.style.display = 'grid';
  answerGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
  answerGrid.style.gap = '10px';

  // 为每个题目创建一个小方块
  cards.forEach((card, index) => {
    const answerBox = document.createElement('div');
    answerBox.classList.add('answer-box');
    answerBox.dataset.index = index;
    answerGrid.appendChild(answerBox);

    // 监听小方块的点击事件
    answerBox.addEventListener('click', () => {
      const translateXValue = -index * 100;
      cardContainer.style.transform = `translateX(${translateXValue}%)`;
      currentIndex = index; // 更新当前索引
      updateButtonVisibility(); // 更新按钮的可见性
    });

    // 监听题目的表单操作
    const inputs = card.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        answerBox.classList.add('answered');
      });
      input.addEventListener('change', () => {
        answerBox.classList.add('answered');
      });
    });
  });

  const nextCard = document.querySelector('.next');
  const prevCard = document.querySelector('.prev');

  nextCard.addEventListener('click', () => {
    if (currentIndex < totalCards - 1) {
      let audioNow = document.querySelector(`#audio-question${currentIndex + 1}`);
      if ((audioNow !== null) && (!audioNow.paused)) audioNow.pause();
      currentIndex = (currentIndex + 1) % totalCards;
      const translateXValue = -currentIndex * 100;
      cardContainer.style.transform = `translateX(${translateXValue}%)`;
      updateButtonVisibility(); // 更新按钮的可见性
    }
  });

  prevCard.addEventListener('click', () => {
    if (currentIndex > 0) {
      let audioNow = document.querySelector(`#audio-question${currentIndex + 1}`);
      if ((audioNow !== null) && (!audioNow.paused)) audioNow.pause();
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      const translateXValue = -currentIndex * 100;
      cardContainer.style.transform = `translateX(${translateXValue}%)`;
      updateButtonVisibility(); // 更新按钮的可见性
    }
  });
});

/**星星评分 */
document.addEventListener('DOMContentLoaded', function() {
  var stars = document.querySelectorAll('.star-rating .star');
  var ratingDisplay = document.getElementById('rating-display');

  stars.forEach(function(star) {
    star.addEventListener('click', function() {
      // 移除其他星星的 active 类
      stars.forEach(function(s) {
        s.classList.remove('active');
      });
      // 添加 active 类到被点击的星星
      star.classList.add('active');

      // 更新评分显示
      // var score = star.getAttribute('data-score');
      // ratingDisplay.textContent = score;
    });
  });
});
