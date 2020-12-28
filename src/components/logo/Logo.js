import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='m4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 25 }} style={{ height: 163, width: 150 }} >
                <div className="Tilt-inner pa2">
                    <img alt='logo' src={brain}></img>
                    </div>
            </Tilt>
        </div>
    );

}
export default Logo;

