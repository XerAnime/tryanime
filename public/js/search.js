//search.js
document.addEventListener("DOMContentLoaded", function() {
    function performSearch(query) {

        const searchResultsContainer = document.getElementById('search-results-container');
        searchResultsContainer.innerHTML = '';
    
        const loaderBar = document.getElementById('loader-bar');
        loaderBar.style.display = 'block';
    
        fetch(`https://api.anime-dex.workers.dev/search/${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                loaderBar.style.display = 'none';
    
                if (data.results && data.results.length > 0) {
                    document.getElementById('search').style.display = 'block';
    
                    displaySearchResults(data.results);
                } else {
                    document.getElementById('search').style.display = 'none';
    
                    displayNoResultsMessage(searchResultsContainer);
                }
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
                loaderBar.style.display = 'none';
            });
    }
    

    function displaySearchResults(results) {
        const searchResultsContainer = document.getElementById('search-results-container');
        results.forEach(anime => {
            const animeItem = document.createElement('div');
            animeItem.classList.add('anime-item');

            const title = document.createElement('p');
            title.textContent = anime.title;

            const image = document.createElement('img');
            image.src = anime.img;
            image.alt = anime.title;
            image.classList.add('anime-image');

            const link = document.createElement('a');
            link.href = '#'; 

            link.addEventListener('click', function() {
                const encodedAnimeName = encodeURIComponent(anime.title);
                window.location.href = `episode/episode.html?anime=${encodedAnimeName}`;
            });

            link.appendChild(image);

            animeItem.appendChild(link);
            animeItem.appendChild(title);
            searchResultsContainer.appendChild(animeItem);
        });
    }

    function displayNoResultsMessage(container) {
        container.innerHTML = '';

        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No results found.';
        noResultsMessage.style.color = 'white';
        noResultsMessage.style.textAlign = 'center'; 

        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container'); 
        messageContainer.appendChild(noResultsMessage);
        container.appendChild(messageContainer);
    }

   
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');

    const searchInput = document.getElementById('search-input');
    searchInput.value = query || ''; 
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const query = searchInput.value.trim();
            if (query !== '') {
                performSearch(query);
            }
        }
    });

    if (query) {
        performSearch(query);
    }
});


let creator = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⢶⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⡀⠀⠀⠀⢸⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠺⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⠈⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣤⣤⣤⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢶⣿⣿⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣿⣿⣿⣿⡿⠋⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⡟⠁⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣿⣿⣿⣿⣟⡀⠀⣿⣿⣿⢫⣿⣿⡿⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣥⣤⣶⣶⡶⠆
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⢤⣤⣤⣿⣿⣿⣿⣟⢻⡄⣿⣿⠁⣼⡿⠋⠀⣼⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠋⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢿⣿⣿⢹⠀⠁⢱⠘⠇⢀⣋⣤⣤⡄⠉⢠⣿⣿⣿⣿⣿⣿⣿⠿⠛⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⠤⠤⠤⠒⠒⠒⠚⠻⢿⡜⠀⠇⠀⠀⢀⠁⠈⢡⠀⠀⠀⠛⠉⠈⣿⣿⣿⣿⠷⠒⠀⠀⠀⠀⠀⠀⠀
⠀⡤⠴⠒⠒⠒⠒⢻⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⡇⠁⠀⣘⠀⠀⠈⠀⠠⢈⠀⠀⠀⠀⢀⡼⠿⡏⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢰⡆⠀⡀⡀⠀⠀⣸⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⢠⠁⠘⢄⠱⢶⠶⠒⠒⡒⠃⣀⣠⠔⠊⠀⢠⢃⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠻⢇⣀⣧⠃⢀⡰⠿⠿⠿⠿⠤⠤⠤⠤⠤⢤⡤⠃⠀⠀⠈⣏⠳⢶⣒⣒⡪⠝⠋⠁⠀⠀⣴⡕⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠙⠒⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢼⣤⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⣸⣻⣭⡉⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠂⠀⣻⠗⠊⠉⠉⠉⠉⠒⢦⣤⣤⣤⣶⣶⡶⠿⣷⠲⢆⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡎⠀⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⢳⣀⡀⠀⠀⠀⠀⠀⠈⢯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣶⣆⠀⠀⢣⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⡿⡄⣀⣀⣤⣦⠄⠀⠀⠀⠀⠀⠀⡇⠈⠙⢿⡿⠋⠁⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⡿⢁⡿⡼⠀⠀⠉⠙⠒⠀⠀⠀⠀⠀⠀⣼⣄⡀⠀⠈⠁⠀⠀⠀⢀⡜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⡿⠀⣾⣇⠙⢄⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⡁⠀⠛⠷⠀⠀⠀⢀⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⡇⠀⣿⣿⣷⣾⡷⠒⠲⠤⠴⢶⣾⣿⣤⡽⠛⠢⠤⠤⠤⠤⠖⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡇⠀⠙⠻⠛⠉⠀⠀⠀⠀⠀⠘⠿⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣷⣦⣤⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⢿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠛⠻⠿⠟⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

console.log(creator);