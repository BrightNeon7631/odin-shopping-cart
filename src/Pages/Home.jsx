import openImage from '../assets/images/open.jpg';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className='home-container'>
            <div className='home-left'>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                <Link className='home-button' to='/store'>Shop now</Link>
            </div>
            <img className='home-img' src={openImage} />
        </div>
    )
}