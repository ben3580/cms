var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const Game = require("../models/Game");

/* Validators */
//TODO: THis is where you need to implement your custom validators
const nameValidator = async (value) => {
  if (value.length > 50) {
    throw new Error("Game name must be less than 50 characters");
  }
  if (value.trim() === "") {
    throw new Error("Game name cannot be empty");
  }
};

router.get("/", async function (req, res, next) {
  const games = await Game.findAll();
  if (req.query.msg) {
    res.locals.msg = req.query.msg;
  }
  res.render("games", { games });
});

router.post(
  "/create",
  //TODO: This is where you will be using your custom validators
  body("gamename").custom(nameValidator),
  async function (req, res, next) {
    try {
      const result = validationResult(req);
      const result2 = result.formatWith((error) => error.msg);
      const errors2 = result2.array();
      console.log(errors2);
      if (!result.isEmpty()) {
        throw new Error(errors2[0]);
      } else {
        await Game.create({
          gamename: req.body.gamename,
          gamegenre: req.body.gamegenre,
          gamedesc: req.body.gamedesc,
          gamerating: req.body.gamerating,
          gameprice: req.body.gameprice
        });
        res.redirect("/?msg=success");
      }
    } catch (error) {
      res.redirect("/?msg=" + new URLSearchParams(error.toString()).toString());
    }
  }
);

router.get("/:recordid", async function (req, res, next) {
  const game = await Game.findGame(req.params.recordid);
  if (game) {
    res.render("gamedetails", { game });
  } else {
    res.redirect("/?msg=game+not+found");
  }
});

module.exports = router;
