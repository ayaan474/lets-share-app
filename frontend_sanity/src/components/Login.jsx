import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

import { client } from '../client';

import { useEffect } from 'react';
import { gapi } from 'gapi-script';

// function Login(){
//   const navigate = useNavigate();

//   const clientId = "430904298251-61fber8m3ne5abqviupm0qbd76keg0jn.apps.googleusercontent.com";


//   const onSuccess=(res)=>{

//       console.log("hogya",res.profileObj);
//   }


//   const onFailure=(res)=>{

//       console.log("nhi hogya",res);
//   }

//   useEffect(() =>{
//       function start (){
//         gapi.client.init({
//           clientId: clientId,
//           scope: ""
//         })
//       };
  
//       gapi.load('client:auth2', start);
      
  
  
//     })





const Login = () => {

  const clientId = "430904298251-61fber8m3ne5abqviupm0qbd76keg0jn.apps.googleusercontent.com";

  const navigate = useNavigate();
  const onSuccess = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };
  useEffect(() =>{
    function start (){
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
    


  })


// const Login = ()=>{
//     const responseGoogle= (response)=>{
//         console.log(response);
//     }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
               clientId={clientId}
               buttonText="login"
               onSuccess={onSuccess}
              
               cookiePolicy="single_host_origin"
              isSignedIn={true}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
              };

export default Login;
