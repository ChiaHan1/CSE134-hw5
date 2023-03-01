window.addEventListener('DOMContentLoaded', () => {
    document.querySelector ('*').style.backgroundColor = 'rgba(172, 222, 176, .4)';

    const h1 = document.querySelector ('h1');
    h1.style.textAlign = 'center';
    h1.style.color = 'darkgreen';
    h1.style.fontSize = '48px';

    const add_div = document.getElementById ('add_div');
    add_div.style.textAlign = 'center';
    
    const add_btn = document.getElementById ('add');
    add_btn.style.backgroundColor = 'rgba(172, 222, 176, .2)';
    add_btn.style.fontSize = '21px';
    add_btn.style.color = 'green';
    add_btn.onmouseover = function() {add_btn.style.boxShadow = '1px 1px 2px green, 0 0 25px lightgreen, 0 0 20px darkgreen';};
    add_btn.onmouseleave = function() {add_btn.style.boxShadow = '';};

    const empty = document.getElementById ('empty');
    empty.style.textAlign = 'center';
    empty.style.fontSize = '18px';
    empty.style.color = 'darkgreen';

    const main = document.querySelector ('main');
    main.style.display = 'flex';
    main.style.flexDirection = 'row';
    main.style.flexWrap = 'wrap';
    main.style.justifyContent = 'center';

});