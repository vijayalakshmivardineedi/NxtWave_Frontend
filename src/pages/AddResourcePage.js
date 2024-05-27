import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddResourcePage.css';
import exampleImage from '../images/landing.jpg'; // Import the image
import logoImage from '../images/logo.png'; // Import the logo image
import userIcon from '../images/user-icon.png'; // Import the user icon
import { Link } from 'react-router-dom';


const AddResourcePage = () => {
  const api ="http://localhost:2000/api";
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    icon_url: '', // Changed to match the naming convention used in the state
    tag_name: '', // Changed to match the naming convention used in the state
    description: '',
    category: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
  
    try {
      await axios.post(`${api}/createResource`, formData);
  
      // Show success message
      alert('Resource added successfully');
  
      // Clear form fields after successful submission
      setFormData({
        name: '',
        link: '',
        icon_url: '',
        tag_name: '',
        description: '',
        category: '',
      });
  
    } catch (error) {
      // Handle error
      console.error('Error creating resource:', error);
      // Show error message
      alert('Error creating resource');
    }
  };
  

  return (
    <div className="add-resource-container">
      <div className="border-container">
        <header className="header">
          <img src={logoImage} alt="Logo" className="logo" />
          <div className="user-section-head">
            <img src={userIcon} alt="User Icon" className="user-icon" />
          </div>
        </header>
        <div className="content">
          <div className="left-section">

          <Link to="/">
            <div className="user-section">
              <strong>&lt;</strong>User
            </div>
          </Link>

            <h2 style={{ textAlign: "center" }}>Item Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Item Title:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Resource Name" />
              </div>
              <div className="form-group">
                <label htmlFor="link">Link:</label>
                <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} placeholder="Enter Link" />
              </div>
              <div className="form-group">
                <label htmlFor="icon_url">Icon URL:</label>
                <input type="text" id="icon_url" name="icon_url" value={formData.icon_url} onChange={handleChange} placeholder="Enter Icon URL" />
              </div>
              <div className="form-group">
                <label htmlFor="tag_name">Tag Name:</label>
                <input type="text" id="tsag_name" name="tag_name" value={formData.tag_name} onChange={handleChange} placeholder="Enter Tag Name" />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} placeholder="Enter Category" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter Description" />
              </div>
              <button className="submit" type="submit">Submit</button>
            </form>
          </div>

          <div className="right-section">
            <img src={exampleImage} alt="Example Image" />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};


export default AddResourcePage;
