/**延时处理下拉框显示和隐藏 */
let dropdownTimeout;
const dropdown = document.getElementById('test-system');
const dropdownTrigger = dropdown.parentElement;

dropdownTrigger.addEventListener('mouseenter', () => {
    clearTimeout(dropdownTimeout);
    dropdown.classList.add('show');
});

dropdownTrigger.addEventListener('mouseleave', () => {
    dropdownTimeout = setTimeout(() => {
        dropdown.classList.remove('show');
    }, 300); // 延时300毫秒
});

dropdown.addEventListener('mouseenter', () => {
    clearTimeout(dropdownTimeout);
});

dropdown.addEventListener('mouseleave', () => {
    dropdownTimeout = setTimeout(() => {
        dropdown.classList.remove('show');
    }, 300); // 延时300毫秒
});