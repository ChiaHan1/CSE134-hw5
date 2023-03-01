window.addEventListener('DOMContentLoaded', async () => {
        const menu_btn = document.getElementById ('hamburger_menu');

        menu_btn.addEventListener ('click', () => {
            const navbar = document.getElementById ('hamburger_navbar');
            console.log (navbar.style.display);
            if (navbar.style.display !== 'block') {
                navbar.style.display = 'block';
            }
            else {
                navbar.style.display = 'none';
            }
        });
    
});