const Url = require("../config/config");
const {nanoid} = require("nanoid");
const validUrl = require("valid-url");

const baseURL = "https://sukurl.herokuapp.com";

async function checkIfUrlPresent({longUrl}){
    try {
        const check = await Url.where("longUrl", "==", longUrl).get();
        if(check.empty) {
            return false;
        } else {
            let shortUrl;
            check.forEach((data) => {
                shortUrl = data.data().shortUrl;
            })
            return {
                checker: {
                error: "URL already added!",
                shortUrl: shortUrl
            }};
        }
    } catch (err) {
        console.log(err);
        return {error: "Database Error!"};
    }
}

async function setData({longUrl}){
    try {
        const originalUrl = longUrl;
        if(validUrl.isUri(longUrl)) { // .isUri will check if the URL is correct or not
            var urlID;
            while(true){ //Checking if urlID is already present in DB;
                urlID = nanoid(10);
                const check = await Url.where("urlID", "==", urlID).get();
                if(check.empty){
                    break;
                }
            }
            const longUrl = originalUrl;
            const shortUrl = baseURL + "/" + urlID;
            const today = new Date();
            const urlData = new Object({
                urlID: urlID,
                longUrl: longUrl,
                shortUrl: shortUrl,
                date: `${today}`
            });
            return { urlData: urlData };
        } else {
            return { error: "URL is not valid!" };
        }

    } catch (error) {
        return { error: "Internal Server Error" };
    }
    
}

async function saveDataInDB(urlData){
    try {
        const ifDataSaved = await Url.add(urlData);
        if(ifDataSaved){
            return {shortUrl: urlData.shortUrl};
        } else {
            return {error: "Database Error!"};
        }
    } catch(error) {
        return {error: "Database Error!"};
    }
}

async function getOriginalUrl(urlID){
    try {
        const datas = await Url.where("urlID", "==", urlID).get();
        if(datas.empty){
            return {error: "Invalid URL"};
        } else {
            let originalUrl;
            datas.forEach((data) => {
                originalUrl = data.data().longUrl;
            })
            return { originalUrl: originalUrl };
        }
    } catch (error) {
        return {error: "Server Error!"};
    }
}

module.exports = { setData, checkIfUrlPresent, saveDataInDB, getOriginalUrl };