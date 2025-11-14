const getMovieImage = async(movieTitle) => {
    const data = await fetch(`https://www.omdbapi.com/?apikey=ff3e27c&t=${movieTitle}`)

    const json = await data.json()
    return json.Poster
}

export default getMovieImage