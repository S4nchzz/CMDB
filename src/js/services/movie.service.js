import { MovieEntity } from "../entities/movie.entity.js"

class MovieService {
    constructor() {
        if (MovieService.instance) {
            return MovieService.instance
        }

        MovieService.instance = this
    }

    static getInstance() {
        if (MovieService.instance) {
            return MovieService.instance
        }

        return new MovieService()
    }

    movieExists(movies, find) {
        if (!movies) {
            return false
        }

        if (Array.isArray(movies)) {
            return movies.find((movie) => movie.title == find)
        }

        return movies.title == find
    }

    genreList = new Set()
    addMovie(title, releaseDate, popularity) {
        if (this.genreList.size == 0) {
            alert('Elige un genero')
            return
        }
 
        const rdDate = new Date(releaseDate)
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)

        if (
            rdDate.getFullYear() >= tomorrow.getFullYear() &&
            rdDate.getMonth() >= tomorrow.getMonth() &&
            rdDate.getDay() >= tomorrow.getDay()
        ) {
            alert('La fecha de estreno no puede ser posterior al dia que se da de alta.')
            return
        }

        const resultH2 = document.getElementById('addResult')
        let movies = JSON.parse(localStorage.getItem('movieList'))
        if (this.movieExists(movies, title)) {
            resultH2.textContent = 'El titulo de la pelicula ya existe, por favor, elige otro nombre.'
            resultH2.style.color = '#a50b0b'
            return
        }

        if (movies && Array.isArray(movies)) {
            movies.push(new MovieEntity(this.getLastMovieID(), title, releaseDate, popularity, Array.from(this.genreList)))
        } else if (movies) {
            movies = [movies, new MovieEntity(this.getLastMovieID(), title, releaseDate, popularity)]
        }

        resultH2.textContent = 'Pelicula añadida.'
        resultH2.style.color = '#52cc29'
        
        localStorage.setItem('movieList', movies ? JSON.stringify(movies) : JSON.stringify(new MovieEntity(this.getLastMovieID(), title, releaseDate, popularity, Array.from(this.genreList))))
    }

    getLastMovieID() {
        let movies = JSON.parse(localStorage.getItem('movieList'))

        if (movies && Array.isArray(movies)) {
            let maxID = Math.max(...movies.map((m) => m.id))
            return maxID + 1
        } else if (movies) {
            return movies.id + 1
        }

        return 0
    }

    addGenre(genre) {
        if (this.genreList.has(genre)) {
            this.genreList.delete(genre)
            return
        }
        
        this.genreList.add(genre)
    }

    getMovies() {
        return JSON.parse(localStorage.getItem('movieList'))
    }

    vote(vote, id) {
        const movies = JSON.parse(localStorage.getItem('movieList'))
        if (Array.isArray(movies)) {
            const updatedMovies = movies.map((movie) => {
                if (movie.id == id) {
                    movie.votes = [...movie.votes, vote]
                }

                return movie
            })

            localStorage.setItem('movieList', JSON.stringify(updatedMovies))
            return
        }

        if (movies.id == id) {
            movies.votes = [...movies.votes, vote]
            localStorage.setItem('movieList', movies)
        }
    }

    removeMovie(id) {
        const movies = JSON.parse(localStorage.getItem('movieList'))
        if (Array.isArray(movies)) {
            const filterMovies = movies.filter((movie) => parseInt(movie.id) !== id)
            localStorage.setItem('movieList', JSON.stringify(filterMovies))
            return
        }

        /* MUST BE */
        if (movies.id == id) {
            localStorage.removeItem('movieList')
        }
    }
}

export default MovieService