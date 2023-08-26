window.addEventListener('load', () => {
    let addCakeElement = document.querySelector('.add_cake');
    let blockCake = document.querySelector('.cake-div');
    let saveElement = document.querySelector('.save');

    let storageCake = localStorage.getItem('alternative');
    if (storageCake === null) {
        storageCake = '[]';
    }

    saveElement.addEventListener('click', save);
    storageCake = JSON.parse(storageCake);
    console.log(storageCake);

    fillElements();
    const events = {
        'add_type_cake': addTypeCakeEvent,
        'open': open,
    };
    addCakeElement.addEventListener('click', () => {
        addCake('', '');
    });


    blockCake.addEventListener('click', function (event) {
        let target = event.target;

        if (target.className in events) {
            events[target.className](target);
        }
    });

    function addCake(name, filling, types = []) {
        fetch('./../template/alternative_row.html')
            .then((response) => {
                return response.text();
            }).then((text) => {
                console.log(text);
                text = text.replaceAll('{name}', name);
                text = text.replaceAll('{filling}', filling);
                let cakeBlock = document.querySelector('.cake-div');
                cakeBlock.insertAdjacentHTML('beforeEnd', text);
                if (types !== []) {
                    fillTypes(cakeBlock.lastChild, types);
                }
            }).catch((e) => console.error(e));
    }

    /**
     *
     * @param {Element} element
     * @param descriptionType
     * @param price
     */
    function addTypeCake(element, descriptionType, price)
    {
        fetch('./../template/type_cake.html')
            .then((response) => response.text())
            .then((text) => {
                console.log(text);
                text = text.replaceAll('{description-type}', descriptionType);
                text = text.replaceAll('{price}', price);
                element.insertAdjacentHTML('beforeEnd', text);
            });
    }

    function addTypeCakeEvent(element)
    {
        let elementTypeCake = element.closest('.alternative-cake').querySelector('.div_type_cakes');
        addTypeCake(elementTypeCake, '', 0)

    }

    function save()
    {
        let cakes = document.querySelectorAll('.cake-div .alternative-cake');
        let dataElements = []
        for (const cake of cakes) {
            let recordInfo = {
                'name': cake.querySelector('input.name').value,
                'filling': cake.querySelector('.filling-input').value,
                'typeCakes': getTypeCakes(cake)
            };
            dataElements.push(recordInfo);
        }
        localStorage.setItem('alternative', JSON.stringify(dataElements));
    }

    /**
     *
     * @param {Element} element
     */
    function getTypeCakes(element)
    {
        let typeCakes = element.querySelectorAll('.div-type-cake');
        let dataElements = [];
        for (const typeCake of typeCakes) {

            let dataElement = {
                'descriptionType': typeCake.querySelector('.description-type').value,
                'priceType': typeCake.querySelector('.price').value,
            };

            dataElements.push(dataElement);
        }
        return dataElements;
    }

    function fillElements()
    {
        for (let value of storageCake) {
            addCake(value['name'], value['filling'], value['typeCakes']);
        }
    }

    /**
     *
     * @param {Element} element
     * @param {Array} types
     */
    function fillTypes(element, types)
    {
        for (let value of types) {
            addTypeCake(element, value['descriptionType'], value['priceType']);
        }
    }

    function open(element) {
        let params = new URLSearchParams();
        let div = element.closest('.alternative-cake');
        div.querySelector('.name').value;

        params.set('name', div.querySelector('.name').value);

        document.location.assign('alternative_cake.html?' + params);
    }

});