import React from 'react';
import './NewAccount.css';


import anytime2 from '../../icons/anytime2.png';
import cosmote from '../../icons/cosmote.png';
import dei from '../../icons/dei.png';
import eydap from '../../icons/eydap.png';
import vodafone from '../../icons/vodafone.png';
import ethniki_asf from '../../icons/ethniki_asf.png';

const logos = [
 
    anytime2,
    cosmote,
    dei,
    eydap,
    ethniki_asf,
    vodafone
];

const NewAccount = () => {
    return (
        <div className="app-container">
            <h1>Add Account</h1>
            <div className="accounts-grid">
                {logos.map((logo, index) => (
                    <div key={index} className="account-item">
                        <img src={logo} alt={`logo-${index}`} className="account-icon" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewAccount;