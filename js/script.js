document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Logic ---
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            mainNav.classList.toggle('is-active');
        });
    }

    // --- Catalogue Page Logic ---
    const cataloguePage = document.querySelector('.catalogue-page');
    if (cataloguePage) {
        const mainImage = document.getElementById('main-image');
        const thumbnails = document.querySelectorAll('.thumbnail');

        // 1. Le clic sur la miniature met à jour la visionneuse
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const data = thumbnail.dataset;

                // Mettre à jour l'image principale
                mainImage.src = data.src;
                mainImage.alt = data.title;

                // Copier les données vers l'image principale pour le futur clic
                mainImage.dataset.src = data.src;
                mainImage.dataset.title = data.title;
                mainImage.dataset.dimension = data.dimension;
                mainImage.dataset.description = data.description;
                mainImage.dataset.price = data.price;

                // Mettre à jour la miniature active
                document.querySelector('.thumbnail.active').classList.remove('active');
                thumbnail.classList.add('active');
            });
        });

        // 2. Le clic sur l'image principale redirige vers la page de détail
        mainImage.addEventListener('click', () => {
            const data = mainImage.dataset;
            if (!data.src) return; // Ne rien faire si aucune donnée n'est présente

            const url = `detail.html?src=${encodeURIComponent(data.src)}&title=${encodeURIComponent(data.title)}&dimension=${encodeURIComponent(data.dimension)}&description=${encodeURIComponent(data.description)}&price=${encodeURIComponent(data.price)}`;
            
            window.location.href = url;
        });
        
        // Initialiser l'image principale avec les données de la miniature active au chargement
        const activeThumbnail = document.querySelector('.thumbnail.active');
        if (activeThumbnail) {
            const data = activeThumbnail.dataset;
            mainImage.dataset.src = data.src;
            mainImage.dataset.title = data.title;
            mainImage.dataset.dimension = data.dimension;
            mainImage.dataset.description = data.description;
            mainImage.dataset.price = data.price;
        }
    }

    // --- Detail Page Logic ---
    const detailPage = document.querySelector('.detail-page');
    if (detailPage) {
        const urlParams = new URLSearchParams(window.location.search);

        const src = urlParams.get('src');
        const title = urlParams.get('title');
        const dimension = urlParams.get('dimension');
        const description = urlParams.get('description');
        const price = urlParams.get('price');

        if (src) {
            document.getElementById('detail-image').src = src;
            document.getElementById('detail-image').alt = title;
        }
        if (title) {
            document.getElementById('detail-title').textContent = title;
            document.title = `${title} - Mon Site`;
        }
        if (dimension) {
            document.getElementById('detail-dimension').textContent = `Dimensions : ${dimension}`;
        }
        if (description) {
            document.getElementById('detail-description').textContent = description;
        }
        if (price) {
            document.getElementById('detail-price').textContent = `${price} €`;
        }
    }
});