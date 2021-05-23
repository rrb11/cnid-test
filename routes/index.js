var express = require('express');
var router = express.Router();
const newsController = require('../controller/NewsController')
/* GET home page. */
router.get('/', 
async function(req, res, next) {
  try {
    let topHeadline = await newsController.topHeadline();
    res.render('index', { title: 'Top Headline', data: topHeadline });
} catch (error) {
  console.log("error",error);
  res.render('error');
}
});

router.get('/everything', 
async function(req, res, next) {
  try {
    let everything = await newsController.everything(req.query);
    res.render('everything', { title: 'All News', data: everything });
} catch (error) {
  console.log("error",error);
  res.render('error');
}
});

module.exports = router;
