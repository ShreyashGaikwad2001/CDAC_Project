import {useState} from 'react';
import {ControlPosition} from '@vis.gl/react-google-maps';
import {CustomMapControl} from './Map-control';
import MapHandler from './Map-handler';

const SearchBox = ({onPlaceSelect}) => {

  const [selectedPlace, setSelectedPlace] = useState(null);
  return (
      <>
      <CustomMapControl
        controlPosition={ControlPosition.TOP}
        onPlaceSelect={(e)=>{setSelectedPlace(e); onPlaceSelect(e.formatted_address);}}
      />
      <MapHandler place={selectedPlace} />
      </>
  );
};

export default SearchBox;