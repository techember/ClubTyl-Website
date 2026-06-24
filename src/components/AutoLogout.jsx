import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/slices/userSlice';

const AutoLogout = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes in milliseconds

  const handleLogout = () => {
    if (user) {
      dispatch(logoutUser());
      navigate('/login');
      alert('You have been logged out due to 15 minutes of inactivity.');
    }
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (user) {
      timerRef.current = setTimeout(handleLogout, INACTIVITY_LIMIT);
    }
  };

  useEffect(() => {
    if (!user) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // Set initial timer
    resetTimer();

    // Events to track user activity
    const events = [
      'mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'
    ];

    const activityListener = () => {
      resetTimer();
    };

    events.forEach(event => window.addEventListener(event, activityListener));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => window.removeEventListener(event, activityListener));
    };
  }, [user, navigate, dispatch]);

  return null;
};

export default AutoLogout;
