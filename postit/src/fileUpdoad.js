// import { uploadFile } from 'react-s3';
// import { ReactDOM } from 'react-dom';
// import S3FileUpload from 'react-s3'
// import { ReactS3 } from "react-s3";
// import { accessK, pkey } from "./keys";
// import React, { Component } from "react";
// const config = {
//     bucketName: "project-01bucket",
//     dirName: "photos",
//     region: "eu-east-2",
//     accessKeyId: "AKIAJOU4HRDJCB7RROBQ",
//     secretAccessKey: "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",
//     ContentType: "image/png",
//     ACL: 'public-read'
// };
// // S3FileUpload
// //     .uploadFile(file, config)
// //     .then(data => console.log(data))
// //     .catch(err => console.error(err))


// // function uploadFile(file, config)
// //     .then(data => console.log(data))
// //     .catch(err => console.error(err))

// // <?xml version="1.0" encoding="UTF-8"?>
// // <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
// // <CORSRule>
// //     <AllowedOrigin>*</AllowedOrigin>
// //     <AllowedMethod>PUT</AllowedMethod>
// //     <AllowedMethod>POST</AllowedMethod>
// //     <AllowedMethod>DELETE</AllowedMethod>
// //     <AllowedHeader>*</AllowedHeader>
// // </CORSRule>
// // </CORSConfiguration>

// export class Pic extends Component {
//     constructor() {
//         super();
//         this.state = {
//             responce: "any",
//             error: "any"
//         };
//     }
//     changePic = async (e) => {
//         console.log(e.target.files[0]);
//         try {
//             this.setState({
//                 responce: await S3FileUpload.uploadFile(e.target.files[0], config),
//                 //                 S3FileUpload
//                 // .uploadFile(file, config)
//                 // .then(data => console.log(data))
//                 // .catch(err => console.error(err))
//             });
//         }
//         // .then((this.state.responce) => {
//         //     console.log(this.state.responce);
//         // })
//         catch (err) {
//             console.error(err)
//             this.setState({
//                 error: err,
//             });
//         }


//     }

//     render() {
//         return (
//             <>
//                 <label htmlFor="">change profile pic</label>
//                 <input type="file" onChange={this.changePic}></input>
//             </>
//         );
//     }
// }