import React, { useState } from 'react';
import Modal from 'react-modal';
import './categories.css'; 

Modal.setAppElement('#root'); // This line is necessary for accessibility reasons

const Categories = () => {
  const [cat, setCat] = useState([
    { id: 1, icon: '🏢', title: 'Billy Office' },
    { id: 2, icon: '🏠', title: 'Student House' },
    { id: 3, icon: '🏡', title: 'Home' },
    { id: 4, icon: '📱', title: 'Mobiles' },
    { id: 5, icon: '🏨', title: 'Naxos Hotel' },
    { id: 6, icon: '🏎️', title: 'Cars' },
  ]);

  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addCategory = () => {
    if (newCategoryTitle && newCategoryIcon) {
      const newCategory = {
        id: cat.length + 1,
        icon: newCategoryIcon,
        title: newCategoryTitle,
      };
      setCat([...cat, newCategory]);
      setNewCategoryTitle('');
      setNewCategoryIcon('');
      setIsModalOpen(false);
    } else {
      alert('Please enter both an emoji and a category name.');
    }
  };

  const closeModal = () => {
    setNewCategoryTitle('');
    setNewCategoryIcon('');
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <div className="categories-grid">
        {cat.map((category) => (
          <button className="category-item" key={category.id}>
            <span className="category-icon">{category.icon}</span>
            <span className="category-title">{category.title}</span>
          </button>
        ))}
      </div>
      <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>Add Category</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Category Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button className="close-modal-btn" onClick={closeModal}>X</button>
        <h3>Add New Category</h3>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter category name"
            value={newCategoryTitle}
            onChange={(e) => setNewCategoryTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter emoji"
            value={newCategoryIcon}
            onChange={(e) => setNewCategoryIcon(e.target.value)}
          />
        </div>
        <button className="add-category-btn" onClick={addCategory}>Add Category</button>
      </Modal>
    </div>
  );
};

export default Categories;