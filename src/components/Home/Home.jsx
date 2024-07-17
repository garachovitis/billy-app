import React, { useState } from 'react';
import './home.css';
import cosmoteLogo from '../../icons/cosmote.png';
import deiLogo from '../../icons/dei.png';
import eydapLogo from '../../icons/eydap.png';
import anytimeLogo from '../../icons/anytime2.png';

const billLogos = {
  'Cosmote': cosmoteLogo,
  'DEI': deiLogo,
  'ΕΥΔΑΠ': eydapLogo,
  'Anytime': anytimeLogo,
};

function Home() {
  const billsByCategory = [
    {
      month: 11, 
      accounts: [
        {
          id: 2,
          logo: billLogos['DEI'],
          name: "ΔΕΗ",
          amount: "50.20",
          details: "Γραφείο ΠΑΤΡΑ",
          dueDate: "2024-12-15"
        },
        {
          id: 1,
          logo: billLogos['Cosmote'],
          name: "Cosmote",
          amount: "35.00",
          details: "Οικία 26108495",
          dueDate: "2024-12-20"
        }
      ],
    },
    {
      month: 0, 
      accounts: [
        {
          id: 7,
          logo: billLogos['Anytime'],
          name: "Anytime",
          amount: "200.00",
          details: "Ferrari",
          dueDate: "2024-01-10"
        },
        {
          id: 6,
          logo: billLogos['ΕΥΔΑΠ'],
          name: "ΕΥΔΑΠ",
          amount: "16.50",
          details: "Εξωχικό ΒΟΥΛΑ",
          dueDate: "2024-01-05"
        },
        {
          id: 4,
          logo: billLogos['Cosmote'],
          name: "Cosmote",
          amount: "38.60",
          details: "Student 26108495",
          dueDate: "2024-01-15"
        },
        {
          id: 5,
          logo: billLogos['DEI'],
          name: "DEI",
          amount: "64.10",
          details: "Ξενοδοχείο Πάτρα",
          dueDate: "2024-01-20"
        },
      ],
    },
  ];

  const getMonthName = (monthIndex) => {
    const monthNames = [
      "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος",
      "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
    ];
    return monthNames[monthIndex];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const previousMonth = (currentMonth === 0) ? 11 : currentMonth - 1;

  const [expandedCategories, setExpandedCategories] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const toggleDropdown = (accountId) => {
    setOpenDropdown((prevState) => (prevState === accountId ? null : accountId));
  };

  const handleOptionClick = (account) => {
    // Logic to show detailed bill can go here
    console.log(`Detailed bill for: ${account.name} - ${account.details}`);
    setOpenDropdown(null);
  };

  const sortedBillsByCategory = billsByCategory.sort((a, b) => b.month - a.month);

  const totalMonthlyExpenses = sortedBillsByCategory.reduce((total, { accounts }) => {
    return total + accounts.reduce((sum, { amount }) => sum + parseFloat(amount.replace(/[^0-9.-]+/g, "")), 0);
  }, 0).toFixed(2);

  return (
    <div className="home-container">
      <div className="progress-summary-wrapper">
        <div className="progress-summary">
          <div className="summary-header">
            <h2>Μηνιαία έξοδα: {totalMonthlyExpenses}€</h2>
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-label">Πληρωμένοι</div>
            <div className="progress-bar">
              <div className="progress-bar-filled"></div>
              <span className="progress-bar-label">3/4</span>
            </div>
          </div>
        </div>
      </div>

      {sortedBillsByCategory.map(({ month, accounts }) => {
        const monthName = getMonthName(month === 0 ? currentMonth : previousMonth);
        const isCategoryOpen = expandedCategories[monthName];
        return (
          <div key={monthName} className="category-section">
            <div className="month-contents-wrapper">
              <h2 className="category-header" onClick={() => toggleCategory(monthName)}>
                {monthName}
                <span className={`arrow ${isCategoryOpen ? 'up' : 'down'}`}></span>
              </h2>
              {isCategoryOpen && (
                <div className="accounts-container">
                  {accounts.map((account) => (
                    <div key={account.id} className={`account-card ${isCategoryOpen ? 'open' : ''}`}>
                      <div className="account-header-box">
                        <span className="account-name">{account.name}</span>
                        <span> </span>
                        <span className="account-details">{account.details}</span>
                      </div>
                      <div className="account-options">
                        <span className="options-dot" onClick={() => toggleDropdown(account.id)}>⋮</span>
                        {openDropdown === account.id && (
                          <div className="dropdown-menu">
                            <div onClick={() => handleOptionClick(account)}>αναλυτικός λογαριασμός</div>
                          </div>
                        )}
                      </div>
                      <img src={account.logo} alt={`${account.name} logo`} className="account-logo" />
                      <div className="account-info">
                        <div className="account-amount">{account.amount}€</div>
                        <div className="account-due-date">Λήξη: {formatDate(account.dueDate)}</div>
                      </div>
                      <div className="account-buttons">
                        <button className="btn btn-pay">Pay</button>
                        <button className="btn btn-schedule">Schedule</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;