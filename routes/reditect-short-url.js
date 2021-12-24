const express = require("express");
const {getOriginalUrl} = require("../model/short-url-model");
const router = express.Router();

router.get("/:urlID", async function(req, res) {
    try{
        const urlID = req.params.urlID;
        const {error, originalUrl} = await getOriginalUrl(urlID);
        if(error) {
            res.status(400).json({error: error});
        } else {
            res.redirect(originalUrl);
        }
    } catch (error) {
        res.status(500).json({error: "Server Error!"});
    }
});

module.exports = router;