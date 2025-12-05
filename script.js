// console.log("Welcome to Umar Spotify Web Player! Enjoy your music experience.");

// let currentSong = new Audio();

// let songs;
// let currFolder;

// function secondsToMinutesSeconds(seconds) {
//    if (isNaN(seconds) || seconds < 0) {
//       return "00:00";
//    }

//    const minutes = Math.floor(seconds / 60);
//    const remainingSeconds = Math.floor(seconds % 60);

//    const formattedMinutes = String(minutes).padStart(2, '0');
//    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

//    return `${formattedMinutes}:${formattedSeconds}`;
// }


// async function getsongs() {

//    let a = await fetch("songs1");
//    let response = await a.text();

//    let div = document.createElement("div");
//    div.innerHTML = response;
//    let as = div.getElementsByTagName("a")
//    console.log(as);

//    let songs = [];

//    for (let index = 0; index < as.length; index++) {
//       const element = as[index];
//       if (element.href.endsWith(".mp3")) {
//          songs.push(element.href);





//       }

//    }
//    return songs;
// }
// async function getsongs1() {

//    let a = await fetch("songs1");
//    let response = await a.text();

//    let div = document.createElement("div");
//    div.innerHTML = response;
//    let as = div.getElementsByTagName("a")
//    console.log(as);


//    let songs1 = [];
//    for (let index = 0; index < as.length; index++) {
//       const element = as[index];
//       if (element.href.endsWith(".mp3")) {

//          songs1.push(element.href.split("/%5Csongs1%5C")[1]);




//       }

//    }

//    return songs1;
// }

// const playmusic = (track, pause = false) => {
//    currentSong.src = "/songs1/" + track
//    if (!pause) {
//       currentSong.play()
//       play.src = "img/pause.svg"
//    }
//    document.querySelector(".songinfo").innerHTML = decodeURI(track)
//    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"


// }
// async function main() {
//    // get the list of all songs
//    let songs = await getsongs();
//    let songs1 = await getsongs1();




//    //Show all the songs in the playlist 
//    let songul = document.querySelector(".songList").getElementsByTagName("ul")[0]



//    for (const songs of songs1) {
//       songul.innerHTML = songul.innerHTML + `<li>
        
//                             <img class="invert" src="img/music.svg" alt="">
//                             <div class="info">
//                                 <div> ${songs.replaceAll("%20", " ")}</div>
//                                 <div>Umar</div>
//                             </div>
//                             <div class="playnow">
//                                <span >Play now</span>
                            
//                            <img class="invert" src="img/play.svg" alt="">
//                            </div>
                        
//        </li>`
//       //        attach an event listener to each song


//    }

//    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e) => {
//       console.log(e.querySelector(".info").firstElementChild.innerHTML)
//       e.addEventListener("click", element => {

//          playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())



//       })




//    })
//    // attach an event listner to previous,next and play
//    play.addEventListener("click", () => {
//       if (currentSong.paused) {
//          currentSong.play()
//          play.src = "img/pause.svg"
//       }
//       else {
//          currentSong.pause()
//          play.src = "img/play.svg"
//       }
//    })

//    next.addEventListener("click", () => {
//       currentSong.pause()
//       console.log("Next clicked")

//       let index = songs1.indexOf(currentSong.src.split("/").slice(-1)[0])
//       if ((index + 1) < songs1.length) {
//          playmusic(songs1[index + 1])
//       }
//    })
//    previous.addEventListener("click", () => {
//       currentSong.pause()
//       console.log("Previous clicked")
//       let index = songs1.indexOf(currentSong.src.split("/").slice(-1)[0])
//       if ((index - 1) >= 0) {
//          playmusic(songs1[index - 1])
//       }
//    })
//    document.querySelector(".close").addEventListener("click", () => {
//       document.querySelector(".left").style.left = "-120%"
//    })
//    document.querySelector(".hamburger").addEventListener("click", () => {
//       document.querySelector(".left").style.left = "0"
//    })

//    document.querySelector(".seekbar").addEventListener("click", e => {
//       let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//       document.querySelector(".circle").style.left = percent + "%";
//       currentSong.currentTime = ((currentSong.duration) * percent) / 100
//    })

//    currentSong.addEventListener("timeupdate", () => {
//       document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
//       document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
//    })



//    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
//       console.log("Setting volume to", e.target.value, "/ 100")
//       currentSong.volume = parseInt(e.target.value) / 100
//       if (currentSong.volume > 0) {
//          document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
//       }
//    })

//    // script.js (add to your existing file)



// }



// main()






// script initialized
let currentSong = new Audio();
let currentPlaylist = []; // Array of {filename, folder}
let currentIndex = -1;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return String(minutes).padStart(2, "0") + ":" + String(remainingSeconds).padStart(2, "0");
}

/**
 * Ensure audio src is built safely from a filename.
 */
function setAudioSrcByFilename(filename, base = "/songs1/") {
  if (!filename) return;
  const encoded = encodeURIComponent(filename);
  currentSong.src = base.replace(/\/?$/, "/") + encoded;
}

/**
 * Play a song by filename (filename should be the decoded name, e.g. "My Song.mp3").
 * Updates UI and attempts to play; logs errors on failure.
 */
function playmusic(filename, pause = false, folderPath = "/songs1/") {
  if (!filename) {
    console.warn("playmusic called with empty filename");
    return;
  }
  setAudioSrcByFilename(filename, folderPath);
  const songInfoEl = document.querySelector(".songinfo");
  if (songInfoEl) songInfoEl.textContent = filename;
  const songTimeEl = document.querySelector(".songtime");
  if (songTimeEl) songTimeEl.textContent = "00:00 / 00:00";
  currentSong.onerror = () => {
    console.error("Audio element error:", currentSong.error, "src:", currentSong.src);
  };
  if (!pause) {
    currentSong.play().then(() => {
      const playBtn = document.getElementById("play");
      if (playBtn) playBtn.src = "img/pause.svg";
    }).catch(err => {
      console.error("Play failed (autoplay blocked or unsupported):", err, "src:", currentSong.src);
    });
  }
}

// Normalize strings for searching: decode, lower-case, replace underscores, collapse whitespace
function normalizeForSearch(s) {
  if (!s) return '';
  try { s = decodeURIComponent(s); } catch (e) { /* ignore */ }
  s = String(s).toLowerCase();
  s = s.replace(/_/g, ' ');
  s = s.replace(/\s+/g, ' ');
  return s.trim();
}

async function performSongSearch(query) {
  if (!query) { clearSearchResults(); return; }
  const qRaw = String(query);
  const q = normalizeForSearch(qRaw);
  const songUl = document.querySelector('.songList ul');
  if (!songUl) {
    console.warn('No song list container to search in');
    return;
  }

  // Tokenize query for safer highlighting
  const tokens = q.split(' ').filter(Boolean);

  // If there's an existing playlist loaded, filter it in-place
  if (currentPlaylist && currentPlaylist.length) {
    let found = 0;
    Array.from(songUl.getElementsByTagName('li')).forEach(li => {
      if (li.classList.contains('no-results')) return;
      const rawFilename = li.dataset.filename || '';
      const normFilename = normalizeForSearch(rawFilename);
      const matched = tokens.every(t => normFilename.includes(t));
      if (matched) {
        li.style.display = '';
        const titleEl = li.querySelector('.title');
        if (titleEl) {
          // highlight each token in the displayed filename (case-insensitive)
          let display = rawFilename;
          tokens.forEach(tok => {
            try {
              const re = new RegExp(escapeRegExp(tok), 'ig');
              display = display.replace(re, m => `<mark>${m}</mark>`);
            } catch (e) {}
          });
          titleEl.innerHTML = display;
        }
        // Attach play handler if not already
        if (!li._playHandlerAttached && li.dataset.filename) {
          li.addEventListener('click', () => {
            playmusic(li.dataset.filename, false, li.dataset.folder || '/songs1/');
          });
          li._playHandlerAttached = true;
        }
        found++;
      } else {
        li.style.display = 'none';
      }
    });
    const existingNo = songUl.querySelector('.no-results'); if (existingNo) existingNo.remove();
    if (found === 0) showNoResults();
    return;
  }

  // Search all folder manifests and display results with folder info
  const folders = [
    { name: 'cs', path: '/songs1/cs/' },
    { name: 'ncs', path: '/songs1/ncs/' }
  ];
  let allResults = [];
  for (const folder of folders) {
    try {
      const res = await fetch(folder.path + 'manifest.json', { cache: 'no-store' });
      if (!res.ok) continue;
      const files = await res.json();
      if (Array.isArray(files)) {
        files.forEach(f => {
          const normFilename = normalizeForSearch(f);
          if (tokens.every(t => normFilename.includes(t))) {
            allResults.push({ filename: f, folder: folder.path });
          }
        });
      }
    } catch (e) { /* skip folder on error */ }
  }

  // Render results
  songUl.innerHTML = '';
  if (!allResults.length) {
    showNoResults();
    return;
  }
  allResults.forEach(({ filename, folder }) => {
    const li = document.createElement('li');
    li.dataset.filename = filename;
    li.dataset.folder = folder;
    let display = filename;
    tokens.forEach(tok => {
      try {
        const re = new RegExp(escapeRegExp(tok), 'ig');
        display = display.replace(re, m => `<mark>${m}</mark>`);
      } catch (e) {}
    });
    li.innerHTML = `
      <img class="invert" src="img/music.svg" alt="">
      <div class="info">
        <div class="title">${display}</div>
        <div>Umar</div>
      </div>
      <div class="playnow">
        <span>Play now</span>
        <img class="invert" src="img/play.svg" alt="">
      </div>`;
    li.addEventListener('click', () => {
      playmusic(filename, false, folder);
    });
    songUl.appendChild(li);
  });
}

/**
 * Fetches filenames from a directory listing. If the server does not return
 * anchor tags, this will try a regex fallback to extract .mp3/.wav/.ogg names.
 */
async function fetchSongFilenames(listingPath = "/songs1/") {
  // Try several methods: directory listing HTML, manifest JSON in folder, global JSON, then fallback list
  const tried = [];
  const tryDirectoryListing = async () => {
    try {
      tried.push(listingPath);
      // attempting directory listing fetch
      const res = await fetch(listingPath, { cache: "no-store" });
      if (!res.ok) {
        console.warn("Directory listing fetch not ok:", res.status, res.statusText, listingPath);
        return [];
      }
      const html = await res.text();
      const div = document.createElement("div");
      div.innerHTML = html;
      const anchors = Array.from(div.getElementsByTagName("a"));
      const filenames = new Set();
      for (const a of anchors) {
        const rawHref = a.getAttribute("href") || "";
        // decode percent-escapes when possible, fall back to raw when decode fails
        let decodedHref = rawHref;
        try { decodedHref = decodeURIComponent(rawHref); } catch (e) { /* ignore */ }

        // Normalize Windows backslashes to forward slashes so split works correctly
        const normalized = decodedHref.replace(/\\+/g, '/');
        // remove query/hash parts and collapse multiple slashes
        const cleaned = normalized.split(/[?#]/)[0].replace(/\/\/+/, '/');
        const last = cleaned.split('/').filter(Boolean).pop();
        if (!last) continue;

        const lower = last.toLowerCase();
        if (lower.endsWith('.mp3') || lower.endsWith('.wav') || lower.endsWith('.ogg')) {
          filenames.add(last);
        }
      }
      // regex fallback within the same HTML (helps some server index formats)
      if (filenames.size === 0) {
        const re = /(?:[\/"'\(\[])?([A-Za-z0-9% _\-\.\(\)]+?\.(?:mp3|wav|ogg))(?:["'\)\]\s<>]|$)/gi;
        let m;
        while ((m = re.exec(html)) !== null) {
          try { filenames.add(decodeURIComponent(m[1])); } catch { filenames.add(m[1]); }
        }
      }
      return Array.from(filenames);
    } catch (err) {
      console.warn("Directory listing parse failed:", err);
      return [];
    }
  };

  const tryJsonManifest = async (url) => {
    try {
      tried.push(url);
      // attempting manifest fetch
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        console.warn("Manifest fetch not ok:", res.status, res.statusText, url);
        return [];
      }
      const json = await res.json();
      if (!Array.isArray(json)) {
        console.warn("Manifest JSON is not an array:", url);
        return [];
      }
      // normalize strings only
      return json.filter(item => typeof item === "string");
    } catch (err) {
      console.warn("Manifest fetch/parse failed:", url, err);
      return [];
    }
  };

  // 1) try directory listing HTML
  let list = await tryDirectoryListing();
  if (list.length) return list;

  // 2) try manifest inside folder or root
  const manifestCandidates = [
    listingPath.replace(/\/?$/, "/") + "manifest.json",
    listingPath.replace(/\/?$/, "/") + "songs.json",
    "/songs1/manifest.json",
    "/songs.json",
    "/songs1.json"
  ];
  for (const m of manifestCandidates) {
    const res = await tryJsonManifest(m);
    if (res.length) return res;
  }

  // 3) fallback — developer/local list (replace with your real filenames)
  const fallback = [
    // Example: "song1.mp3", "My%20Song%202.mp3"
  ];
  if (fallback.length) {
    console.warn("Using local fallback list. Add real filenames to the fallback array in script.js if needed.");
    return fallback;
  }

  // nothing found
  console.error("No song filenames discovered. Tried:", tried, ".\nIf your server does not expose a directory listing, create a manifest JSON file (e.g. /songs1/manifest.json) with an array of filenames:\n[\n  \"song1.mp3\",\n  \"song two.mp3\"\n]\nThen ensure files are accessible at /songs1/<encoded-filename>");
  return [];
}

// ----- Search helpers -----
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function clearSearchResults() {
  const songUl = document.querySelector('.songList ul');
  if (!songUl) return;
  Array.from(songUl.getElementsByTagName('li')).forEach(li => {
    li.style.display = '';
    const titleEl = li.querySelector('.title');
    if (titleEl && li.dataset.filename) titleEl.textContent = li.dataset.filename;
    // Re-attach play handler after clearing search
    if (!li._playHandlerAttached && li.dataset.filename) {
      li.addEventListener('click', () => {
        playmusic(li.dataset.filename);
      });
      li._playHandlerAttached = true;
    }
  });
  const noEl = songUl.querySelector('.no-results'); if (noEl) noEl.remove();
}

function showNoResults() {
  const songUl = document.querySelector('.songList ul');
  if (!songUl) return;
  // remove previous no-results
  songUl.querySelectorAll('.no-results').forEach(n=>n.remove());
  const li = document.createElement('li');
  li.className = 'no-results';
  li.style.opacity = '0.8';
  li.style.fontStyle = 'italic';
  li.textContent = 'No results found.';
  songUl.appendChild(li);
}

// ===== CARD FUNCTIONALITY (Categories / Folders) =====
async function loadSongsFromFolder(folderPath) {
  // Load manifest or directory listing from a specific folder
  try {
    const manifestUrl = folderPath.replace(/\/?$/, "/") + "manifest.json";
    // loading songs from manifest
    const res = await fetch(manifestUrl, { cache: "no-store" });
    if (!res.ok) {
      console.warn("Failed to fetch manifest from", manifestUrl, res.status);
      return [];
    }
    const filenames = await res.json();
    if (!Array.isArray(filenames)) {
      console.warn("Manifest is not an array:", manifestUrl);
      return [];
    }
    return filenames;
  } catch (err) {
    console.error("Error loading folder manifest:", folderPath, err);
    return [];
  }
}

function renderPlaylist(playlistArr) {
  const songListContainer = document.querySelector('.songList');
  if (!songListContainer) {
    console.error('Missing .songList container in HTML.');
    return;
  }
  let songUl = songListContainer.querySelector('ul');
  if (!songUl) {
    songUl = document.createElement('ul');
    songListContainer.appendChild(songUl);
  }
  songUl.innerHTML = '';
  playlistArr.forEach(({ filename, folder }, idx) => {
    const li = document.createElement('li');
    li.dataset.filename = filename;
    li.dataset.folder = folder;
    li.dataset.index = idx;
    li.innerHTML = `
      <img class="invert" src="img/music.svg" alt="">
      <div class="info">
        <div class="title">${filename}</div>
        <div>Umar</div>
      </div>
      <div class="playnow">
        <span>Play now</span>
        <img class="invert" src="img/play.svg" alt="">
      </div>`;
    li.addEventListener('click', () => {
      currentPlaylist = playlistArr;
      currentIndex = idx;
      playmusic(filename, false, folder);
    });
    songUl.appendChild(li);
  });
}

function displaySongsInPlaylist(filenames, folderPath = "/songs1/") {
  // Display songs in the left sidebar playlist, bound to a specific folder
  const playlistArr = filenames.map((filename, idx) => ({ filename, folder: folderPath }));
  renderPlaylist(playlistArr);
  currentPlaylist = playlistArr;
  currentIndex = -1;
}

async function initializeCards() {
  // Load card data and attach listeners
  const cardContainer = document.querySelector(".cardContainer");
  if (!cardContainer) return;

  const placeholderSvg = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240"><rect width="100%" height="100%" fill="#252525"/><text x="50%" y="55%" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="20" text-anchor="middle">Album</text></svg>');
  const dataUrl = `data:image/svg+xml;utf8,${placeholderSvg}`;

  const categories = [
    { 
      name: "No Copyright Sounds", 
      folder: "/songs1/ncs/", 
      desc: "Copyright-free background music ",
      img: "img/cover.jpg"
    },
    { 
      name: "Copyright Safe", 
      folder: "/songs1/cs/", 
      desc: "Pre-cleared music tracks",
      img: "img/cover2.jpg"
    }
  ];

  // Generate and append cards
  const frag = document.createDocumentFragment();
  categories.forEach((cat) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="play">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
        </svg>
      </div>
      <div class="cover" style="background-image: url('${cat.img}')" role="img" aria-label="${cat.name}"></div>
      <h2>${cat.name}</h2>
      <p>${cat.desc}</p>
    `;
    
    card.addEventListener("click", async () => {
      // card clicked
      const songs = await loadSongsFromFolder(cat.folder);
      if (songs.length) {
        displaySongsInPlaylist(songs, cat.folder);
        // optional: highlight the card or animate sidebar
        document.querySelector(".left")?.style.setProperty("animation", "slideIn 0.3s ease");
      } else {
        console.warn("No songs found in", cat.folder);
      }
    });
    
    frag.appendChild(card);
  });

  cardContainer.appendChild(frag);
}

// call after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initializeCards, 500); // small delay to ensure cards are rendered
});

async function main() {
  try {
    // Load all songs from both folders for initial display
    const folders = [
      { name: 'cs', path: '/songs1/cs/' },
      { name: 'ncs', path: '/songs1/ncs/' }
    ];
    let allSongs = [];
    for (const folder of folders) {
      try {
        const res = await fetch(folder.path + 'manifest.json', { cache: 'no-store' });
        if (!res.ok) continue;
        const files = await res.json();
        if (Array.isArray(files)) {
          files.forEach(f => {
            allSongs.push({ filename: f, folder: folder.path });
          });
        }
      } catch (e) { /* skip folder on error */ }
    }
    renderPlaylist(allSongs);
  } catch (err) {
    console.error('Fatal error in main():', err);
  }
}

function renderPlaylist(playlistArr) {
  const songListContainer = document.querySelector('.songList');
  if (!songListContainer) {
    console.error('Missing .songList container in HTML.');
    return;
  }
  let songUl = songListContainer.querySelector('ul');
  if (!songUl) {
    songUl = document.createElement('ul');
    songListContainer.appendChild(songUl);
  }
  songUl.innerHTML = '';
  playlistArr.forEach(({ filename, folder }, idx) => {
    const li = document.createElement('li');
    li.dataset.filename = filename;
    li.dataset.folder = folder;
    li.dataset.index = idx;
    li.innerHTML = `
      <img class="invert" src="img/music.svg" alt="">
      <div class="info">
        <div class="title">${filename}</div>
        <div>Umar</div>
      </div>
      <div class="playnow">
        <span>Play now</span>
        <img class="invert" src="img/play.svg" alt="">
      </div>`;
    li.addEventListener('click', () => {
      currentPlaylist = playlistArr;
      currentIndex = idx;
      playmusic(filename, false, folder);
    });
    songUl.appendChild(li);
  });
}

function displaySongsInPlaylist(filenames, folderPath = "/songs1/") {
  // Display songs in the left sidebar playlist, bound to a specific folder
  const playlistArr = filenames.map((filename, idx) => ({ filename, folder: folderPath }));
  renderPlaylist(playlistArr);
  currentPlaylist = playlistArr;
  currentIndex = -1;
}

const playBtn = document.getElementById("play");
if (playBtn) {
  playBtn.addEventListener("click", () => {
    if (currentSong.paused) { currentSong.play().catch(e => console.warn(e)); playBtn.src = "img/pause.svg"; }
    else { currentSong.pause(); playBtn.src = "img/play.svg"; }
  });
}
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (!currentPlaylist.length || currentIndex < 0) {
      console.warn("No playlist loaded or no song selected");
      return;
    }
    currentSong.pause();
    if (currentIndex + 1 < currentPlaylist.length) {
      currentIndex++;
      const { filename, folder } = currentPlaylist[currentIndex];
      playmusic(filename, false, folder);
    }
  });
}
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (!currentPlaylist.length || currentIndex < 0) {
      console.warn("No playlist loaded or no song selected");
      return;
    }
    currentSong.pause();
    if (currentIndex > 0) {
      currentIndex--;
      const { filename, folder } = currentPlaylist[currentIndex];
      playmusic(filename, false, folder);
    }
  });
}

// ----- Search helpers -----
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Normalize strings for searching: decode, lower-case, replace underscores, collapse whitespace
function normalizeForSearch(s) {
  if (!s) return '';
  try { s = decodeURIComponent(s); } catch (e) { /* ignore */ }
  s = String(s).toLowerCase();
  s = s.replace(/_/g, ' ');
  s = s.replace(/\s+/g, ' ');
  return s.trim();
}

function clearSearchResults() {
  const songUl = document.querySelector('.songList ul');
  if (!songUl) return;
  Array.from(songUl.getElementsByTagName('li')).forEach(li => {
    li.style.display = '';
    const titleEl = li.querySelector('.title');
    if (titleEl && li.dataset.filename) titleEl.textContent = li.dataset.filename;
    // Re-attach play handler after clearing search
    if (!li._playHandlerAttached && li.dataset.filename) {
      li.addEventListener('click', () => {
        playmusic(li.dataset.filename);
      });
      li._playHandlerAttached = true;
    }
  });
  const noEl = songUl.querySelector('.no-results'); if (noEl) noEl.remove();
}

function showNoResults() {
  const songUl = document.querySelector('.songList ul');
  if (!songUl) return;
  // remove previous no-results
  songUl.querySelectorAll('.no-results').forEach(n=>n.remove());
  const li = document.createElement('li');
  li.className = 'no-results';
  li.style.opacity = '0.8';
  li.style.fontStyle = 'italic';
  li.textContent = 'No results found.';
  songUl.appendChild(li);
}

async function performSongSearch(query) {
  if (!query) { clearSearchResults(); return; }
  const qRaw = String(query);
  const q = normalizeForSearch(qRaw);
  const songUl = document.querySelector('.songList ul');
  if (!songUl) {
    console.warn('No song list container to search in');
    return;
  }

  // Tokenize query for safer highlighting
  const tokens = q.split(' ').filter(Boolean);

  // If there's an existing playlist loaded, filter it in-place
  if (currentPlaylist && currentPlaylist.length) {
    let found = 0;
    Array.from(songUl.getElementsByTagName('li')).forEach(li => {
      if (li.classList.contains('no-results')) return;
      const rawFilename = li.dataset.filename || '';
      const normFilename = normalizeForSearch(rawFilename);
      const matched = tokens.every(t => normFilename.includes(t));
      if (matched) {
        li.style.display = '';
        const titleEl = li.querySelector('.title');
        if (titleEl) {
          // highlight each token in the displayed filename (case-insensitive)
          let display = rawFilename;
          tokens.forEach(tok => {
            try {
              const re = new RegExp(escapeRegExp(tok), 'ig');
              display = display.replace(re, m => `<mark>${m}</mark>`);
            } catch (e) {}
          });
          titleEl.innerHTML = display;
        }
        // Attach play handler if not already
        if (!li._playHandlerAttached && li.dataset.filename) {
          li.addEventListener('click', () => {
            playmusic(li.dataset.filename, false, li.dataset.folder || '/songs1/');
          });
          li._playHandlerAttached = true;
        }
        found++;
      } else {
        li.style.display = 'none';
      }
    });
    const existingNo = songUl.querySelector('.no-results'); if (existingNo) existingNo.remove();
    if (found === 0) showNoResults();
    return;
  }

  // Search all folder manifests and display results with folder info
  const folders = [
    { name: 'cs', path: '/songs1/cs/' },
    { name: 'ncs', path: '/songs1/ncs/' }
  ];
  let allResults = [];
  for (const folder of folders) {
    try {
      const res = await fetch(folder.path + 'manifest.json', { cache: 'no-store' });
      if (!res.ok) continue;
      const files = await res.json();
      if (Array.isArray(files)) {
        files.forEach(f => {
          const normFilename = normalizeForSearch(f);
          if (tokens.every(t => normFilename.includes(t))) {
            allResults.push({ filename: f, folder: folder.path });
          }
        });
      }
    } catch (e) { /* skip folder on error */ }
  }

  // Render results
  songUl.innerHTML = '';
  if (!allResults.length) {
    showNoResults();
    return;
  }
  allResults.forEach(({ filename, folder }) => {
    const li = document.createElement('li');
    li.dataset.filename = filename;
    li.dataset.folder = folder;
    let display = filename;
    tokens.forEach(tok => {
      try {
        const re = new RegExp(escapeRegExp(tok), 'ig');
        display = display.replace(re, m => `<mark>${m}</mark>`);
      } catch (e) {}
    });
    li.innerHTML = `
      <img class="invert" src="img/music.svg" alt="">
      <div class="info">
        <div class="title">${display}</div>
        <div>Umar</div>
      </div>
      <div class="playnow">
        <span>Play now</span>
        <img class="invert" src="img/play.svg" alt="">
      </div>`;
    li.addEventListener('click', () => {
      playmusic(filename, false, folder);
    });
    songUl.appendChild(li);
  });
}

// seekbar
const seekbar = document.querySelector(".seekbar");
seekbar?.addEventListener("click", (e) => {
  const rect = (e.currentTarget || e.target).getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const percent = Math.max(0, Math.min(1, offsetX / rect.width));
  document.querySelector(".circle")?.style && (document.querySelector(".circle").style.left = (percent * 100) + "%");
  if (currentSong.duration && !isNaN(currentSong.duration)) currentSong.currentTime = currentSong.duration * percent;
});

currentSong.addEventListener("timeupdate", () => {
  if (!currentSong.duration || isNaN(currentSong.duration)) return;
  document.querySelector(".songtime").textContent = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
  const circleEl = document.querySelector(".circle");
  if (circleEl) circleEl.style.left = ((currentSong.currentTime / currentSong.duration) * 100) + "%";
});

const volInput = document.querySelector(".range input");
volInput?.addEventListener("change", (e) => {
  const v = parseInt(e.target.value);
  if (!isNaN(v)) currentSong.volume = v / 100;
  const volImg = document.querySelector(".volume>img");
  if (volImg && currentSong.volume > 0) volImg.src = volImg.src.replace("mute.svg", "volume.svg");
});

main();


