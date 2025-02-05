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
