const express = require("express");
const router = express.Router();

const Url = require("../models/Collection");

// Get   /urlCode
//Redirect to Long URL
router.get("/:code", async (req, res) => {
  try {
    let url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(401).json("no url found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("server error");
  }
});
module.exports = router;
