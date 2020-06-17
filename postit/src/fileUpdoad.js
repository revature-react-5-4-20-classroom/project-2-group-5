// import { uploadFile } from 'react-s3';
// import S3FileUpload from 'react-s3'
// import { ReactS3 } from "react-s3";
// import { accessK, pkey } from "./keys";
// import React, { Component } from "react";
// const config = {
//     bucketName: "project-01bucket",
//     dirName: "photos",
//     region: "eu-east-2",
//     accessKeyId: accessK,
//     secretAccessKey: pkey,
// };
// // S3FileUpload
// //     .uploadFile(file, config)
// //     .then(data => console.log(data))
// //     .catch(err => console.error(err))


// // function uploadFile(file, config)
// //     .then(data => console.log(data))
// //     .catch(err => console.error(err))

// export class Pic extends Component {
//     changePic(e) {
//         console.log(e.target.files[0]);
//         S3FileUpload.uploadFile(e.target.files[0], config)
//             .then((data) => {
//                 console.log(data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
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