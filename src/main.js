window.onload = function() {
    const range = document.createRange();
    const blocks = document.querySelectorAll('.name_product');

    for (const el of blocks) {
        const text = el.childNodes[0];
        range.setStartBefore(text);
        range.setEndAfter(text);

        const clientRect = range.getBoundingClientRect();
        el.style.width = `${clientRect.width}px`;
    }
    let cake = document.getElementById('heading')

    cake.addEventListener("click", () => {
        document.location.assign('https://strey223.github.io/static/html/alternative_cake.html');
    });
}
