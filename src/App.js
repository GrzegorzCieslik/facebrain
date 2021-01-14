import './App.css';
import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import Particles from 'react-particles-js';


const particleOptions = { particles: { number: { value: 20, density: { enable: true, value_area: 500 } } } }

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (response) => {

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    const clarifaiFaceArray = response.outputs[0].data.regions;
    return clarifaiFaceArray.map(region => {
      const { left_col, top_row, right_col, bottom_row } = region.region_info.bounding_box;
      return {
        leftCol: left_col * width,
        topRow: top_row * height,
        rightCol: width - (right_col * width),
        bottomRow: height - (bottom_row * height)
      }
    })
  }

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://frozen-gorge-02671.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://frozen-gorge-02671.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => {
        console.log(error);
      });
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <div className='topBar'>
          <Logo />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        </div>
        {this.state.route === 'home'
          ? <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
          </div>
          : (
            this.state.route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}
export default App;
