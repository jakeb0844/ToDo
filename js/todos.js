class Todos {
    constructor(list_element, form_element) {

        this.list_element = list_element;
        this.form_element = form_element;
        this.input_field = $('input');
        //this.auto_populate();
        this.read();

    }

    validate_field() {

        if (this.input_field.val().length > 0) {
            return true;
        }

        return false;
    }

    add(msg) {
        //console.log(msg)
        if (msg == undefined) {
            this.list_element.append(`
            <li class="hover:bg-indigo-500 rounded" onClick="todo.delete(this)">${this.input_field.val()}</li>
         `)
        } else {
            this.list_element.append(`
            <li class="hover:bg-indigo-500 rounded" onClick="todo.delete(this)">${msg}</li>
         `)
        }

        this.clearText();
    }

    delete(el) {
        $(el).remove();
        this.save();
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

    makeJson() {
        let children = this.list_element.children();
        let json = '{';
        //console.log(children)
        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                let text = children[i].innerText;
                if (i < children.length - 1) {
                    json += `"${i+1}":"${text}",`
                } else {
                    json += `"${i+1}":"${text}"`
                }

            }
            json += '}'
        } else {
            json = '';
        }

        //console.log(json)
        return json;

    }

    populate(data) {
        //console.log(data)
        if (data.length > 0) {
            let json = JSON.parse(data);
            //console.log(json)
            let len = Object.keys(json).length;

            for (let i = 0; i < len; i++) {
                this.add(json[i + 1])
            }
        }

    }

    read() {
        $.get('/ToDo/api/ReadFile.php', function(data) {
            //console.log(data)
            if (data != "Error") {
                this.populate(data)
            }
        }.bind(this))
    }

    save() {
        let json = this.makeJson()

        $.post("/ToDo/api/SaveToFile.php", { 'json': json }, function(data, status) {
            console.log(data)
        });
    }

}