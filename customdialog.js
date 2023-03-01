const alert_btn = document.getElementById ('alert');
const confirm_btn = document.getElementById ('confirm');
const prompt_btn = document.getElementById ('prompt');
const simple_prompt_btn = document.getElementById ('simple_prompt');

alert_btn.addEventListener ('click', () => {
    const custom_dialog = document.createElement ('dialog');

    const message = document.createElement ('p');
    message.textContent = 'Alert pressed!';
    custom_dialog.appendChild (message);

    const close_btn = document.createElement ('button');
    close_btn.textContent = 'Ok';
    custom_dialog.appendChild (close_btn);

    document.body.appendChild (custom_dialog);
    custom_dialog.showModal ();

    close_btn.addEventListener ('click', () => {
        custom_dialog.close ();
        document.body.removeChild (custom_dialog);
    });
});

confirm_btn.addEventListener ('click', () => {
    const custom_dialog = document.createElement ('dialog');

    const message = document.createElement ('p');
    message.textContent = 'Do you confirm this?';
    custom_dialog.appendChild (message);

    const cancel_btn = document.createElement ('button');
    cancel_btn.textContent = 'Cancel';
    custom_dialog.appendChild (cancel_btn);

    cancel_btn.style.margin= "0 10px 0 0";

    const ok_btn = document.createElement ('button');
    ok_btn.textContent = 'Ok';
    custom_dialog.appendChild (ok_btn);

    document.body.appendChild (custom_dialog);
    custom_dialog.showModal ();

    cancel_btn.addEventListener ('click', () => {
        const output_box = document.querySelector ('output');
        output_box.style.border = '5px double black';
        output_box.style.padding = '5px';
        output_box.innerText = `The value returned by the confirm method is: false`;
        custom_dialog.close ();
        document.body.removeChild (custom_dialog);
    });

    ok_btn.addEventListener ('click', () => {
        const output_box = document.querySelector ('output');
        output_box.style.border = '5px double black';
        output_box.style.padding = '5px';
        output_box.innerText = `The value returned by the confirm method is: true`;
        custom_dialog.close ();
        document.body.removeChild (custom_dialog);
    });
});

prompt_btn.addEventListener ('click', () => {
    const custom_dialog = document.createElement ('dialog');

    const message = document.createElement ('label');
    message.textContent = 'Enter your prompt';
    message.for = 'input';
    custom_dialog.appendChild (message);

    custom_dialog.appendChild (document.createElement ('br'));

    const user_input = document.createElement ('input');
    user_input.name = 'input';
    custom_dialog.appendChild (user_input);
    user_input.size = '80';

    custom_dialog.appendChild (document.createElement ('br'));

    const cancel_btn = document.createElement ('button');
    cancel_btn.textContent = 'Cancel';
    custom_dialog.appendChild (cancel_btn);

    cancel_btn.style.margin= "0 10px 0 0";

    const ok_btn = document.createElement ('button');
    ok_btn.textContent = 'Ok';
    custom_dialog.appendChild (ok_btn);

    document.body.appendChild (custom_dialog);
    custom_dialog.showModal ();

    cancel_btn.addEventListener ('click', () => {
        const output_box = document.querySelector ('output');
        output_box.style.border = '5px double black';
        output_box.style.padding = '5px';
        output_box.innerText = `User didn’t enter anything`;
        custom_dialog.close ();
        document.body.removeChild (custom_dialog);
    });

    ok_btn.addEventListener ('click', () => {
        const output_box = document.querySelector ('output');
        output_box.style.border = '5px double black';
        output_box.style.padding = '5px';

        if (user_input.value == "" || user_input.value == null) {
            output_box.innerHTML = `User didn’t enter anything`;
        }
        else {
            output_box.innerHTML = `The value returned by the prompt method is: ${user_input.value}`;
        }
        custom_dialog.close ();
        document.body.removeChild (custom_dialog);
    });
});

simple_prompt_btn.addEventListener ('click', () => {
    const custom_dialog = document.createElement ('dialog');

    const message = document.createElement ('label');
    message.textContent = 'Enter your prompt';
    message.for = 'input';
    custom_dialog.appendChild (message);

    custom_dialog.appendChild (document.createElement ('br'));

    const user_input = document.createElement ('input');
    user_input.name = 'input';
    custom_dialog.appendChild (user_input);
    user_input.size = '80';

    custom_dialog.appendChild (document.createElement ('br'));

    const cancel_btn = document.createElement ('button');
    cancel_btn.textContent = 'Cancel';
    custom_dialog.appendChild (cancel_btn);

    cancel_btn.style.margin= "0 10px 0 0";

    const ok_btn = document.createElement ('button');
    ok_btn.textContent = 'Ok';
    custom_dialog.appendChild (ok_btn);

    document.body.appendChild (custom_dialog);
    custom_dialog.showModal ();

    cancel_btn.addEventListener ('click', () => {
        const output_box = document.querySelector ('output');
        output_box.style.border = '5px double black';
        output_box.style.padding = '5px';
        output_box.innerText = `User didn’t enter anything`;
        custom_dialog.close ();
        document.body.removeChild (custom_dialog);
    });

    ok_btn.addEventListener ('click', () => {
        const output_box = document.querySelector ('output');
        output_box.style.border = '5px double black';
        output_box.style.padding = '5px';

        if (user_input.value == "" || user_input.value == null) {
            output_box.innerHTML = `User didn’t enter anything`;
        }
        else {
            output_box.innerHTML = `The value returned by the prompt method is: ${DOMPurify.sanitize (user_input.value)}`;
        }
        custom_dialog.close ();
        document.body.removeChild (custom_dialog);
    });
});


export {alert_btn, confirm_btn, prompt_btn, simple_prompt_btn};