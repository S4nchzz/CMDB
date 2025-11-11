import GenreEntity from "../entities/genre.entity.js";

class GenreService {
    constructor() {
        if (GenreService.instance) {
            return GenreService.instance;
        }

        GenreService.instance = this;
    }

    static getInstance() {
        if (!GenreService.instance) {
            GenreService.instance = new GenreService();
        }
        return GenreService.instance;
    }

    getGenres() {
        return JSON.parse(localStorage.getItem('genreList') || '[]') || [];
    }

    getGenreByName(genre) {
        const ls = JSON.parse(localStorage.getItem('genreList'));
        if (!ls) {
            return [];
        }

        return ls.filter(genreEntity => {
            if (genreEntity.genre == genre) return genreEntity;
        });
    }

    getGenreById(genreId) {
        const ls = JSON.parse(localStorage.getItem('genreList'));
        if (!ls) {
            return [];
        }

        return ls.filter(genreEntity => {
            if (genreEntity.id == genreId) return genreEntity;
        });
    }

    addGenre(genre) {
        if (this.getGenreByName(genre).length !== 0) {
            alert('Este género ya existe, utiliza otro');
            return;
        }

        try {
            const lsOld = JSON.parse(localStorage.getItem('genreList'));
            lsOld.push(new GenreEntity(genre, this.getLastGenreID()));
            localStorage.setItem('genreList', JSON.stringify(lsOld));
        } catch (e) {
            localStorage.setItem('genreList', JSON.stringify([new GenreEntity(genre, this.getLastGenreID())]));
        }
    }

    removeElementById(removeGenre) {
        if (!localStorage.getItem('genreList')) {
            throw new Error('Genre list no está definido en localStorage');
        }

        const currentLs = JSON.parse(localStorage.getItem('genreList'));
        localStorage.setItem('genreList',
            JSON.stringify(currentLs.filter((genre) => genre.id !== parseInt(removeGenre)))
        );
    }

    getLastGenreID() {
        if (!localStorage.getItem('genreList')) {
            return 0;
        }

        const ls = JSON.parse(localStorage.getItem('genreList'));
        let maxId = 0;
        ls.forEach(obj => {
            if (obj.id > maxId) {
                maxId = obj.id;
            }
        });

        return maxId + 1;
    }

    removeAllGenres() {
        localStorage.removeItem('genreList');
    }
}

export default GenreService;
