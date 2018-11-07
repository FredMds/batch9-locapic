var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'djs0e7r4x',
  api_key: '889663946126798',
  api_secret: 'P8eQzbJP6Nd0Z5lGuZRCmsB20vw'
});

var mongoose= require('mongoose');
var options = { server: { socketOptions: {connectTimeoutMS: 5000 } }};
mongoose.connect('mongodb://FredMds:azerty01@ds153763.mlab.com:53763/locapic-cloudinary',
    options,
    function(err) {
     console.log(err);
    }
);

var pictureSchema = mongoose.Schema({
  url:String
})
var pictureModel = mongoose.model('picture', pictureSchema)



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// NOM DE PHOTO DYNMIC
var i = 0;

// FILEPATH DYNAMIC >> DRY (don't repeat yourself! Aka Thierry!)
let photoPath = `public/images/nomImageAChoisir-${i}.jpg`;

router.post('/upload', function(req, res) {

i++;
  //recup l'image depuis le front
let filename = req.files.photo;

// envoyer l'image dans le dossier public/images en mettant le nom et le format de l'image
 filename.mv(photoPath, function(err) {
   if (err){
     return res.status(500).send(err);
   }
   cloudinary.v2.uploader.upload(photoPath,
    function(error, result){
      if(result){

        var newPicture = new pictureModel({
          url:result.secure_url
        })
        newPicture.save(function(err, picture){
          console.log("photo OK");
        })

        res.send(`File uploaded --> ${result}`);
      } else if (error) {
        res.send(error);
      }
    });
    // res.send à intégrer dans la fonction de call back
 });
});



router.get('/displayPicture', function(req, res, next) {

  pictureModel.find(function(err, picture){
    console.log("PHOTO RECUP",picture);
    res.json(picture)
  })

});



module.exports = router;
