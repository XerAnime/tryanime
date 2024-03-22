//script.js
let currentPage = 1;
const animeLimit = 14; 
let currentSlide = 0;
let currentPageNumber = document.getElementById("currentPageNumber"); 
currentPageNumber.textContent = currentPage; 
const totalSlides = 4; 
document.addEventListener("DOMContentLoaded", function () {
    fetchAnime(currentPage);
    fetchRecentAnime();
    fetchUpcomingAnime();
});

//Search function
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const query = searchInput.value.trim();
            if (query !== '') {
                searchAnime(query);
            }
        }
    });
});




function searchAnime(query) {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';



    const encodedQuery = encodeURIComponent(query);
    fetch(`https://api.anime-dex.workers.dev/search/${encodedQuery}`)
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';
            const searchParams = new URLSearchParams();
            searchParams.append('query', query);
            searchParams.append('results', JSON.stringify(data.results));
            window.location.href = `search.html?${searchParams.toString()}`;
        })
        .catch(error => {
            loader.style.display = 'none';

            console.error('Error fetching search results:', error);
            alert('Error fetching search results. Please try again later.');
        });
}


//popular function
function fetchAnime(pageNumber) {
    document.querySelector('.popular-text').style.display = 'none';
document.querySelector('.upcoming-text').style.display = 'none';
document.querySelector('.recent-text').style.display = 'none';
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; 

    const animeContainer = document.getElementById('anime-container');
    animeContainer.innerHTML = ''; 
    loader.style.display = 'block';

    fetch(`https://api.anime-dex.workers.dev/gogoPopular/${pageNumber}`)
        .then(response => response.json())
        .then(data => {
            let animeCount = 0; 
            data.results.forEach(anime => {
                if (animeCount < animeLimit) { 
                    const animeItem = document.createElement('div');
                    animeItem.classList.add('anime-item');

                    const title = document.createElement('p');
                    title.textContent = `Name: ${anime.title} \n`;

                    const releaseDate = document.createElement('p'); 
                    releaseDate.textContent = ` Release Date: ${anime.releaseDate}`; 

                    const image = document.createElement('img');
                    image.src = anime.image;
                    image.alt = anime.title;
                    image.classList.add('anime-image');

                    const link = document.createElement('a');
                    link.href = '#'; 
                    link.addEventListener('click', function () {
                        viewEpisodes(anime.title); 
                    });

                    link.appendChild(image);

                    animeItem.appendChild(link);
                    animeItem.appendChild(title);
                    animeItem.appendChild(releaseDate); 
                    animeContainer.appendChild(animeItem);

                    animeCount++; 
                } else {
                    return; 
                }
            });

            loader.style.display = 'none'; 
            document.querySelector('.popular-text').style.display = 'block';
document.querySelector('.upcoming-text').style.display = 'block';
document.querySelector('.recent-text').style.display = 'block';

        })
        .catch(error => {
            console.error('Error fetching data:', error);
            loader.style.display = 'none';
        });

    const animeTitles = document.querySelectorAll('.anime-title');
    animeTitles.forEach(title => {
        title.style.color = '#fff'; 
    });
    currentPageNumber.textContent = currentPage;
}

function fetchRecentAnime() {
    const recentAnimeContainer = document.querySelector('.recent-anime-container');
    let currentPage = 1;

    function fetchData(page) {
        fetch(`https://api.anime-dex.workers.dev/api/recent/${page}`)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(anime => {
                    const recentAnimeItem = document.createElement('div');
                    recentAnimeItem.classList.add('recent-anime-item');

                    const image = document.createElement('img');
                    image.src = anime.image;
                    image.alt = anime.title;

                    const title = document.createElement('p');
                    title.textContent = `${anime.title} - Episode ${anime.episode}`;

                    recentAnimeItem.appendChild(image);
                    recentAnimeItem.appendChild(title);

                    recentAnimeContainer.appendChild(recentAnimeItem);
                    recentAnimeItem.addEventListener('click', function () {
                        viewEpisodes(anime.title);
                    });
                });
            })
            .catch(error => console.error('Error fetching recent anime:', error));
    }

    fetchData(currentPage);
    recentAnimeContainer.addEventListener('scroll', () => {
        if (recentAnimeContainer.scrollLeft + recentAnimeContainer.clientWidth >= recentAnimeContainer.scrollWidth) {
    
            currentPage++;
            fetchData(currentPage);
        }
    });
    function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }
}


function enableSwipe(containerSelector) {
    const container = document.querySelector(containerSelector);
    let startX, startY, distX, distY;
    let threshold = 50; 

    container.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    });

    container.addEventListener('touchmove', e => {
        if (!startX || !startY) return;

        const touch = e.touches[0];
        distX = touch.clientX - startX;
        distY = touch.clientY - startY;

        if (Math.abs(distX) > threshold && Math.abs(distX) > Math.abs(distY)) {
            e.preventDefault();
        } else {
            startX = null;
            startY = null;
            distX = 0;
            distY = 0;
        }
    });

    container.addEventListener('touchend', e => {
        if (!startX || !startY) return;

        if (Math.abs(distX) > threshold && Math.abs(distX) > Math.abs(distY)) {
            if (distX > 0) {
                previousSlide();
            } else {
                nextSlide();
            }
        } else {
            const targetElement = e.changedTouches[0].target;
            if (targetElement.tagName === 'IMG') {
                const animeTitle = targetElement.alt;
                viewEpisodes(animeTitle);
            }
        }

        startX = null;
        startY = null;
        distX = 0;
        distY = 0;
    });
}
fetchRecentAnime();


function showSlide(slideIndex) {
    const slideContainer = document.getElementById('slide');
    slideContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function nextPage() {
    currentPage++;
    fetchAnime(currentPage);
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchAnime(currentPage);
    } 
}

function viewEpisodes(animeName) {
    const encodedAnimeName = encodeURIComponent(animeName);
    window.location.href = `episode/episode.html?anime=${encodedAnimeName}`; 
}

const menuBtn = document.querySelector(".menu-icon span");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const items = document.querySelector(".nav-items");
const form = document.querySelector("form");
const body = document.body; 


menuBtn.onclick = () => {
  items.classList.add("active");
  menuBtn.classList.add("hide");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
  body.classList.add("nav-active"); 
}

cancelBtn.onclick = () => {
  items.classList.remove("active");
  menuBtn.classList.remove("hide");
  searchBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  form.classList.remove("active");
  cancelBtn.style.color = "#ff3d00";
  body.classList.remove("nav-active");
}

searchBtn.onclick = () => {
  form.classList.add("active");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
  body.classList.add("nav-active"); 
}
function fetchUpcomingAnime() {
    const upcomingContainer = document.getElementById('upcoming-anime-container');
    let currentPage = 1;

    function fetchData(page) {
        fetch(`https://api.anime-dex.workers.dev/upcoming/${page}`)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(anime => {
                    const upcomingItem = document.createElement('div');
                    upcomingItem.classList.add('upcoming-anime-item');
                    const image = document.createElement('img');
                    image.src = anime.media.coverImage.extraLarge;
                    image.alt = anime.media.title.userPreferred;

                    const title = document.createElement('p');
                    title.textContent = anime.media.title.userPreferred.length > 30 ? anime.media.title.userPreferred.slice(0, 30) + '...' : anime.media.title.userPreferred;
                    title.style.display = 'flex';
                    title.style.alignItems = 'center';

                    const airingDate = document.createElement('p');
                    airingDate.textContent = `Date: ${new Date(anime.airingAt * 1000).toLocaleDateString()}`;

                    const genres = document.createElement('p');
                    genres.textContent = anime.media.genres.length > 0 ? `Genre: ${anime.media.genres[0]}` : 'Genre: Not specified';

                    upcomingItem.appendChild(image);
                    upcomingItem.appendChild(title);
                    upcomingItem.appendChild(airingDate);
                    upcomingItem.appendChild(genres);

                    upcomingContainer.appendChild(upcomingItem);
                });
            })
            .catch(error => console.error('Error fetching upcoming anime:', error));
    }

    fetchData(currentPage);
     upcomingContainer.addEventListener('scroll', () => {
        if (upcomingContainer.scrollLeft + upcomingContainer.clientWidth >= upcomingContainer.scrollWidth) {
            currentPage++;
            fetchData(currentPage);
        }
    });
    upcomingContainer.addEventListener('scroll', () => {
        if (isMobileDevice() && upcomingContainer.scrollLeft + upcomingContainer.clientWidth >= upcomingContainer.scrollWidth) {
            currentPage++;
            fetchData(currentPage);
        }
    });

    upcomingContainer.addEventListener('touchend', () => {
        if (isMobileDevice() && upcomingContainer.scrollLeft + upcomingContainer.clientWidth >= upcomingContainer.scrollWidth) {
            currentPage++;
            fetchData(currentPage);
        }
    });

    function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }
}
fetchUpcomingAnime();

const rickbotArt = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⣶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣷⡒⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣆⠙⡄⠀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤⣤⣤⣤⣤⣤⣤⣤⠤⢄⡀⠀⠀⣿⣿⣿⣿⣿⣿⡆⠘⡄⠀⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣿⣿⣿⣿⣿⣿⣿⣦⡈⠒⢄⢸⣿⣿⣿⣿⣿⣿⡀⠱⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣦⠀⠱⣿⣿⣿⣿⣿⣿⣇⠀⢃⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣿⣿⣿⣿⣷⡄⣹⣿⣿⣿⣿⣿⣿⣶⣾⣿⣶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣶⣿⣭⣍⡉⠙⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡷⢂⣓⣶⣶⣶⣶⣤⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⠟⢀⣴⢿⣿⣿⣿⠟⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠋⠉⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⠤⠤⠤⠙⣻⣿⣿⣿⣿⣿⣿⣾⣿⣿⡏⣠⠟⡉⣾⣿⣿⠋⡠⠊⣿⡟⣹⣿⢿⣿⣿⣿⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣶⣤⣭⣤⣼⣿⢛⣿⣿⣿⣿⣻⣿⣿⠇⠐⢀⣿⣿⡷⠋⠀⢠⣿⣺⣿⣿⢺⣿⣋⣉⣉⣩⣴⣶⣤⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠻⠿⣿⣿⣿⣇⢻⣿⣿⡿⠿⣿⣯⡀⠀⢸⣿⠋⢀⣠⣶⠿⠿⢿⡿⠈⣾⣿⣿⣿⣿⡿⠿⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⢧⡸⣿⣿⣿⠀⠃⠻⠟⢦⢾⢣⠶⠿⠏⠀⠰⠀⣼⡇⣸⣿⣿⠟⠉⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣾⣶⣽⣿⡟⠓⠒⠀⠀⡀⠀⠠⠤⠬⠉⠁⣰⣥⣾⣿⣿⣶⣶⣷⡶⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠹⠟⣿⣿⡄⠀⠀⠠⡇⠀⠀⠀⠀⠀⢠⡟⠛⠛⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠋⠹⣷⣄⠀⠐⣊⣀⠀⠀⢀⡴⠁⠣⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣀⠤⠊⢁⡸⠀⣆⠹⣿⣧⣀⠀⠀⡠⠖⡑⠁⠀⠀⠀⠑⢄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣦⣶⣿⣿⣟⣁⣤⣾⠟⠁⢀⣿⣆⠹⡆⠻⣿⠉⢀⠜⡰⠀⠀⠈⠑⢦⡀⠈⢾⠑⡾⠲⣄⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠖⠒⠚⠛⠛⠢⠽⢄⣘⣤⡎⠠⠿⠂⠀⠠⠴⠶⢉⡭⠃⢸⠃⠀⣿⣿⣿⠡⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡤⠶⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣋⠁⠀⠀⠀⠀⠀⢹⡇⠀⠀⠀⠀⠒⠢⣤⠔⠁⠀⢀⡏⠀⠀⢸⣿⣿⠀⢻⡟⠑⠢⢄⡀⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⠀⡀⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⣀⣀⡀⠀⢸⣷⡀⣀⣀⡠⠔⠊⠀⠀⢀⣠⡞⠀⠀⠀⢸⣿⡿⠀⠘⠀⠀⠀⠀⠈⠑⢤⠀⠀
⠀⠀⢀⣴⣿⡀⠀⠀⡇⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣝⡛⠿⢿⣷⣦⣄⡀⠈⠉⠉⠁⠀⠀⠀⢀⣠⣴⣾⣿⡿⠁⠀⠀⠀⢸⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⡜⠀⠀
⠀⢀⣾⣿⣿⡇⠀⢰⣷⠀⢀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⣭⣍⣉⣉⠀⢀⣀⣤⣶⣾⣿⣿⣿⢿⠿⠁⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠉⢦⠀
⢀⣼⣿⣿⡿⢱⠀⢸⣿⡀⢸⣧⡀⠀⢿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡭⠖⠁⠀⡠⠂⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⢠⠃⠀⠈⣀
⢸⣿⣿⣿⡇⠀⢧⢸⣿⣇⢸⣿⣷⡀⠈⣿⣿⣇⠈⠛⢿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⠿⠿⠟⡻⠟⠉⠀⠀⡠⠊⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⣾⡄⠀⢠⣿⠔⠁⠀⢸
⠈⣿⣿⣿⣷⡀⠀⢻⣿⣿⡜⣿⣿⣷⡀⠈⢿⣿⡄⠀⠀⠈⠛⠿⣿⣿⣿⣷⣶⣶⣶⡶⠖⠉⠀⣀⣤⡶⠋⠀⣠⣶⡏⠀⠀⠀⠀⠀⠀⠀⢰⣿⣧⣶⣿⣿⠖⡠⠖⠁
⠀⣿⣿⣷⣌⡛⠶⣼⣿⣿⣷⣿⣿⣿⣿⡄⠈⢻⣷⠀⣄⡀⠀⠀⠀⠈⠉⠛⠛⠛⠁⣀⣤⣶⣾⠟⠋⠀⣠⣾⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠷⠊⠀⢰⠀
⢰⣿⣿⠀⠈⢉⡶⢿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠙⢇⠈⢿⣶⣦⣤⣀⣀⣠⣤⣶⣿⣿⡿⠛⠁⢀⣤⣾⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⣸⣿⡿⠿⠋⠙⠒⠄⠀⠉⡄
⣿⣿⡏⠀⠀⠁⠀⠀⠀⠉⠉⠙⢻⣿⣿⣿⣿⣷⡀⠀⠀⠀⠻⣿⣿⣿⣿⣿⠿⠿⠛⠁⠀⣀⣴⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰

                CREATED BY RICKBOT
                PROJECT IN .NET
`;

console.log(rickbotArt);
