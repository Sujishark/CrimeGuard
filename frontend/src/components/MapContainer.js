/*global google*/

import React, { useEffect, useState } from 'react';
import { GoogleMap, HeatmapLayer, InfoWindow, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import heatMapRepo from '../assets/heatmap-data.json'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// const setup = {
//     googleMapsApiKey: "AIzaSyAIzmJyl1MUmBVX8BI4ay_w0Wi6nhUJa-A",
//     libraries: ["visualization"]
// }
export const MapContainer = ({ year }) => {
    const acData = useSelector(state => state.home.latestActivity)
    const uData = useSelector(state => state.user.user)

    const [heatmapData, setHeatmapData] = useState([])
    const [markers, setMarkers] = useState([])
    // const { isLoaded } = useJsApiLoader(setup)
    const [selectedMarker, setSelectedMarker] = React.useState(null);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };

    const handleInfoWindowClose = () => {
        setSelectedMarker(null);
    };

    useEffect(() => {
        let markerList = []
        if (acData.length) {
            acData.map((data) => {
                markerList.push({
                    id: 1,
                    position: { lat: data.crimeLocation.x, lng: data.crimeLocation.y },
                    iconType: 1,
                    info: () =>
                        <>
                            <h3><Link to={`/incident/${data.crimeId}`}>{data.crimeId}</Link></h3>
                            <p>{`${data.crimeType} at a`}</p>
                            <p>{`${data.crimePlace} `}</p>
                            <p>{`at ${data.crimeAddress}`}</p>
                        </>
                })
            })
            if (uData) {
                markerList.push({
                    id: 69,
                    position: { lat: uData.location.x, lng: uData.location.y },
                    iconType: 2,
                    info: () => <p>{'You'}</p>
                })
            }
            setMarkers(markerList)
        }
    }, [acData])

    //schnucks urbana
    const center = { lat: 40.1139, lng: -88.2054 }

    //data for heatmap layer
    useEffect(() => {
       
            const currentHData = heatMapRepo[year] || []
            if (currentHData) {
                const latLon = currentHData.map(entry => ({
                    lat: entry["latitude"],
                    lng: entry["longitude"]
                }));
                setHeatmapData(latLon)
            }
        
    }, [, year])

    // if (!isLoaded) {
    //     return <div>Loading..maps..</div>
    // }

    return (
        <>
            <GoogleMap
                mapContainerStyle={{ position: 'relative', width: '100%', height: '100vh' }}
                center={center}
                zoom={12}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        onClick={() => handleMarkerClick(marker)}
                        icon={{
                            url: marker.iconType == 1 ? (require('../assets/pin.png')) : (require('../assets/location.png')),
                            scaledSize: new window.google.maps.Size(40, 40), // Adjust the size of the icon
                        }}
                    />
                ))}
                {selectedMarker && (
                    <InfoWindow
                        position={selectedMarker.position}
                        onCloseClick={handleInfoWindowClose}
                    >
                        <div>
                            {selectedMarker.info()}
                            {/* You can add more details here */}
                        </div>
                    </InfoWindow>
                )}
                {/* Autocomplete search box */}


                <HeatmapLayer
                    data={heatmapData.map((data) => (
                        new google.maps.LatLng(data.lat, data.lng)
                    ))}
                    options={{
                        radius: 70
                    }}
                />
            </GoogleMap>
        </>
    )
}