import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import { Component } from 'react';

const particleOptions = { particles: { number: { value: 20, density: { enable: true, value_area: 500 } } } }

// function App() {
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    }
  }
  onInputChange = (event) => {
    console.log(event.target.value);
  }
  onButtonSubmit = () =>{
    console.log('click')
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
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}
export default App;
