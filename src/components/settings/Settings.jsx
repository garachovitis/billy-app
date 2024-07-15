import React, { useState } from 'react';
import './settings.css'; // Βεβαιωθείτε ότι το αρχείο CSS υπάρχει και έχει τις κατάλληλες στυλιστικές οδηγίες
import userImage from '../../icons/user.png';
import folderIcon from '../../icons/folder.png';
import plusIcon from '../../icons/plus.png';

const Settings = () => {
    const [isAddAccountModalOpen, setAddAccountModalOpen] = useState(false);
    const [accountName, setAccountName] = useState("");

    const navigateAddAccount = () => {
        setAddAccountModalOpen(true);
    };

    const closeModal = () => {
        setAddAccountModalOpen(false);
    };
    const handleAddAccount = () => {
        console.log("Adding account:", accountName); // Implement your addition logic here
        closeModal();
    };

    const handleInputChange = (event) => {
        setAccountName(event.target.value);
    };

    return (
        <div className="settings">
            <div className="searchBar">
                {/* Προσθέστε εδώ τον κώδικα για την μπάρα αναζήτησης */}
            </div>
            <div className="profileGroup">
                <div className="userProfile" onClick={() => { }}>
                    <img src={userImage} alt="Profile" />
                    <span>Προφίλ</span>
                </div>
                <div className="accountButton" onClick={() => { }}>
                    <img src={folderIcon} alt="Accounts" />
                    <span>Λογαριασμοί</span>
                </div>
                <div className="addAccountButton" onClick={navigateAddAccount}>
                    <img src={plusIcon} alt="Add" />
                    <span>Προσθήκη Λογαριασμού</span>
                </div>
            </div>
            <div className="toggleGroup">
                <div className="toggleButton">
                    {/* Προσθέστε εδώ τον κώδικα για τον διακόπτη Dark/Light mode */}
                    <span>Dark/Light Mode</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
            {isAddAccountModalOpen && (
                <div className="modal">
                    <div className="modalContent">
                    <input type="text" placeholder="Εισάγετε Rf Λογαριασμού" className="inputBox" value={accountName} onChange={handleInputChange} />
                        <button onClick={handleAddAccount} className="roundedButton">Προσθήκη</button>
                    </div>
                    <div className="modalOverlay" onClick={closeModal}></div>
                </div>
            )}
        </div>
    );
};

export default Settings;
