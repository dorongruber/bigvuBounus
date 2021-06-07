const express = require('express');
const https = require('https');
const http = require('http');
const IMGURL = 'https://bigvu-interviews-assets.s3.amazonaws.com/presenters.json';
const request = require('request');
const router = express.Router();




// router.get('/images', (req, res, next) => {
//   const options = {
//     hostname: 'https://bigvu-interviews-assets.s3.amazonaws.com',
//     path: '/presenters.json',
//     method: 'GET',
//     headers: req.headers
//   }
//   console.log('get images -> ', options.headers);
//   try {
//     // https.get(IMGURL, (resulte => {
//     //   console.log('router get image list -> ', resulte);
//     //   res.status(200).json(resulte);
//     // }));
//     const request = https.request(options, res => {
//       console.log('statuscode -> ', res.statusCode);

//       res.on('data', d => {
//         console.log('returend data -> ', d);
//       });

//       res.on('error', error => {
//         console.log('error -> ', error);
//       })
//     })
//   } catch (err) {
//     console.log('get request error -> ', err);
//     res.status(404).json(err);
//   }
// });

router.get('/images', (req, res, next) => {
  request({
    url: IMGURL,
    json: true
  },(err, response, body) => {
    console.log('body -> ', body);
    res.status(200).json(body);
  })
});


export default router;
