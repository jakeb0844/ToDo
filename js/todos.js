class Todos{
    constructor(list_element,form_element){

        this.list_element = list_element;
        this.form_element = form_element;
        this.input_field = $('form input[type=text]');
        this.auto_populate();
    }

    validate_field(){
        if(this.input_field.val().length > 0){
            return true;
        }

        return false;
    }

    add(msg){
        this.list_element.append(`
           <li class="hover:bg-indigo-500 rounded" onClick="todo.delete(this)">${this.input_field.val()}</li>
        `)
        this.clearText();
    }

    delete(el){
        $(el).remove();
    }

    update(){

    }

    clearText(){
        this.input_field.val('');
    }

    auto_populate(){
        let todos = ['Finish the apache config','Pick up groceries at 5','Talk to Robert about the Alumni site','Take Lucy to the vet at 2','Go to park with Blake'];
        
        for(let i =0; i < todos.length; i++){
            this.input_field.val(todos[i])
            this.add();
        }
    }

}