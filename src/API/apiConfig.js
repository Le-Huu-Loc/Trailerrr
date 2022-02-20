const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',   //Url basic
    apiKey: '6f6b0bf90406f6b480de37b78dfd008a', //key api
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`, //image nguyen ban
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}` //img w500
}
export default apiConfig;