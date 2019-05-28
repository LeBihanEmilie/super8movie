import React from 'react';
import VideoListItem from '../components/video-list-item';

const VideoList = (props) => {
    const{movieList} = props;

    return(
        <div>
            <ul>
                {/* on va venir bouclé sur movies, avec la fonction map,qui fonctionne sur les tableaux.
                On va envoyé comme paramètre le nom de chaque titre de movie.
                 on dit pour chaque movie, tu nous retournes : 1 viddeoListItem, et movie */}
                {movieList.map(movie => {
                  return <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack}/>
                  }
                )
                }
            </ul>
        </div>
    );
    function receiveCallBack (movie){
        props.callback(movie)
    }  
}

export default VideoList;

// chaque videoListItem va recevoir dans sses props un iem
