import axios from "axios";
import Notiflix, { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
};

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31760233-da36889e6feb9e4679dfb5488';

refs.form.addEventListener('submit', onSearch)

function onSearch(evt) { 
    evt.preventDefault();
    const {
        searchQuery: {
            value: searhValue }
    } = evt.currentTarget.elements;
    if (!searhValue) { 
        Notify.failure("Oops, the field is empty");
        return;
    }

    pixabayApi(searhValue).then(data => createMarkup(data.hits))
}

function createMarkup(arr) { 
    const markup = arr.map(item =>
        `<a class="photo-link" href="${item.largeImageURL}">
            <div class="photo-card">
                <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${item.likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${item.views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${item.comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${item.downloads}
                        </p>
                    </div>
            </div>`).join('');
    // refs.gallery.insertAdjacentHTML('beforeend', markup);
    refs.gallery.innerHTML = markup;

}

// &image_type=${photo}&orientation=${horizontal}&safesearch=${true}

function pixabayApi(name) { 
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}`).then(resp => { 

        if (!resp.ok) { 
            throw new Error(resp.status)
        }
        return resp.json();
    }).catch(err => console.error(err))
}
