// Hamburger Menu Toggle
const hamburgerMenu = document.getElementById('hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Navigation Links
const navLinks = document.querySelectorAll('.nav-menu a.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryHash = link.getAttribute('href');
        window.location.hash = categoryHash;

        // Update active class
        updateActiveNavLink(categoryHash);

        // Load posts for the selected category
        loadCategoryPosts(categoryHash);
    });
});

// Function to update the active navigation link
function updateActiveNavLink(hash) {
    navLinks.forEach(link => {
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Handle Hash Change
window.addEventListener('hashchange', () => {
    const hash = window.location.hash || '#/';
    updateActiveNavLink(hash);
    loadCategoryPosts(hash);
});

// On initial load
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash || '#/';
    updateActiveNavLink(hash);
    loadCategoryPosts(hash);
});

// Sample Data (Dummy Posts with Categories)
const categories = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo', 'buenas-noches'];
const samplePosts = [];

// Generate dummy posts with categories
for (let i = 1; i <= 30; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    samplePosts.push({
        image: `https://via.placeholder.com/1000x1500.png?text=Imagen+${i}`,
        text: `Este es el texto de la publicación número ${i} en la categoría ${randomCategory}. ¡Buenos días!`,
        category: randomCategory
    });
}

// Load Posts Function
const postsContainer = document.getElementById('posts-container');
let postsLoaded = 0;
const postsPerPage = 9;
let currentPosts = [];

function loadCategoryPosts(categoryHash) {
    // Clear existing posts
    postsContainer.innerHTML = '';
    postsLoaded = 0; // Reset posts loaded count

    // Convert hash to category
    let category = categoryHash === '#/' ? 'home' : categoryHash.replace('#/', '');

    // Filter posts based on category
    if (category === 'home') {
        currentPosts = samplePosts;
    } else {
        currentPosts = samplePosts.filter(post => post.category === category);
    }

    // Load initial posts
    loadMorePosts();
}

function loadMorePosts() {
    const postsToLoad = currentPosts.slice(postsLoaded, postsLoaded + postsPerPage);
    postsToLoad.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';

        postCard.innerHTML = `
            <img src="${post.image}" alt="Post Image">
            <div class="post-content">
                <p>${post.text}</p>
                <div class="post-actions">
                    <div>
                        <button class="copy-button">Copiar Texto</button>
                        <button class="download-button">Descargar Imagen</button>
                    </div>
                    <div>
                        <button class="emoji-button">❤️</button>
                        <button class="emoji-button">👍</button>
                    </div>
                </div>
            </div>
        `;
        postsContainer.appendChild(postCard);
    });
    postsLoaded += postsPerPage;

    // Show or hide load more button
    if (postsLoaded >= currentPosts.length) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'block';
    }
}

// Load more posts on button click
const loadMoreButton = document.getElementById('load-more');
loadMoreButton.addEventListener('click', loadMorePosts);

// Copy text to clipboard
postsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-button')) {
        const text = e.target.closest('.post-content').querySelector('p').innerText;
        navigator.clipboard.writeText(text).then(() => {
            alert('Texto copiado al portapapeles!');
        });
    }
});

// Download image
postsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('download-button')) {
        const imageSrc = e.target.closest('.post-card').querySelector('img').src;
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = `imagen-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

// Emoji button animations
postsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('emoji-button')) {
        e.target.classList.add('animate');
        setTimeout(() => {
            e.target.classList.remove('animate');
        }, 300);
    }
});

// Submit Post Modal Logic
const submitPostLink = document.getElementById('submit-post-link');
const submitPostModal = document.getElementById('submit-post-modal');
const closeModalButton = document.getElementById('close-modal');
const submitPostForm = document.getElementById('submit-post-form');

submitPostLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Check if user is logged in
    // For now, we'll assume the user is not logged in
    // You can implement Firebase Authentication here
    const isLoggedIn = false; // Replace with actual authentication check

    if (isLoggedIn) {
        // Show the submit post modal
        submitPostModal.style.display = 'block';
    } else {
        // Redirect to login page or show login prompt
        alert('Por favor, inicie sesión para enviar una publicación.');
    }
});

closeModalButton.addEventListener('click', () => {
    submitPostModal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target == submitPostModal) {
        submitPostModal.style.display = 'none';
    }
});

// Handle form submission
submitPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Implement form submission logic here
    // Upload image to Firebase Storage
    // Save post data to Firebase Firestore
    alert('Publicación enviada con éxito!');
    submitPostModal.style.display = 'none';
});
