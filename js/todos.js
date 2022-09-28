class Todos {
    constructor(list_element, form_element, history_list_element) {
        this.currentFileName = 'save.json';
        this.historyFileName = 'archive.json';
        this.list_element = list_element;
        this.history_list_element = history_list_element;
        this.form_element = form_element;
        this.input_field = $('input');
        //this.auto_populate();
        this.read(this.currentFileName);
        this.read(this.historyFileName);

    }

    validate_field() {

        if (this.input_field.val().length > 0) {
            return true;
        }

        return false;
    }

    add(msg, temp) {
        //console.log(msg)
        if (temp == "current") {
            if (msg == undefined) {
                this.list_element.append(`
                <li class="hover:bg-indigo-500 rounded" onClick="todo.delete(this)">${this.input_field.val()}</li>
             `)
            } else {
                this.list_element.append(`
                <li class="hover:bg-indigo-500 rounded" onClick="todo.delete(this)">${msg}</li>
             `)
            }
        }
        else {
            this.history_list_element.append(`
                <li class="hover:bg-indigo-500 rounded">${msg}</li>
             `)
        }


        this.clearText();
    }

    delete(el) {
        let text = $(el).text();
        console.log('text', text)
        $(el).remove();
        this.save(this.currentFileName);
        this.save(this.historyFileName, text);
        this.add(text,'history')
    }

    update() {

    }

    clearText() {
        this.input_field.val('');
    }

    auto_populate() {
        let todos = ['Finish the apache config', 'Pick up groceries at 5', 'Talk to Robert about the Alumni site', 'Take Lucy to the vet at 2', 'Go to park with Blake'];

        for (let i = 0; i < todos.length; i++) {
            this.input_field.val(todos[i])
            this.add();
        }
    }

    makeJson(temp, text = "") {

        if (temp == 'current') {
            let children = this.list_element.children();
            let json = '{';
            //console.log(children)
            if (children.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    let text = children[i].innerText;
                    if (i < children.length - 1) {
                        json += `"${i + 1}":"${text}",`
                    } else {
                        json += `"${i + 1}":"${text}"`
                    }

                }
                json += '}'
            } else {
                json = '';
            }

            //console.log(json)
            return json;
        }
        else {
            
            let children = this.history_list_element.children();
            console.log("len",children.length)
            let json = '{';
            //console.log(children)
            if (children.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    let text = children[i].innerText;
                    if (i < children.length - 1) {
                        json += `"${i + 1}":"${text}",`
                    } else {
                        json += `"${i + 1}":"${text}"`
                    }

                }
                json += `,"${children.length}":"${text}"}`
            } else {
                json = `{"1":"${text}"}`;
            }

            console.log(json)
            return json;
        }


    }

    populate(data, temp) {
        //console.log(data)
        if (data.length > 0) {
            if (temp == 'current') {
                let json = JSON.parse(data);
                //console.log(json)
                let len = Object.keys(json).length;

                for (let i = 0; i < len; i++) {
                    this.add(json[i + 1])
                }
            }
            else {
                let json = JSON.parse(data);
                console.log(json)
                let len = Object.keys(json).length;

                for (let i = 0; i < len; i++) {
                    this.add(json[i + 1],temp)
                }
            }

        }

    }

    read(filename) {
        $.get('/ToDo/api/ReadFile.php', { 'filename': filename }, function (filename, data) {
            console.log(data)
            if (data != "Error") {
                if (filename == this.currentFileName) {
                    console.log(filename)
                    this.populate(data,'current')
                }
                else {
                    console.log(filename)
                    this.populate(data, 'history')
                }

            }
        }.bind(this, filename))
    }

    save(filename, text = "") {
        let json;

        if (filename == this.currentFileName) {
            json = this.makeJson('current')
        }
        else {
            json = this.makeJson('history', text)
        }


        $.post("/ToDo/api/SaveToFile.php", {
            'filename': filename,
            'json': json
        }, function (data, status) {
            console.log(data)
        });
    }

}