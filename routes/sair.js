const express = require("express");
const router = express.Router();

router.get("/", async (req, res)=>{ req.session.destroy((e) => { return res.redirect('/login'); });  });

module.exports = router;