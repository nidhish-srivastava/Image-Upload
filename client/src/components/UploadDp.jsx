import React, {  useState } from "react";
import user from '../assets/user.png'
import Compress from "react-image-file-resizer";

function UploadDp() {
  const [userImg, setUserImg] = useState(user);
  const [username,setUsername] = useState("")


 //* !!!  Logic for base64 image conversion so that we can preview it as well
  const handleImage = (e) => {
    console.log("asdasd");
    // create a file input dynamically
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    // define a onChange image to read and show the file
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          // onFileResize()

          //* Below it the functionality of on FileResize function which we trigger if we choose a file using input type equals file
          Compress.imageFileResizer(
            file, // the file from input
            480, // width
            480, // height
            "JPEG", // compress format WEBP, JPEG, PNG
            70, // quality
            0, // rotation
            (uri) => {
              // You upload logic goes here
              console.log("uri",uri);
              setUserImg(uri)
            },
            "base64" // blob or base64 default base64
          );
        };
        reader.readAsDataURL(file);
      }
    };
    // simulate a click
    fileInput.click();
  };

  console.log(userImg);

  //* No use right now
  const onFileResize = e =>{
    const file = e.target.files[0];

    Compress.imageFileResizer(
      file, // the file from input
      480, // width
      480, // height
      "JPEG", // compress format WEBP, JPEG, PNG
      70, // quality
      0, // rotation
      (uri) => {
        // You upload logic goes here
        console.log("uri",uri);
        setUserImg(uri)
      },
      "base64" // blob or base64 default base64
    );
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    // const imageUrl = await getCompressedImage(userImg)

    // payload
    let createProfilePayload = {
        // "imageUrl" : userImg,
        "dp" : userImg,
        "username" : username
    }

    // options
    let createProfileOptions = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json;charset=utf-8'
        },
        body : JSON.stringify(createProfilePayload)
    }

    // send req to server
    let profileRes = await fetch('http://localhost:4000/createprofile',createProfileOptions)

    // get the output as a response from the server
    let profileOut = await profileRes.json()
    console.log(profileOut,"Working");
  };

  

  return (
    <div className="container">
      <input type="text" value={username} placeholder="ENter username" onChange={e=>setUsername(e.target.value)}/>
      <div className="dp-wrapper" onClick={handleImage}>
      {/* <div className="dp-wrapper" onClick={onFileResize}> */}
      <img src={userImg}/>
      </div> 
       {/* <input
             type="file"
             id="file"
             accept="image/*"
             onChange={onFileResize}
           /> */}
      <button onClick={handleSubmit}>Done</button>
    </div>
  );
}

export default UploadDp;
