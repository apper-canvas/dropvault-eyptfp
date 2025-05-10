/**
 * Activity Data Service - Simulates real-time data updates
 * This service mimics a WebSocket connection for real-time activity data
 */

// Store for active subscribers
const subscribers = new Set();

// Generate random activity data with a realistic pattern
const generateActivityData = () => {
  // Base patterns - workdays have more activity than weekends
  const day = new Date().getDay(); // 0-6, 0 = Sunday
  const isWeekend = day === 0 || day === 6;
  const hour = new Date().getHours();
  
  // Business hours have more activity
  const isBusinessHours = hour >= 9 && hour <= 17;
  
  // Base multipliers based on time patterns
  const uploadMultiplier = isWeekend ? 0.6 : (isBusinessHours ? 1.2 : 0.8);
  const downloadMultiplier = isWeekend ? 0.8 : (isBusinessHours ? 1.0 : 0.7);
  
  // Create data for past 7 days with current day as the last day
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay() || 7; // Convert Sunday from 0 to 7 for math
  const daysOrdered = [...days.slice(today - 1), ...days.slice(0, today - 1)];
  
  // Generate upload data with realistic patterns
  const uploads = daysOrdered.map((_, index) => {
    const isToday = index === 6;
    const baseValue = Math.floor(Math.random() * 30) + 20;
    // Today's data randomly increases for real-time effect
    if (isToday) {
      return Math.floor(baseValue * uploadMultiplier * (0.9 + Math.random() * 0.4));
    }
    return Math.floor(baseValue * (0.8 + Math.random() * 0.4));
  });
  
  // Generate download data with realistic patterns
  const downloads = daysOrdered.map((_, index) => {
    const isToday = index === 6;
    const baseValue = Math.floor(Math.random() * 20) + 10;
    // Today's data randomly increases for real-time effect
    if (isToday) {
      return Math.floor(baseValue * downloadMultiplier * (0.9 + Math.random() * 0.4));
    }
    return Math.floor(baseValue * (0.8 + Math.random() * 0.4));
  });
  
  return {
    categories: daysOrdered,
    series: [
      { name: 'Uploads', data: uploads },
      { name: 'Downloads', data: downloads }
    ],
    lastUpdated: new Date().toISOString()
  };
};

// Notify all subscribers with new data
const notifySubscribers = () => {
  const data = generateActivityData();
  subscribers.forEach(callback => callback(data));
};

// Service APIs
export const connectToActivityStream = (callback) => {
  subscribers.add(callback);
  
  // Initial data
  setTimeout(() => callback(generateActivityData()), 100);
  
  // Set up periodic updates
  const intervalId = setInterval(notifySubscribers, 8000);
  return intervalId;
};

export const disconnectFromActivityStream = (intervalId, callback) => {
  clearInterval(intervalId);
  subscribers.delete(callback);
};