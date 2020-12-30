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

var initialState = {
  input: '',
      imageUrl: '',
      boxes: [],
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  calculateFaceLocation = (response) => {
    
    var image = document.getElementById('inputImage');
    var width = Number(image.width);
    var height = Number(image.height);
    
    const clarifaiFaceArray = response.outputs[0].data.regions;
    return clarifaiFaceArray.map(region => {
      const { left_col,top_row, right_col, bottom_row } = region.region_info.bounding_box;
      return {
        leftCol: left_col * width,
        topRow: top_row * height,
        rightCol: width - (right_col * width),
        bottomRow: height - (bottom_row * height)
      }
    })

}


  displayFaceBox = (boxes) => {
    // console.log(boxes)
    this.setState({boxes: boxes});
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
        <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} /> 
      </div>
    );
  }
}
export default App;
