/**向下滚动隐藏导航栏，向上滚动显示导航栏 */
let lastScrollY = 0;
let ticking = false;

function updateNavbar() {
    var currentScrollY = window.scrollY;
    var navbar = document.getElementById('main-nav');
    if (currentScrollY > lastScrollY && currentScrollY > 0) {
        navbar.classList.add('hidden');
    } else if (currentScrollY < lastScrollY) {
        navbar.classList.remove('hidden');
    }
    lastScrollY = currentScrollY < 0 ? 0 : currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

/**课程卡片随机颜色 */
function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}
function setRandomColor() {
    const courseCards = document.querySelectorAll('.course-card');
    for (const courseCard of courseCards) {
        if (courseCard) {
          const randomColor = getRandomColor();
          courseCard.style.backgroundColor = randomColor;
        }
    }
}
setRandomColor();

/**翻牌子 */
let cardleft = document.querySelector("#cardleft");
// cardleft.addEventListener("click", () => {cardleft.classList.add('flip-vertical-left')});

/**返回顶部 */

// 当用户滚动到指定位置时，显示返回顶部按钮
window.addEventListener("scroll", () => {scrollFunction()});
let back_to_top = document.getElementById("back-to-top");
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    back_to_top.classList.add("show");
  } else {
    back_to_top.classList.remove("show");
  }
}
// 点击按钮返回顶部
back_to_top.addEventListener("click", () => {window.scrollTo({top: 0, behavior: 'smooth'})});

/**随机格言 */
footer_motto = document.getElementById('footer-motto');
function fetchQuote() {
    fetch("jsons/quotes.json")
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        footer_motto.innerText = data[randomIndex];
      })
      .catch(error => {
        console.error('Error:', error);
        footer_motto.innerText = '加载失败';
      });
  }
fetchQuote();
