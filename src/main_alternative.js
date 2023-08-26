window.addEventListener("load", function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const nameCake = urlParams.get('name');

    const cakeInfo = getCurrentCake();

    let heading = document.querySelector('.heading');
    let infoProductsElement = document.querySelector('.info__products');
    let fillingElement = document.querySelector('.filling');
    addProducts();
    addFillings();

    heading.innerHTML = nameCake;

    const range = document.createRange();
    const blocks = document.querySelectorAll('.name_product');
    for (const el of blocks) {
        const text = el.childNodes[0];
        range.setStartBefore(text);
        range.setEndAfter(text);

        const clientRect = range.getBoundingClientRect();
        el.style.width = `${clientRect.width}px`;
    }
    let cake = document.querySelector('.heading')


    cake.addEventListener("click", () => {
        document.location.assign('alternative_info.html');
    });

    function addProducts() {
        if (!('typeCakes' in cakeInfo)) {
            return;
        }
        for (let info of cakeInfo['typeCakes']) {
            addProduct(info['descriptionType'], info['priceType']);
        }
    }

    function addProduct(description, price)
    {
        fetch('./../template/alternative_info_product.html')
            .then(function (response) {
                return response.text();
            }).then(function (text) {
                text = text.replaceAll('{heading}', description)
                text = text.replaceAll('{price}', price);
                infoProductsElement.insertAdjacentHTML('BeforeEnd', text);
            });

    }

    function addFilling(name)
    {
        fetch('./../template/alternative_name_filling.html')
            .then((response) => response.text())
            .then((text) => {
                text = text.replaceAll('{name-filling}', name)
                fillingElement.insertAdjacentHTML('BeforeEnd', text);
            });
    }

    function addFillings() {
        let fillingData = cakeInfo['filling'];
        if (typeof fillingData === 'undefined') {
            return;
        }
        let data = fillingData.split('/');
        console.log(data);
        let lengthData = data.length;
        let i = 0;
        let newElements = [];
        while (i < lengthData) {
            if (i + 1 === lengthData) {
                newElements.push([data[i]]);
            } else {
                newElements.push([
                    data[i],
                    data[i + 1]
                ]);
            }
            i += 2;
        }
        for (let newElement of newElements) {
            let name = newElement.join('/');
            addFilling(name);
        }

    }



    function getCurrentCake() {
        let dataStorage = localStorage.getItem('alternative');
        if (dataStorage === null)  {
            return [];
        }
        dataStorage = JSON.parse(dataStorage)
        dataStorage = dataStorage.find((element) => {
            return element['name'] === nameCake;
        });
        return dataStorage
    }

});
