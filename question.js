const { default: axios } = require('axios')
const jwt = require('jsonwebtoken');

const question_url = `https://hackattic.com/challenges/jotting_jwts/problem?access_token=99b31464431518ef`;
const answer_url = `https://hackattic.com/challenges/jotting_jwts/solve?access_token=99b31464431518ef`

let answer = '';

async function fetchQuestion() {
    const { data: { jwt_secret } } = await axios.get(question_url)
    return jwt_secret;
}

async function sendAppUrl() {
    if(!process.env.APP_URL){
        throw new Error('App url not set')
    }
    const {data} = await axios.post(answer_url, { app_url: process.env.APP_URL })
    console.log(data);
}

function processAppend(jwt_token) {
    const data = jwt.verify(jwt_token, global.jwt_secret)
    console.log(data, ' ', typeof data)
    if ('append' in data) {
        answer += data.append;
        console.log('APPEND ',answer);
    } else {
        return answer;
    }

    return null;
}


async function fetchJWTAndSetValue(){
    const jwt_secret = await fetchQuestion();
    console.log("JWT Secret ", jwt_secret)
    global.jwt_secret = jwt_secret;
}

module.exports = {
    fetchQuestion,
    processAppend,
    sendAppUrl,
    fetchJWTAndSetValue
}