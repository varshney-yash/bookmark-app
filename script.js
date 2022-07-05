const modal = document.getElementById('modal');
const showModal = document.getElementById('show-modal');
const closeModal = document.getElementById('close-modal');
const bkForm = document.getElementById('bk-form');
const webName = document.getElementById('website-name');
const webURL = document.getElementById('website-url');
const bkCont = document.getElementById('bk-container');

let bookmarks = [];

function modalShow() {
    modal.classList.add('show-modal');
    webName.focus();
}

showModal.addEventListener('click', modalShow);
closeModal.addEventListener('click', () => modal.classList.remove('show-modal'));

// validate form
function valid(nameVal, urlVal) {
    const exp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(exp);
    if (!nameVal || !urlVal) {
        alert('Enter values for both fields');
        return false;
    }
    if (urlVal.match(regex)) {
        // alert('match');
    } else {
        alert('Enter valid URL');
        return false;
    }

    return true;
}

// build bk dom
function buildBk() {
    // Remove all bookmark elements
    bookmarksContainer.textContent = '';
    // Build items
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        // Favicon / Link Container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        // Append to bookmarks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    });
}

// fetch bookmarks from local storage
function fetchBk() {
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        bookmarks = [
            {
                name: 'Yash Varshney',
                url: 'https://github.com/varshney-yash'
            },
        ]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    // console.log(bookmarks);
    buildBk();
}

// Delete Bookmark
function deleteBookmark(url) {
    // Loop through the bookmarks array
    bookmarks.forEach((bookmark, i) => {
      if (bookmark.url === url) {
        bookmarks.splice(i, 1);
      }
    });
    // Update bookmarks array in localStorage, re-populate DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
  }
  

function storeBk(e) {
    e.preventDefault();
    const nameVal = webName.value;
    let urlVal = webURL.value;
    if (!urlVal.includes('https://') && !urlVal.includes('http://')) {
        urlVal = `https://${urlVal}`;
    }
    if (!valid(nameVal, urlVal)) {
        return false;
    }
    const bookmark = {
        name: nameVal,
        url: urlVal,
    };
    bookmarks.push(bookmark);
    // console.log(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBk();
    bkForm.reset();
    webName.focus();
    // console.log(e);
}

bkForm.addEventListener('submit', storeBk);
fetchBk();
