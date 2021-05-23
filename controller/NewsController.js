const NewsAPI = require('newsapi');
require('dotenv').config()

class NewsController {

    constructor() {
        this.newsApi = new NewsAPI(process.env.apiKey)
    }

    async topHeadline() {
        try {
            let query = {
                language: "en",
                country: process.env.country
            }
            const result = await this.newsApi.v2.topHeadlines(query);
            return result;
        } catch (error) {
            console.error("error",error)
            let errorMessage = new Error(error.message);
                errorMessage.code = (error.code) ? error.code : 400;
            throw errorMessage;
        }
    }

    async everything({q,source,from,to,sortBy,page}){
        try {
            let query = {
                language: "en",
                page: page || 1,
                q: q || 'news',
            }
            if(source)
            {
                query.source = source
            }
            if(from)
            {
                query.from = from
            }
            if(to)
            {
                query.to = to
            }
            if(sortBy)
            {
                query.sortBy = sortBy
            }
            const result = await this.newsApi.v2.everything(query);
            return result;
        } catch (error) {
            console.error("error",error)
            let errorMessage = new Error(error.message);
                errorMessage.code = (error.code) ? error.code : 400;
            throw errorMessage;
        }
    }

}
module.exports = new NewsController()