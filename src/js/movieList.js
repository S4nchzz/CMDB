import MovieService from "./services/movie.service.js"

const loadMovies = () => {
    const moviesContainer = document.getElementById('movies')
    const movieService = MovieService.getInstance()
    
    const handleVoteRate = (vote, movie) => {
        movieService.vote(vote, movie.id)
        moviesContainer.innerHTML = ''
        loadMovies()
    }

    const displayAllInfo = (movie, show) => {
        const allInfoContainer = document.getElementById(`allInfo${movie.id}`)
        allInfoContainer.style = `opacity: ${show ? 1 : 0}`
    }

    const createMovieElement = (movie) => {
        const contentParent = document.createElement('div')
        contentParent.className = 'movieContentParent'

        const allInfo = document.createElement('div')
        allInfo.className = 'allInfo'
        allInfo.id = `allInfo${movie.id}`

        const nVotes = document.createElement('p')
        nVotes.textContent = `Votos: ${movie.votes.length}`
        
        const genres = document.createElement('p')
        genres.textContent = `${movie.genres}`

        const rating = document.createElement('p')
        if (movie.votes && Array.isArray(movie.votes)) {
            const upvotes = movie.votes.filter((vote) => vote )

            rating.textContent = `Puntuación: ${((upvotes.length / movie.votes.length) * 10).toFixed(2)}`
        } else {
            rating.textContent = `Puntuación: 0`
        }
        
        const simImg = document.createElement('div')
        simImg.className = 'simulatedImg'
        
        const moreInfoButton = document.createElement('img')
        moreInfoButton.className = 'moreInfoImg'
        moreInfoButton.addEventListener('mouseenter', () => { displayAllInfo(movie, true) })
        moreInfoButton.addEventListener('mouseleave', () => { displayAllInfo(movie, false) })
        moreInfoButton.src = '../../public/img/svg/info.svg'
        moreInfoButton.alt = 'More info'

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

        allInfo.append(nVotes, genres, rating)
        simImg.append(moreInfoButton, allInfo)
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