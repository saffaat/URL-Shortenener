const express = require("express");
const router = express.Router();
const config = require("config");
const shortid = require("shortid");
const validUrl = require("valid-url");

//get our model
const Url = require("../models/Collection");

// @route      POST /api/url/shorten
//desc         Create short URL

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseURL");
  console.log("base url", baseUrl);
  //Check Base URL
  //   if (!validUrl.isUri(baseUrl)) {
  //     return res.status(401).json("Invalid Base Url");
  //   }

  //Create URL Code
  const urlCode = shortid.generate();

  //Check Long URL
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        console.log(shortUrl);
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("server error");
    }
  } else {
    res.status(401).json("Invalid URL");
  }
});
module.exports = router;
