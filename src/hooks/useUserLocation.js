// src/hooks/useUserLocation.js
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function useUserLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } catch (err) {
        setErrorMsg(err.message ?? 'Error getting location');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { location, errorMsg, loading };
}
