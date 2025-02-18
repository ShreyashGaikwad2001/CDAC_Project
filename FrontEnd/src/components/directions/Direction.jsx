import React, {useEffect, useState} from 'react';
import {
    useMapsLibrary,
    useMap
  } from '@vis.gl/react-google-maps';

import './directions.css';

export default function Directions(props) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [isVisible, setIsVisible] = useState(true);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];
    
    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
    }, [routesLibrary, map]);


    
    // Use directions service
    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;
    
        directionsService
        .route({
            origin: props.from,
            destination: props.to,
            travelMode: 'DRIVING',
            provideRouteAlternatives: true
        })
        .then(response => {
            directionsRenderer.setDirections(response);
            setRoutes(response.routes);
        }).catch(e => alert(e));
    
        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer]);
    
    // Update direction route
    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);
    
    if (!isVisible|!leg) return null;
    return (
        <div className="directions p-3 bg-dark text-white rounded shadow-lg">
      <button
        className="btn btn-outline-danger float-end rounded-circle shadow"
        onClick={() => {
          setIsVisible(false);
        }}
        style={{ width: "2.5rem", height: "2.5rem", padding: 0 }}
      >
        <span style={{ fontSize: "1.2rem" }}>&times;</span>
      </button>
      <div className="container">
        <h6 className="text-center mb-3">
          <u>{selected.summary}</u>
        </h6>
        <p className="mb-1">
          <strong>From:</strong> {leg.start_address.split(",")[0]}
        </p>
        <p className="mb-1">
          <strong>To:</strong> {leg.end_address.split(",")[0]}
        </p>
        <p className="mb-1">
          <strong>Distance:</strong> {leg.distance?.text}
        </p>
        <p className="mb-3">
          <strong>Duration:</strong> {leg.duration?.text}
        </p>

        <h5 className="text-center mt-4">Other Routes</h5>
        <ul className="list-unstyled text-center">
          {routes.map((route, index) => (
            <li key={route.summary} className="mb-2">
              <button
                className="btn btn-outline-light"
                onClick={() => setRouteIndex(index)}
              >
                {route.summary}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
}

    