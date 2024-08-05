function loadContent(page) {
    const contentDiv = document.getElementById('content');
    
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(data => {
            contentDiv.innerHTML = data;
            if (page === 'otherstuff') {
                document.getElementById('random-playlist').addEventListener('click', displayPlaylist);
                displayPlaylist();
            }
        })
        .catch(error => {
            contentDiv.innerHTML = '<p>Content not found.</p>';
        });
}

// Default: about
document.addEventListener('DOMContentLoaded', () => loadContent('about'));

const playlistIds = [
    '0XUOKS1T5mpFwnGix3mSB1', // ikigai
    '0uQgbweG56sDNjkL1gu73C', // kunnianhimoa
    '7rnB7YemC9C9RmSTUqBkgW', // china
    '6VbIGQK2aU8gXajJcwJInw', // riddle order
    '2wMXhyyaCiOMna8wRFyM4l'  // project 2025
];

let currentId = -1;

function getRandomPlaylistUrl(ids) {
    let newId;
    do {
        newId = Math.floor(Math.random() * ids.length);
    } while (newId === currentId);
    currentId = newId; 
    return `https://open.spotify.com/embed/playlist/${ids[newId]}`;
}

function displayPlaylist() {
    const playlistUrl = getRandomPlaylistUrl(playlistIds);
    document.getElementById('playlist').innerHTML = 
        `<iframe style="border-radius:12px" src="${playlistUrl}" width="100%" height="600" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
}