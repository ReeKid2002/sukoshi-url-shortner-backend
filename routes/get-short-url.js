const express = require("express");
const router = express.Router();
const {setData, checkIfUrlPresent, saveDataInDB } = require("../model/short-url-model");

router.post("/url", async function(req, res) {
    const { longUrl } = req.body;
    if( longUrl == undefined ){
        res.status(405).json({message: "Enter the URL!"});
        return;
    }
    const {error, checker} = await checkIfUrlPresent({longUrl}); //Fucntion to check if the original URL is saved in DB before;
    if(error) {

        res.status(500).json({message: error});
    } else {
        if(checker){ //If URL is present in the DB then send the short URL back;
            res.status(401).json({message: checker.error, shortUrl: checker.shortUrl});
        } else {
            const {urlData, error} = await setData({longUrl: longUrl}); //Function to create urlData object which contain urlID, longUrl, shortUrl and date;
            if(error) { //If Error in Verification of Original Url or which creating the object;
                res.status(406).json({message: error});
            } else {
                const {error, shortUrl} = await saveDataInDB(urlData); //Function to save the urlData object in the DB;
                if(error){ //Error while saving the object in the DB;
                    console.log(error);
                    res.status(500).json({message: error});
                } else { //Object succesfully saved in DB;
                    res.status(201).json({shortUrl: shortUrl});
                }
            }
        }
    }
});

module.exports = router;