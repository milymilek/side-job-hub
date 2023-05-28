import React from 'react';
import default_icon from './default.jpg';

const Offer = ({offer}) => {
    console.log(offer);
    return (
        <div className='offer'>
          <div>
            <img src={default_icon}/>
          </div>

          <div>
            <h3> {offer.name}</h3>
          </div>

          <div>
            <h5> {offer.price}</h5>
          </div>

          <div>
            <h5> {offer.availability}</h5>
          </div>

          <div>
            <h5> {offer.contact}</h5>
          </div>
        </div>
    );
}

export default Offer