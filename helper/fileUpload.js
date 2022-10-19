// const {google} = require('googleapis');
// const fs = require('fs');
// const { fileURLToPath } = require('url');

// const outhClient = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     'https://developers.google.com/oauthplayground'
// )
// outhClient.setCredentials({refresh_token:process.env.REFRESH_TOKEN})

// const drive = google.drive({
//     version:'v3',
//     auth:outhClient
// })


// async function fileUpload(req,res){
//     try {
//         const response = await drive.files.create({
//             requestBody:{
//                 name:req.file.originalname,
//                 mimeType:req.file.mimetype
//             },
//             media:{
//                 mimeType:req.file.mimetype,
//                 body:fs.createReadStream(req.file.path)
//             }
//         })

//     } catch (error) {
//         res.status(500).send({
//             status: false,
//             message: "File Not Upload"
//         })
        
//     }
// }


const uploader = multer({
    dst:'uploads/',
    fileFilter:(req,file,cb)=>{
    
    }
})