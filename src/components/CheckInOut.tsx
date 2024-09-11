import React, { useState } from 'react';
import { checkInChild, checkOutChild } from '../api/api';

interface Props {
  childId: string;
  isCheckedIn: boolean;
  onMessageUpdate: (childId: string, message: string) => void; // 
}

const CheckInOut: React.FC<Props> = ({ childId, isCheckedIn: initialCheckedIn, onMessageUpdate }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(initialCheckedIn);
  const [loading, setLoading] = useState(false); 
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN || '';

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await checkInChild(accessToken, childId, '16:00'); 
      setIsCheckedIn(true); 
      onMessageUpdate(childId, 'Checked in successfully!');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Error checking in!';
      onMessageUpdate(childId, message);
    } finally {
      setLoading(false); 
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await checkOutChild(accessToken, childId);
      setIsCheckedIn(false); 
      onMessageUpdate(childId, 'Checked out successfully!');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Error checking out!';
      onMessageUpdate(childId, message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      {isCheckedIn ? (
        <button className="check-out-btn" onClick={handleCheckOut} disabled={loading}>
          {loading ? 'Processing...' : 'Check Out'}
        </button>
      ) : (
        <button className="check-in-btn" onClick={handleCheckIn} disabled={loading}>
          {loading ? 'Processing...' : 'Check In'}
        </button>
      )}
    </div>
  );
};

export default CheckInOut;
