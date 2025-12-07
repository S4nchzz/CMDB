/**
 * Obtiene la imagen de una película desde la API de OMDB.
 * @async
 * @param {string} movieTitle - El título de la película a buscar.
 * @returns {Promise<string>} La URL del póster de la película.
 */
const getMovieImage = async(movieTitle) => {
    const data = await fetch(`https://www.omdbapi.com/?apikey=ff3e27c&t=${movieTitle}`)

    const json = await data.json()
    return json.Poster
}

export default getMovieImage