// ContactManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactManagement.css';
import Profile from './Profile'; // Import the new Profile component

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [editingContact, setEditingContact] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [user, setUser] = useState(null); // Add user state for profile

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/contacts');
        setContacts(data.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error.message);
        setMessage('An error occurred while fetching contacts.');
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const filtered = contacts.filter(({ name, email, phone }) =>
      `${name} ${email} ${phone}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);

  const handleOperation = async (url, data, operationMessage) => {
    try {
      await axios[operationMessage](url, data);
      setMessage(`Contact ${operationMessage} successfully.`);

      const { data: updatedData } = await axios.get('http://localhost:5000/contacts');
      setContacts(updatedData.contacts);
      setNewContact({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error(`Error ${operationMessage.toLowerCase()} contact:`, error.message);
      setMessage(`An error occurred while ${operationMessage.toLowerCase()} the contact.`);
    }
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email || !newContact.phone)
      return setMessage('Please fill in all required fields.');
    handleOperation('http://localhost:5000/contacts', newContact, 'post');
  };

  const handleEditContact = () => {
    if (!editingContact || !editingContact.id)
      return setMessage('Invalid contact for editing.');
    handleOperation(`http://localhost:5000/contacts/${editingContact.id}`, editingContact, 'put');
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?'))
      handleOperation(`http://localhost:5000/contacts/${id}`, null, 'delete');
  };

  const handleProfileClick = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/profile'); // Replace with your profile endpoint
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      setMessage('An error occurred while fetching the user profile.');
    }
  };

  return (
    <div className="app-container">
      <div className="contact-management-container">
        <h2>Contact Management</h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <button className="profile-button" onClick={handleProfileClick}>
          View Profile
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Search contacts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul className="contact-list">
          {filteredContacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              {Object.values(contact).join(' - ')}
              <button className="edit-button" onClick={() => setEditingContact(contact)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDeleteContact(contact.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        {editingContact ? (
          <>
            <h3>Edit Contact</h3>
            {/* ... Edit contact form */}
            <button className="edit-button" onClick={handleEditContact}>
              Save Changes
            </button>
          </>
        ) : (
          <>
            <h3>Add a New Contact</h3>
            <div className="add-contact-section">
              <form className="add-contact-form">
                {['Name', 'Email', 'Phone'].map((field) => (
                  <input
                    key={field.toLowerCase()}
                    type={field.toLowerCase() === 'email' ? 'email' : 'text'}
                    placeholder={field}
                    value={newContact[field.toLowerCase()]}
                    onChange={(e) => setNewContact((prev) => ({ ...prev, [field.toLowerCase()]: e.target.value }))}
                  />
                ))}
                <button className="add-contact-button" onClick={handleAddContact}>
                  Add Contact
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      {user && <Profile user={user} />}
    </div>
  );
};

export default ContactManagement;
