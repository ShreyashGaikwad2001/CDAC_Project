import React from 'react';
import {MapControl} from '@vis.gl/react-google-maps';

import {PlaceAutocompleteClassic} from './Autocomplete-classic';

export const CustomMapControl = ({
  controlPosition,
  onPlaceSelect,
}) => {
  return (
    <MapControl position={controlPosition}>
      <div className="shadow-sm rounded">
        <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} />
      </div>
    </MapControl>
  );
};
