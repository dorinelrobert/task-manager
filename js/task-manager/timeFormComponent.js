export function timeFormComponent(submitHandler, title){
    let form, fieldset, legend, label, input, span, button;

    form = document.createElement('form');
    form.className = 'time-form';
    form.setAttribute('autocomplete', 'off');
        
        fieldset = document.createElement('fieldset');
            
            legend = document.createElement('legend');
            legend.innerText = title;
            fieldset.appendChild(legend);

            label = document.createElement('label');
                
                input = document.createElement('input');
                input.className = 'time-form__input';
                input.setAttribute('type', 'number');
                input.setAttribute('placeholder', '00');
                input.setAttribute('min', '0');
                input.setAttribute('max', '999');
                input.setAttribute('name', 'hours');
                label.appendChild(input);

                span = document.createElement('span');
                span.innerText = 'h';
                label.appendChild(span);

            fieldset.appendChild(label);

            label = document.createElement('label');

                input = document.createElement('input');
                input.className = 'time-form__input';
                input.setAttribute('type', 'number');
                input.setAttribute('placeholder', '00');
                input.setAttribute('min', '0');
                input.setAttribute('max', '59');
                input.setAttribute('name', 'minutes');
                label.appendChild(input);

                span = document.createElement('span');
                span.innerText = 'm';
                label.appendChild(span);

            fieldset.appendChild(label);

            button = document.createElement('button');
            button.className = 'btn btn--primary';
            button.setAttribute('type', 'submit');
            button.innerText = 'Save';
            fieldset.appendChild(button);

        form.appendChild(fieldset);

    form.addEventListener('submit', function(event){
        event.preventDefault();
        submitHandler(this);
    });

    return form;
}