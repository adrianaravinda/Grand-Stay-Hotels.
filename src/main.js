document.addEventListener('DOMContentLoaded', () => {

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    const modal = document.getElementById('menu-modal');
    if (modal) {
        const closeModalBtn = modal.querySelector('.close-btn');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        function closeModal() {
            modal.classList.remove('active');
        }
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
        const viewMenuBtns = document.querySelectorAll('.btn-link[data-menu]');
        if (viewMenuBtns.length > 0) {
            const menus = {
                bistro: { title: 'Azure Bistro Menu', items: ['French Onion Soup', 'Steak Frites', 'Crème Brûlée', 'Duck Confit'] },
                cafe: { title: 'The Garden Cafe Menu', items: ['Espresso & Cappuccino', 'Croissants', 'Gourmet Sandwiches', 'Fresh Tarts'] },
                lounge: { title: 'Skyline Lounge Menu', items: ['Classic Mojito', 'Spicy Tuna Rolls', 'Wagyu Beef Sliders', 'Cheese Platter'] }
            };

            viewMenuBtns.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    const menuKey = btn.dataset.menu;
                    const menuData = menus[menuKey];
                    
                    if (menuData) {
                        modalTitle.textContent = menuData.title;
                        modalBody.innerHTML = `<ul>${menuData.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
                        modal.classList.add('active');
                    }
                });
            });
        }
        const viewAdventureBtns = document.querySelectorAll('.adventure-btn[data-adventure]');
        if (viewAdventureBtns.length > 0) {
            const adventures = {
                diving: { title: 'Deep Sea Diving', details: 'Our certified instructors will guide you through vibrant coral reefs. All equipment is provided. Duration: 3 hours.' },
                hiking: { title: 'Mountain Peak Hiking', details: 'A guided 5-hour trek to the summit to witness a spectacular sunrise. Breakfast and water provided.' },
                safari: { title: 'National Park Safari', details: 'Embark on a half-day jeep safari to spot elephants, leopards, and exotic birds in their natural habitat.' }
            };

            viewAdventureBtns.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    const adventureKey = btn.dataset.adventure;
                    const adventureData = adventures[adventureKey];

                    if (adventureData) {
                        modalTitle.textContent = adventureData.title;
                        modalBody.innerHTML = `<p>${adventureData.details}</p>`;
                        modal.classList.add('active');
                    }
                });
            });
        }
    }
});