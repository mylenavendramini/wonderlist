import React, { useContext, useEffect, useRef, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import CategoryItem from './Category-item';
import { useLocation, useParams } from 'react-router';
// import apiService from '../apiService';
import { Context } from '../context/Context';

const API_MAPS_KEY = process.env.REACT_APP_API_MAPS_KEY2;

const mapStyles = {
  width: '100vh',
  height: '60vh',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -0%)',
  border: '2px solid var(--primary)',
  boxShadow: '0px 15px 10px -15px black',
  borderRadius: '5px'
};

function UserMap (props) {
  const [initialCenter, setInitialCenter] = useState({ lat: 51.5055, lng: 0.0754 });
  const [clickedPlaces, setClickedPlaces] = useState([]);
  const [placeIds, setPlaceIds] = useState([]);
  // for the marker:
  const [selectedPlace, setSelectedPlace] = useState(null);

  const location = useLocation();
  const { category, travelCol } = location.state;
  const { id } = useParams();

  const cityName = travelCol.details.cityName;
  const placeId = placeIds[placeIds.length - 1];

  const { placeInfo, updatePlaceInfo } = useContext(Context)

  const uniquePlaceIds = [];

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
          return newPlaceId;
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
    setPlaceIds(uniquePlaceIds);
  };

  useEffect(() => {
    fetchPlaceIds()
    if (placeId) {
      fetchPlaceDetails(placeId);
    }
  }, [clickedPlaces]);


  const placesServiceRef = useRef(null);

  useEffect(() => {
    // Initialize the Places service when the Google Maps API is loaded
    initializePlacesService();

    return () => {
      // Clean up the event listener when the component unmounts
      window.google.maps.event.clearInstanceListeners(window);
    };

  });

  async function getInitialCity (cityName) {
    return getCoordinates(cityName).then((data) => {
      // console.log(data);
      // setInitialCity(data);
      setInitialCenter(data);
      return data;
    });
  }

  useEffect(() => {
    getInitialCity(cityName).then((city) => {
      setInitialCenter(city);
    });
  }, [cityName]);

  // console.log({ initialCenter })


  const initializePlacesService = () => {
    placesServiceRef.current = new window.google.maps.places.PlacesService(document.createElement('div'));
  };

  const fetchPlaceDetails = (placeId) => {
    if (placesServiceRef.current) {
      const request = {
        placeId,
        fields: ['place_id', 'name', 'formatted_address'],
        types: ['restaurant', 'bar', 'airport', 'supermarket', 'cafe']
      };

      placesServiceRef.current.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log({ place });
          // Store the place details:
          updatePlaceInfo((prevPlaces) => {
            if (!prevPlaces.find((prevPlace) => prevPlace.place_id === place.place_id)) {
              return [...prevPlaces, place];
            }
            return prevPlaces;
          });
          // localStorage.setItem('placeInfo', JSON.stringify([...placeInfo, place]));
        } else {
          console.error('Error fetching place details:', status);
        }
      });
    }
  };

  // useEffect(() => {
  //   const storedPlaceInfo = localStorage.getItem('placeInfo');
  //   if (storedPlaceInfo) {
  //     updatePlaceInfo(JSON.parse(storedPlaceInfo));
  //   }
  // }, []);
  async function getCoordinates (cityName) {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${API_MAPS_KEY}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results.length > 0) {
        const coordinates = data.results[0].geometry.location;
        return coordinates;
      } else {
        throw new Error('No results found for the specified city.');
      }
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }




  // const reverseGeocode = (coordinates) => {
  //   const geocoder = new window.google.maps.Geocoder();

  //   geocoder.geocode({ location: coordinates }, (results, status) => {
  //     if (status === window.google.maps.GeocoderStatus.OK) {
  //       if (results[0]) {
  //         console.log(results[0]);
  //         const placeData = {
  //           address: results[0].formatted_address,
  //           // Extract any other relevant place information you need
  //         };

  //         // Do something with the place data
  //         console.log(placeData, 'placeData');
  //       } else {
  //         console.log('No results found');
  //       }
  //     } else {
  //       console.log(`Geocoder failed due to: ${status}`);
  //     }
  //   });
  // };

  const handleMapClick = (mapProps, map, clickEvent) => {
    setSelectedPlace(null);

    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();
    // const clickedCoordinates = { lat, lng };
    // reverseGeocode(clickedCoordinates);
    const newPlace = { lat, lng }
    console.log({ clickEvent });
    console.log({ newPlace })
    setClickedPlaces((prev) => [...prev, newPlace]);
    // fetchPlaceDetails(placeId);
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


  // Autocomplete:

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "ng" },
    fields: ['place_id', 'name', 'formatted_address'],
    types: ['establishment']
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      console.log(place.name);
      console.log({ place });
      updatePlaceInfo((prevPlaces) => {
        if (!prevPlaces.find((prevPlace) => prevPlace.place_id === place.place_id)) {
          return [...prevPlaces, place];
        }
        return prevPlaces;
      });
    });
  }, []);





  return (
    <div className='map-container'>

      <CategoryItem category={category} travelCol={travelCol} />
      <Map
        google={props.google}
        onClick={handleMapClick}
        yesIWantToUseGoogleMapApiInternals
        zoom={14}
        style={mapStyles}
        initialCenter={initialCenter} // Initial center coordinates for the map
        className='test'
      >
        <div className='map-form'>
          <input ref={inputRef} />
        </div>
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
