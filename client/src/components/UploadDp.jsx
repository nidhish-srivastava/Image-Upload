import React, { useEffect, useState } from "react";
import user from '../assets/user.png'

function UploadDp() {
  const [userImg, setUserImg] = useState(user);
  const [trigger,setTrigger] = useState(false)
  const [username,setUsername] = useState("")

  const getCompressedImage = async (imgString) => {
    // if greater than 200kb compress
    if (imgString.length > 20000) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // set the canvas dimensions compressed image size
      const maxWidth = 400;
      const maxHeight = 400;

      const image = new Image();
      image.src = imgString;

      // wait for the image to load
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      // calculate the new dimensions based on the maximum size while maintaining the aspect ratio
      let newWidth = image.width;
      let newHeight = image.height;

      if (newWidth > maxWidth) {
        const ratio = maxWidth / newWidth;
        newWidth = maxWidth;
        newHeight = newHeight * ratio;
      }

      if (newHeight > maxHeight) {
        const ratio = maxHeight / newHeight;
        newHeight = maxHeight;
        newWidth = newWidth * ratio;
      }

      // set the canvas dimensions to the new dimensions
      canvas.width = newWidth;
      canvas.height = newHeight;

      // draw the image onto the canvas with the new dimensions
      ctx.drawImage(image, 0, 0, newWidth, newHeight);

      // get the compressed image as a base64-encoded data URL
      // quality range => 1 >= quality >= 0
      const compressedImage = canvas.toDataURL("image/jpg", 1);

      return compressedImage;
    }

    return imgString;
  };

  const handleImage = (e) => {
    // create a file input dynamically
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/jpg";

    // define a onChange image to read and show the file
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setUserImg(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    // simulate a click
    fileInput.click();
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    const dp = await getCompressedImage(userImg)

    // payload
    let createProfilePayload = {
        "dp" : dp,
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
    // setTrigger(e=>!e)
  };

  // const getProfileDp = async()=>{
  //   const response = await fetch(`http://localhost:4000/${username}`)
  //   const data = await response.json()
  //   setUserImg(data[0].dp)
  // }

  // useEffect(()=>{
  //   getProfileDp()
  // },[trigger])
  

  return (
    <div className="container">
      <input type="text" value={username} placeholder="ENter username" onChange={e=>setUsername(e.target.value)}/>
      <div className="dp-wrapper" onClick={handleImage}>
        <img src={userImg} />
      </div>
      <button onClick={handleSubmit}>Done</button>
    </div>
  );
}

export default UploadDp;
