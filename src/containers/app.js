import React, { Component } from 'react';
import SearchBar from '../components/search-bar';
import Header from '../components/header'
import VideoList from './video-list';
import VideoDetail from '../components/video-detail';
import Video from '../components/video';
import axios from 'axios';

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&api_key=3f5c8457b6718679cbf70c4b1ea4491d"
const API_KEY = "3f5c8457b6718679cbf70c4b1ea4491d"
const SEARCH_URL = "search/movie?language=fr&include_adult=false²"

// Quand la classe va être crée , elle va rentrer dans le constructor, créer dans son state à vide.Et rentrer dans le componentdidmount

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      movieList:{},
      //movieList contient les filmes les plus populaires
      currentMovie:{}
    }
    //ce state correspond à l'ensemble des films qui seront dans ma page
  }

  componentWillMount = () => {
    this.initMovies();
  }

  initMovies(){
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
      .then(function(response){
        this.setState({movieList:response.data.results.slice(1,6), currentMovie:response.data.results[0]}, function(){
        this.applyVideoToCurrentMovie();
        })
      }.bind(this)
    );
  }

  receiveCallBack(movie){
    this.setState({currentMovie: movie},function(){
      this.applyVideoToCurrentMovie();
    })
  }

  applyVideoToCurrentMovie(){
     axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`)
  .then(function(response){
    const youtube_Key = response.data.videos.results[0].key;
    let newCurrentMovieState = this.state.currentMovie;
    newCurrentMovieState.videoId = youtube_Key;
    this.setState({currentMovie: newCurrentMovieState})
    console.log(newCurrentMovieState)
      }.bind(this)
    );
  }

  setRecommendation(){
    axios.get(`${API_END_POINT}movie?${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`)
    .then(function(response){
      //qd on récupère des films on met à jour notre state.
      this.setState({movieList: response.data.results.slice(0,5)})
    }.bind(this));
  }


  onClickListItem(movie){
    this.setState({currentMovie: movie}, function(){
      this.applyVideoToCurrentMovie();
      this.setRecommendation();
    })
  }

  onClickSearch(searchText){
    //on vérifie que du texte est envoyé, avanrt de commencer à faire un requête
    if(searchText){
      axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`)
      .then(function(response){
        //puis on vérifie qu'on a bien une réponse
    if(response.data && response.data.results[0]){
      //Si ce film a déjà été recherché, pas besoin de lancer une nvelle recherche
      // on vérifie que le résultat que l'on recoit est bien différent du nouveau film que l'on recoit, dc ici on compare les id de films.
      // l'id du currentMovie doit etre différente de la recherche
      if(response.data.results[0].id != this.state.currentMovie.id){
        //une fois que le résultat nous convient
        //ici on a une fonction abnonyme en callback, pour etre sur
        this.setState({currentMovie: response.data.results[0]},() => {
          this.applyVideoToCurrentMovie();
          this.setRecommendation();
        })}
      }})
    }}


  render() {
    const renderVideoList = () => {
      if(this.state.movieList.length>=5){
        return <VideoList movieList={this.state.movieList} callback={this.onClickListItem.bind(this)} />
      }
    }
    return (
      <div>
        <div className="header">
        <Header />
        </div>
        <div className="search_bar">
        <SearchBar callback={this.onClickSearch.bind(this)}/>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail 
              title={this.state.currentMovie.title} 
              description={this.state.currentMovie.overview} />
          </div>
          <div className="col-md-4">
            {renderVideoList()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;

//current movie est la réponse ajax recue

// ${API_END_POINT}movie/[movieId]?append_to_response=videos&include_adult=false&${API_KEY}

// ${API_END_POINT}movie/[movie.id]?append_to_response=videos&include_adult=false&${API_KEY}