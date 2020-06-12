export function editFormComponent(taskProp, classProp, placeholder, updateHandler){
    let formContainer, content, form, textarea, button;
    
    function grow(el){
		el.style.height = "5px";
	    el.style.height = (el.scrollHeight)+"px";
    }
    

    formContainer = document.createElement('div');
    formContainer.className = 'editable ' + classProp;
        
        content = document.createElement('div');
        content.className = 'editable__text';
        content.textContent = taskProp || placeholder;

        content.addEventListener('click', function(){
            formContainer.classList.add('editable__focus');
            grow(textarea);
            textarea.focus();
        });

        formContainer.appendChild(content);

        form = document.createElement('form');
        form.className = 'editable__form';
        form.addEventListener('submit', function(event){
            event.preventDefault();
            updateHandler(form);
        });

            // textarea
            textarea = document.createElement('textarea');
            textarea.className = 'editable__field';
            textarea.setAttribute('name', 'editValue');
            textarea.setAttribute('placeholder', placeholder);
            textarea.value = taskProp;
            
            
            document.addEventListener('click', function(event){
                if(!formContainer.contains(event.target) ){
                    formContainer.classList.remove('editable__focus');
                    textarea.value = taskProp;
                }
            });
            

            textarea.addEventListener('input', function(){
				grow(textarea);
			});

            form.appendChild(textarea);

            // button
            button = document.createElement('button');
            button.className = 'editable__btn btn btn--primary';
            button.setAttribute('type', 'submit');
            button.innerText = 'Save';
            form.appendChild(button);
        
        formContainer.appendChild(form);

    return formContainer;
}