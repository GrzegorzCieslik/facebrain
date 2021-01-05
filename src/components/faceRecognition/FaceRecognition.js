import React from 'react';
import './FaceRecognition.css';
import Boxes from './Boxes'


const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageUrl} width='500px' heigh='auto' />
                <Boxes boxes={boxes} />
            </div>
        </div>
    );
}


export default FaceRecognition;