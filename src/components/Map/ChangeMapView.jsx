import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const ChangeMapView = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center[0] && center[1]) {
      map.setView(center, 15);
    }
  }, [center, map]);

  return null;
};

export default ChangeMapView;