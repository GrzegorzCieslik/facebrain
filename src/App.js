import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';

  const particleOptions = {particles: { number: {value: 20, density: { enable: true, value_area: 500}}}}

function App() {
  return (
    <div className="App">
      <Particles className='particles' params={particleOptions} />
      <div className='topBar'>
        <Logo />
        <Navigation />
      </div>
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
