import React, { useState } from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [error, setError] = useState('');

  // Generate time options (8:00 - 20:00)
  const timeOptions = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeOptions.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour < 20) {
      timeOptions.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }

  const handleConfirm = () => {
    // Validation
    if (!selectedDate) {
      setError('Please select a date');
      return;
    }

    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);

    if (end <= start) {
      setError('End time must be after start time');
      return;
    }

    // Pass data to parent
    onConfirm({
      date: selectedDate,
      startTime,
      endTime
    });

    // Reset and close
    setError('');
    onClose();
  };

  const handleCancel = () => {
    setError('');
    onClose();
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleCancel}>×</button>
        
        <h2>Select Booking Date & Time</h2>
        <p className="modal-subtitle">Choose when you want to make your reservation</p>

        <div className="modal-form">
          {/* Date Picker */}
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              required
            />
          </div>

          {/* Time Range */}
          <div className="time-range-group">
            <div className="form-group">
              <label htmlFor="startTime">Start Time</label>
              <select
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="time-separator">→</div>

            <div className="form-group">
              <label htmlFor="endTime">End Time</label>
              <select
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {/* Action Buttons */}
          <div className="modal-actions">
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn-confirm" onClick={handleConfirm}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
