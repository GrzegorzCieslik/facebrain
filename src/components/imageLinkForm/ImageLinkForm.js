import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'FaceBrain will detect faces in your foto.'}
            </p>
            <div className='center'>
                <div className='center form pa1 br3 shadow-5'>
                    <input className='f4 pa1 w-70 center' type='text' placeholder='Your image URL:' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv 2 dib white bg-light-blue' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );

}
export default ImageLinkForm;