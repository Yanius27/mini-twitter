import React from 'react';
import {BarLoader} from 'react-spinners';

import './Loader.scss';

export default function Loader() {
    return (
        <div className='Loader'>
            <BarLoader
                color='#2ba3fb'
                height='6px'
                width='100px'
                speedMultiplier={3}
            />
        </div>
    );
}
