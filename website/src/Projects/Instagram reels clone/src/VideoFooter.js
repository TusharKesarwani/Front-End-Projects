import React from 'react'
import './VideoFooter.css'
import { Avatar, Button } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Ticker from "react-ticker";
import FavouriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import SendIcon from '@material-ui/icons/Send';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';



function VideoFooter({channel, song, likes,
    shares,avatarSrc }) {
    return (
        <div className="videoFooter">
        <div className="videoFooter__text">
            <Avatar src={avatarSrc} />
                <h3>
                    {channel} . <Button>Follow</Button>
                </h3>
        </div>
        <div className="videoFooter__ticker">
            <MusicNoteIcon
            className ="videoFooter__icon"/> 
            < Ticker mode = "smooth">
                {
                    ({index})=> (
                <>
                  
                    <h1>{song}</h1>   
                    
                </>
                    )}
            </Ticker>
              
        </div>
        <div className="videoFooter__actions">
            <div className="videoFooter__actionsLeft">
                <FavouriteIcon fontsize="large"/>
                <ModeCommentIcon fontsize="large"/>
                <SendIcon fontsize="large"/>
                <MoreHorizIcon fontsize="large"/> 
            </div>
            <div className="videoFooter__actionsRight">
                <div className="videoFooter__stat">
                    <FavouriteIcon/>
                    <p>{likes}</p>
                </div>
                <div className="videoFooter__stat">
                    <ModeCommentIcon/>
                    <p>{shares}</p>   
                </div>
            </div>
        </div>
        </div>              
    )
}

export default VideoFooter
