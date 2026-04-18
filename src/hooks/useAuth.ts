import { useState, useEffect, useCallback } from 'react';
import { isAdminLoggedIn, logoutAdmin } from '@/lib/data';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAdminLoggedIn());
  }, []);

  const logout = useCallback(() => {
    logoutAdmin();
    setIsLoggedIn(false);
    window.location.href = '/';
  }, []);

  return { isLoggedIn, logout };
}

export function useRealtimeClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return { time, formattedTime, formattedDate };
}
