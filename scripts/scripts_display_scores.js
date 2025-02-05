document.getElementById('sort-by-score').addEventListener('click', function() {
    sortTable(1); // 按得分排序
});

document.getElementById('sort-by-totaltime').addEventListener('click', function() {
    sortTable(2); // 按总用时排序
});

document.getElementById('sort-by-posttime').addEventListener('click', function() {
    sortTable(3); // 按提交时间排序
});

document.getElementById('clear-history').addEventListener('click', function() {
    if (confirm('确认要清空历史数据吗？')) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'clear_history.asp', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert('历史数据已清空');
                location.reload(); // 刷新页面
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                alert('清空历史数据失败');
            }
        };
        xhr.send();
    }
});

function sortTable(columnIndex) {
    const table = document.getElementById('score-table');
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    rows.sort((a, b) => {
        const cellA = a.getElementsByTagName('td')[columnIndex];
        const cellB = b.getElementsByTagName('td')[columnIndex];

        if (!cellA || !cellB) {
            return 0; // 如果单元格不存在，则认为它们相等
        }

        const valueA = cellA.textContent.trim();
        const valueB = cellB.textContent.trim();

        if (columnIndex === 1) { // 按得分排序
            return parseFloat(valueB) - parseFloat(valueA); // 降序排序
        } else if (columnIndex === 2) { // 按总用时排序
            return valueA.localeCompare(valueB);
        } else if (columnIndex === 3) { // 按提交时间排序
            return new Date(valueA) - new Date(valueB);
        }
    });

    // 清空表格并重新插入排序后的行
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    rows.forEach(row => tbody.appendChild(row));
}

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