import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

function GoogleMaps(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })

  const origin = {
    lat: parseFloat(props.originLatitude),
    lng: parseFloat(props.originLongitude)
  }

  const dest = {
    lat: parseFloat(props.destLatitude),
    lng: parseFloat(props.destLongitude)
  }

  const center = {
    lat: (origin.lat + dest.lat) / 2,
    lng: (origin.lng + dest.lng) / 2
  };

  console.log(dest);

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const api_key = process.env.REACT_APP_API_KEY
  
  const onPolygonComplete = polygon => {
    console.log(polygon)
  }

  return (
    <LoadScript
      googleMapsApiKey={api_key}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={origin}
        zoom={13}
      >
        <Marker position={origin} label="Origem" />
        <Marker position={dest} label="Destino" />
      </GoogleMap>
    </LoadScript>
  )

}

export default React.memo(GoogleMaps)