import React, { useEffect, useRef, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { API_MAPS_KEY } from '../apiServiceMaps';
import CategoryItem from './Category-item';
import { useContext } from 'react';
import { Context } from '../context/Context';
// import dotenv from 'dotenv'
// dotenv.config();

// const API_MAPS_KEY = `${process.env.API_MAPS_KEY}`;

const mapStyles = {
  width: '80vh',
  height: '60vh',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

function UserMap (props) {
  const [initialCenter, setInitialCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [clickedPlaces, setClickedPlaces] = useState([initialCenter]);
  const [placeIds, setPlaceIds] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeInfo, setPlaceInfo] = useState([]);
  console.log(placeInfo, 'placeInfo');
  const uniquePlaceIds = [];
  const { closeModal, updateCloseModal } = useContext(Context);
  // TODO: setInitialCenter to be the name of the city
  // TODO: save placeInfo in the database

  useEffect(() => {
    const fetchPlaceIds = async () => {
      const promises = clickedPlaces.map(async (coordinate) => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.lat},${coordinate.lng}&key=${API_MAPS_KEY}`
          );
          if (!response.ok) {
            throw new Error('Error fetching place details');
          }
          const data = await response.json();
          if (data.results.length > 0) {
            const newPlaceId = data.results[0].place_id;
            setPlaceIds(newPlaceId)
            return data.results[0].place_id;
          } else {
            console.error('No results found for the coordinate');
            return null;
          }
        } catch (error) {
          console.error('Error fetching place details:', error);
          return null;
        }
      });

      const resolvedPlaceIds = await Promise.all(promises);


      resolvedPlaceIds.forEach(placeId => {
        if (!uniquePlaceIds.includes(placeId)) {
          uniquePlaceIds.push(placeId);
        }
      })
      console.log(uniquePlaceIds)
      setPlaceIds(uniquePlaceIds);

    };

    fetchPlaceIds();
  }, [clickedPlaces]);

  const placesServiceRef = useRef(null);

  useEffect(() => {
    // Initialize the Places service when the Google Maps API is loaded
    // window.google.maps.event.addDomListener(window, 'load', initializePlacesService);
    window.addEventListener('load', initializePlacesService);

    return () => {
      // Clean up the event listener when the component unmounts
      window.google.maps.event.clearInstanceListeners(window);
    };
  }, []);

  const initializePlacesService = () => {
    placesServiceRef.current = new window.google.maps.places.PlacesService(document.createElement('div'));
  };

  const fetchPlaceDetails = (placeId) => {
    if (placesServiceRef.current) {
      const request = {
        placeId,
        fields: ['place_id', 'name', 'formatted_address', 'opening_hours', 'rating', 'address_components', 'business_status']
      };

      placesServiceRef.current.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log(place);
          // Store the place details:
          setPlaceInfo((prevPlaces) => {
            if (!prevPlaces.find((prevPlace) => prevPlace.place_id === place.place_id)) {
              return [...prevPlaces, place];
            }
            return prevPlaces;
          });
          updateCloseModal(true);
        } else {
          console.error('Error fetching place details:', status);
        }
      });
    }
  };

  const placeId = placeIds[placeIds.length - 1];
  const reverseGeocode = (coordinates) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: coordinates }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          const placeData = {
            address: results[0].formatted_address,
            // Extract any other relevant place information you need
          };

          // Do something with the place data
          console.log(placeData);
        } else {
          console.log('No results found');
        }
      } else {
        console.log(`Geocoder failed due to: ${status}`);
      }
    });
  };

  const handleMapClick = (mapProps, map, clickEvent) => {
    setSelectedPlace(null);
    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const clickedCoordinates = {
      lat: clickEvent.lat,
      lng: clickEvent.lng,
    };

    reverseGeocode(clickedCoordinates);
    const newPlace = { lat, lng }
    setClickedPlaces((prev) => [...prev, newPlace]);
    fetchPlaceDetails(placeId);
  };

  const onMarkerClick = (props, placeId) => {
    setSelectedPlace(placeId);
  };

  const isMarkerSelected = (placeId) => {
    return selectedPlace && selectedPlace.id === placeId;
  };

  // function displayMarkers () {
  //   return clickedPlaces.map((clicked, idx) => {
  //     return <Marker key={idx} id={idx} position={{
  //       lat: clicked.lat,
  //       lng: clicked.lng
  //     }}
  //       onClick={() => console.log("You clicked me!")} />
  //   })
  // }

  return (
    <div className='map-container'>
      <Map
        google={props.google}
        onClick={handleMapClick}
        zoom={14}
        style={mapStyles}
        initialCenter={initialCenter} // Initial center coordinates for the map
      >
        <Marker position={initialCenter}
          onClick={onMarkerClick}
          isSelected={isMarkerSelected(placeId)}
        />
        {/*displayMarkers()*/}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: API_MAPS_KEY // Replace with your Google Maps API key
})(UserMap);
