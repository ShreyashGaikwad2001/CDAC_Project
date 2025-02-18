import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Directions from './directions/Direction';
import SearchBox from './searchWithAutocomplete/SearchBox';
import { useState, useEffect, useCallback } from 'react';
import axios from '../axios';
import { backend } from '../config';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function MapWithDirection({ from, to, setLotData }) {
  const [fromLocation, setFromLocation] = useState('pune');
  const [toLocation, setToLocation] = useState('pune');
  const [currentPinCode, setCurrentPinCode] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');

  // useCallback to prevent unnecessary re-renders and avoid infinite loops
  const setLotDataWithPinCode = useCallback(
    (pincode) => {
      console.log('Searching with pincode:', pincode);
      if (!pincode) return; // Prevent API call with empty pincode

      axios
        .post(backend.url + 'parking/search', { pincode: pincode })
        .then((res) => {
          console.log('Parking data (pincode):', res.data);
          setLotData(res.data); 
        })
        .catch((err) => {
          console.error('Error searching parking by pincode:', err);
        });
    },
    [setLotData]
  );

  const setLotDataWithString = useCallback(
    (address) => {
      console.log('Searching with address:', address);
      if (!address) return; // Prevent API call with empty address

      axios
        .post(backend.url + 'parking/search', { address: address })
        .then((res) => {
          console.log('Parking data (address):', res.data);
          setLotData(res.data);
        })
        .catch((err) => {
          console.error('Error searching parking by address:', err);
        });
    },
    [setLotData]
  );

  /*
			sample results object returned by geocoder api
			{
				"results": [
					{
					"address_components": [
						{
						"long_name": "Mountain View",
						"short_name": "Mountain View",
						"types": [
							"locality",
							"political"
						]
						},
						{
						"long_name": "Santa Clara County",
						"short_name": "Santa Clara County",
						"types": [
							"administrative_area_level_2",
							"political"
						]
						},
						{
						"long_name": "California",
						"short_name": "CA",
						"types": [
							"administrative_area_level_1",
							"political"
						]
						},
						{
						"long_name": "United States",
						"short_name": "US",
						"types": [
							"country",
							"political"
						]
						},
						{
						"long_name": "94043",
						"short_name": "94043",
						"types": [
							"postal_code"
						]
						}
					],
					"formatted_address": "Mountain View, CA 94043, United States",
					"geometry": {
						"location": {
						"lat": 37.399557,
						"lng": -122.084062
						},
						"location_type": "ROOFTOP",
						"viewport": {
						"northeast": {
							"lat": 37.4322437,
							"lng": -122.0513753
						},
						"southwest": {
							"lat": 37.3668703,
							"lng": -122.1167487
						}
						}
					},
					"place_id": "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
					"types": [
						"locality",
						"political"
					]
					}
				],
				"status": "OK"
			}
   */
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const latlng = { lat: latitude, lng: longitude };

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === 'OK') {
              if (results[0]) {
                const formattedAddress = results[0].formatted_address;
                setFromLocation({ lat: latitude, lng: longitude });
                setCurrentAddress(formattedAddress);

                const addressComponents = results[0].address_components;
                const pincodeComponent = addressComponents.find(component =>
                  component.types.includes("postal_code")
                );

                if (pincodeComponent) {
                  const pincode = pincodeComponent.long_name;
                  setCurrentPinCode(pincode);
                  setLotDataWithPinCode(pincode);
                } else {
                  console.warn("Pincode not found in address components");
                  setLotDataWithString(formattedAddress); // Fallback to address search
                }
              } else {
                console.error('No results found');
              }
            } else {
              console.error('Geocoder failed due to: ' + status);
            }
          });
        },
        (error) => {
          console.error("Error getting user's location:", error);
          if (!(from && fromLocation)) {
            const enteredLocation = prompt('Please enter your location');
            if (enteredLocation) {
              setFromLocation(enteredLocation);
              setLotDataWithString(enteredLocation);
            }
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  useEffect(() => {
    if (currentPinCode) {
      setLotDataWithPinCode(currentPinCode);
    }
  }, [currentPinCode, setLotDataWithPinCode]);

  return (
    <div
      className="container border border-3 border-primary g-0"
      style={{ height: '100%' }}
    >
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultZoom={10}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          id="gmap"
          mapId="8c732c82e4ec29d9"
          disableDefaultUI={true}
          zoomControl={true}
          streetViewControl={true}
          style={{ width: '100%', height: '100%' }}
        >
          <SearchBox
            onPlaceSelect={(d) => {
              setToLocation(d);
              setLotDataWithString(d);
            }}
          />
          <Directions
            key={`${fromLocation}-${toLocation}`}
            from={fromLocation === '' ? from : fromLocation}
            to={toLocation === '' ? to : toLocation}
          />
        </Map>
      </APIProvider>
    </div>
  );
}
