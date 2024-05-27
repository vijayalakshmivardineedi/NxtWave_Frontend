import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logoImage from '../images/logo.png';
import userIcon from '../images/user-icon.png';
import { IoSearchSharp, IoAddOutline } from 'react-icons/io5';

import './ResourceList.css';

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [allResourceNames, setAllResourceNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/getAllResources');
        const proxiedResources = await Promise.all(response.data.map(async resource => {
          const proxiedIconUrl = await proxyImageUrl(resource.icon_url);
          return { ...resource, icon_url: proxiedIconUrl };
        }));
        setResources(proxiedResources);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchResourceNames = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/getAllResourceNames');
        setAllResourceNames(response.data);
      } catch (error) {
        console.error('Error fetching resource names:', error);
      }
    };

    fetchResourceNames();
  }, []);

  const proxyImageUrl = async (imageUrl) => {
    try {
      const response = await axios.get(`https://cors-anywhere.herokuapp.com/${imageUrl}`, {
        responseType: 'arraybuffer',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      const base64Image = Buffer.from(response.data, 'binary').toString('base64');
      return `data:image/png;base64,${base64Image}`;
    } catch (error) {
      console.error('Error proxying image:', error);
      return imageUrl;
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'All' || resource.category === filter)
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="add-resource-container">
      <header className="header">
        <img src={logoImage} alt="Logo" className="logo" />
        <div className="user-section-head">
          <Link to="/add" className="add-item-button">
            <IoAddOutline /> Add Item
          </Link>
          <img src={userIcon} alt="User Icon" className="user-icon" />
        </div>
      </header>
      <div className="filter-bar">
        <button className={`filter-button ${filter === 'All' ? 'active' : ''}`} onClick={() => handleFilterChange('All')}>All</button>
        <button className={`filter-button ${filter === 'Dropbox' ? 'active' : ''}`} onClick={() => handleFilterChange('Dropbox')}>Dropbox</button>
        <button className={`filter-button ${filter === 'Slack' ? 'active' : ''}`} onClick={() => handleFilterChange('Slack')}>Slack</button>
      </div>
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <IoSearchSharp className="search-icon" />
        </div>
      </div>
      <div className="resource-list">
        <div className="resource-cards">
          {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
              <div className="resource-card" key={resource._id}>
                <div className="card-left">
                  <img src={resource.icon_url} alt="Icon" className="resource-icon" />
                </div>
                <div className="card-right">
                  <h3>{resource.name}</h3>
                  <p>Description: {resource.description}</p>
                  <p>Link: <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</a></p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-match-found">
              No match found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceList;
