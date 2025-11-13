import MovieService from "./services/movie.service.js"

const loadMovies = () => {
    const moviesContainer = document.getElementById('movies')
    const movieService = MovieService.getInstance()
    
    const handleVoteRate = (vote, movie) => {
        movieService.vote(vote, movie.id)
    }

    const createMovieElement = (movie) => {
        const contentParent = document.createElement('div')
        contentParent.className = 'movieContentParent'
        
        const simImg = document.createElement('div')
        simImg.className = 'simulatedImg'

        const dataParent = document.createElement('div')
        dataParent.className = 'dataParent'

        const movieDataContainer = document.createElement('div')
        movieDataContainer.className = 'movieDataContainer'
        
        const movieTitle = document.createElement('p')
        movieTitle.textContent = movie.title
        
        const movieReleaseDate = document.createElement('p')
        movieReleaseDate.textContent = movie.releaseDate
        
        const movieImgVotes = document.createElement('div')
        movieImgVotes.className = 'movieImgVotes'
        
        const upVote = document.createElement('img')
        upVote.addEventListener('click', () => {
            handleVoteRate(true, movie)
        })
        upVote.src = '../../public/img/svg/upVote.svg'
        upVote.alt = 'upVote'

        const downVote = document.createElement('img')
        downVote.addEventListener('click', () => {
            handleVoteRate(false, movie)
        })
        downVote.src = '../../public/img/svg/downVote.svg'
        downVote.alt = 'downVote'

        movieImgVotes.append(upVote, downVote)

        movieDataContainer.append(movieTitle, movieReleaseDate)
        dataParent.append(movieDataContainer, movieImgVotes)

        contentParent.append(simImg, dataParent)
        return contentParent
    }

    const movies = movieService.getMovies()
    if (Array.isArray(movies)) {
        movies.forEach((movie) => {
            moviesContainer.appendChild(createMovieElement(movie))
        })
    }
}

const init = () => {
    loadMovies()
}

init()