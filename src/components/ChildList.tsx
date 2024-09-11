import React, { useState, useEffect } from 'react';
import { fetchChildren } from '../api/api';
import { Child } from '../types/child';
import CheckInOut from './CheckInOut';
import './css/ChildList.css';

const ChildList: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [messages, setMessages] = useState<{ [key: string]: string }>({});

  const accessToken = process.env.REACT_APP_ACCESS_TOKEN || '';
  const groupId = process.env.REACT_APP_GROUP_ID || '';
  const institutionId = process.env.REACT_APP_INSTITUTION_ID || '';

  const loadChildren = async () => {
    setIsLoading(true);
    try {
      const data = await fetchChildren(accessToken, groupId, institutionId);
      if (Array.isArray(data)) {
        setChildren((prevChildren) => [...prevChildren, ...data]);
      } else if (data.children && Array.isArray(data.children)) {
        setChildren((prevChildren) => [...prevChildren, ...data.children]);
      } else {
        console.error('Error: Expected an array but got:', data);
      }
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChildren();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMessageUpdate = (childId: string, message: string) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [childId]: message,
    }));

    setChildren((prevChildren) =>
      prevChildren.map((child) =>
        child.childId === childId
          ? { ...child, checkedIn: message.includes('Checked in'), pickupTime: message.includes('Checked in') ? '16:00' : '' }
          : child
      )
    );
  };

  return (
    <div>
      <h2>Children List</h2>
      <ul className="children-list">
        <li className="header-row">
          <span>Name</span>
          <span>Pick Up Time</span>
          <span>Action</span>
        </li>
        {children.map((child) => (
          <li key={child.childId} className="child-row">
            <span>{child.name.fullName}</span>
            <span>{child.checkedIn ? '16:00' : ''}</span>
            <CheckInOut
              childId={child.childId}
              isCheckedIn={child.checkedIn}
              onMessageUpdate={handleMessageUpdate}
            />
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading more children...</p>}
    </div>
  );
};

export default ChildList;
