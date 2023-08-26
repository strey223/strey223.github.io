window.addEventListener("load", function() {
    /*localStorage.setItem(1, JSON.stringify({
        'wq': 12,
        'as': [1, 2, 3],
    }));*/
    let table = document.querySelector('table');
    let buttonSave = document.querySelector('.save')
    let classesCall = {
        'open': openTable,
        'delete': deleteRow,
    }
    viewRow();


    table.addEventListener('click', (e) => {
        let target = e.target;
        console.log(target);
        console.log(target.className);
        let classes = target.className.split(' ');
        classes.forEach((element) => {
            if (element in classesCall) {
                classesCall[element](e);
            }
        });
    });

    /*let openFile = document.querySelectorAll('.open');
    openFile.addEventListener('click', () => {
        console.log('hello');
        document.location.assign('alternative_cake.html');
        document.location.assign('')
    });
    let save = document.querySelectorAll('.save');
    save.addEventListener('click', () => {

    });*/

    let saveElement = document.querySelector('.save');
    let add_element = document.querySelector('.add_element')
    saveElement.addEventListener('click', save);
    add_element.addEventListener('click', add_row);
    function save() {
        let dataStorage = [];


        function handlerTr(trElement) {

            let dataInfo = {
                'nameInput': trElement.querySelector('.name').value,
                'priceInput': trElement.querySelector('.price').value,
                'descriptionInput': trElement.querySelector('.description').value,
                'pageInput': trElement.querySelector('.page').value,
            };
            dataStorage.push(dataInfo);

            localStorage.setItem('data', JSON.stringify(dataStorage))
        }

        console.log('save');
        let query = document.querySelectorAll('tbody tr');
        query.forEach(handlerTr)
    }

    function viewRow() {
        let jsonData = localStorage.getItem('data');
        let data = JSON.parse(jsonData);
        if (data === null) {
            return;
        }
        console.log(data);
        for (let value of data) {
            add_row_element(value['nameInput'], value['priceInput'], value['descriptionInput'], value['pageInput']);
        }
    }

    /**
     *
     * @param {Event} element
     */
    function deleteRow(element) {
        console.log('deleteRow');
        console.log(element.target);
        let trElement = element.target.closest('tr');
        console.log(trElement);
        trElement.remove();
        save();
    }

    /**
     *
     * @param {Event} element
     */
    function openTable(element) {
        let tr = element.target.closest('tr');
        let price = tr.querySelector('.price').value;
        let page = tr.querySelector('.page').value;

        let params = new URLSearchParams();

// Add a third parameter.

        params.set("price", price);
        params.set("page", page);


        document.location.assign('index.html?' + params.toString());
    }

    function add_row()
    {
        add_row_element('', 0, '', 1);
    }

    function add_row_element(name, price, description, page) {
        let tbody = document.querySelector('tbody');
        fetch("./../template/row.html")
            .then((response) => {
                return response.text()
            })
            .then((text) => {
                let tbody = document.querySelector('tbody')
                text = text.replace('{name}', name);
                text = text.replace('{description}', description);
                text = text.replace('{price}', price);
                text = text.replace('{page}', page);
                tbody.insertAdjacentHTML('beforeEnd', text);
            })
            .catch((e) => console.error(e));
    }

});