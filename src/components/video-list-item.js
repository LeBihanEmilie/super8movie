import React from 'react';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";
// je déclare une fonction qui va afficher, quand ca se lance un <li> d'1 film recommandé

const VideoListItem = (props) => {
    const {movie} = props;
    // ce qu'il y a ds les accolades signifie 
    // let movie = props.movie
    // let est une variable modifiable, et on y stocke movie
    //plus besoin de reecrire props.
    
    function handleOnClick(){ 
        console.log('click', movie)
        props.callback(movie);
    }

    return (
        <div>
            <li className="video-group-item" onClick={handleOnClick}>
                <div className="media">
                    <div className="media-left">
                        <img className="media-object img-rounded" height="100px" width="100px" src={`${IMAGE_BASE_URL}${props.movie.poster_path}`}/>
                    </div>
                    <div className="media-body">
                        <h3 className="title_list_item">{props.movie.title}</h3>
                    </div>
                </div>
            </li>
        </div>
    )   
}


export default VideoListItem;