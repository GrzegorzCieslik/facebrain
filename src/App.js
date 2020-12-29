import './App.css';
import { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from'./components/faceRecognition/FaceRecognition';


var particleOptions = { particles: { number: { value: 20, density: { enable: true, value_area: 500 } } } }

var app = new Clarifai.App({
  apiKey: '774d02dd135d442592c0bd17271d14dd'
});



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }
  calculateFaceLocation = (response) => {
    
    var image = document.getElementById('inputImage');
    var width = Number(image.width);
    var height = Number(image.height);
    var clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }
    // var i;
    // for (i = 0; i < response.outputs[0].data.regions.length; i++) {
    // var clarifaiFaces = response.outputs[0].data.regions[i].region_info.bounding_box;
    //   return {
    //     leftCol: clarifaiFaces[i].left_col * width,
    //     topRow: clarifaiFaces[i].top_row * height,
    //     rightCol: width - (clarifaiFaces[i].right_col * width),
    //     bottomRow: height - (clarifaiFaces[i].bottom_row * height)
    //   }
    // }
  

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log(this.state.input);
 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      // var i;
      // for (i = 0; i < response.outputs[0].data.regions.length; i++)
      // console.log(response.outputs[0].data.regions[i].region_info.bounding_box);
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(error => {
      console.log(error);
    });
    
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <div className='topBar'>
          <Logo />
          <Navigation />
        </div>
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> 
      </div>
    );
  }
}
export default App;
