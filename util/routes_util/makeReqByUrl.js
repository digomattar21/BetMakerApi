require('dotenv').config()
const axios = require('axios');

async function makeReqByUrl(url,page=1){
    try {
        urlWithPage = url+`&page=${page.toString()}`;
        console.log(urlWithPage)
        let req = await axios.get(urlWithPage, {
            headers: {
              "x-rapidapi-key": `${process.env.SOCCER_API_KEY}`,
              "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
              useQueryString: true,
            }
          });
          return req.data
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = makeReqByUrl