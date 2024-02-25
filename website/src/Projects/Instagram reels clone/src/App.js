import React, { useState, useEffect } from 'react';
import './App.css';
import VideoCard from './VideoCard';
// import db from './firebase';

function App() {

    return(

  <div className="app">
       <div className="app__top"> 
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png" alt="" className="app__logo"/>
         <h1>Reels</h1>
       </div>
       {/* image at the top logo     */}
      {/* Reels Text */}


      //  Certain test videos for working however Coonecting to firebase is preffered
       <div className="app__videos">
          <VideoCard 
          url={"https://mobstatus.com/wp-content/uploads/2022/09/Introducing-Indian-Cricket-Team-720P_HD.mp4"}
          likes={1000}
          shares={50}
          channel={"My Channel"}
          avatarSrc={"https://mobstatus.com/wp-content/uploads/2022/09/Introducing-Indian-Cricket-Team-720P_HD.mp4"}
          song={"Indian Team - Records"}
          />

          <VideoCard 
          url={"https://mobstatus.com/wp-content/uploads/2022/09/Indian-cricket-team-attitude-_-Whatsapp-attitude-status_-_shorts-_motivation-_india-_attitude720P_HD.mp4"}
          likes={2000}
          shares={80}
          channel={"Sports Info"}
          avatarSrc={"https://mobstatus.com/wp-content/uploads/2022/09/Indian-cricket-team-attitude-_-Whatsapp-attitude-status_-_shorts-_motivation-_india-_attitude720P_HD.mp4"}
          song={"Indian Team - Off The Field"}
          />

       </div>    
     </div>

  // FOR USING FIREBASE FOLLOWING BELOW CODE CAN BE IMPLEMENTED
  // const [reels, setReels] = useState([]);
  
  // useEffect(() => {
  //   //  App Component will run ONCE when it loads, and never again
  //   db.collection('reels').onSnapshot(snapshot => (
  //     setReels(snapshot.docs.map(doc => doc.data()))
  //   )) 
  // }, [])
  
  // return (
  //   <div className="app">
  //     <div className="app__top"> 
  //       <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png" alt="" className="app__logo"/>
  //       <h1>Reels</h1>
  //     </div>
  //     {/* image at the top logo     */}
  //     {/* Reels Text */}

  //     <div className="app__videos">
  //     {/* Container of app__videos(scrollable content) */}
  //     {reels.map(({channel, avatarSrc, song, url,likes, shares}) => (
  //     <VideoCard
  //     channel = {channel}
  //     avatarSrc = {avatarSrc}
  //     song = {song}
  //     url = {url}
  //     likes = {likes}
  //     shares = {shares}
  //     />
  //     ))}
  //     </div>    
  //   </div>
  //  );
    );
}

export default App;
