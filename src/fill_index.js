window.addEventListener("load", function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const price = Number(urlParams.get('price'));
    const page = Number(urlParams.get('page'));
    let data = localStorage.getItem('data');
    if (data === null) {
        data = '[]'
    }
    data = JSON.parse(data);
    console.log(data);
    console.log(urlParams.get('price'));



    function addCake(name, description) {
        fetch("./../template/index_row.html")
            .then((response) => {
                return response.text()
            }).then((text) => {
                console.log(text);
                let cas = document.querySelector('.price-cake');
                text = text.replaceAll('{name}', name);
                text = text.replaceAll('{description}', description);
                cas.insertAdjacentHTML('afterend', text);
            }).catch((e) => console.error(e));
    }

    function getKeepNeedData() {
        data = data.filter((element) => {
            const priceStorage = Number(element['priceInput']);
            const pageStorage = Number(element['pageInput']);
            return priceStorage === price && pageStorage === page;
        });
        console.log(data);

    }

    function addPrice(priceData)
    {
        let price = new Intl.NumberFormat("ru", {style: "decimal"}).format(priceData);
        document.querySelector('.price-cake').innerHTML = price + ' Р./кг.';
    }

    addPrice(price);
    getKeepNeedData();
    for (let value of data) {
        addCake(value['nameInput'], value['descriptionInput']);
    }

});