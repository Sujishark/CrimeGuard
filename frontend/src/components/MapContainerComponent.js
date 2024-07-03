/*global google*/

import React, { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const MapContainerComponent = ({ uData,acData }) => {

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
        // if (acData.length) {
        //     console.log(acData)
        //     acData.map((data) => {
        //         markerList.push({
        //             id: 1,
        //             position: { lat: data.CrimeLocation.x, lng: data.CrimeLocation.y },
        //             iconType: 1,
        //             info: () =>
        //                 <>
        //                     <h3><Link to={`/incident/${data.crimeId}`}>{data.crimeId}</Link></h3>
        //                     <p>{`${data.crimeType} at a`}</p>
        //                     <p>{`${data.crimePlace} `}</p>
        //                     <p>{`at ${data.crimeAddress}`}</p>
        //                 </>
        //         })
        //     })
            // if (uData) {
            //     markerList.push({
            //         id: 69,
            //         position: { lat: uData.location.x, lng: uData.location.y },
            //         iconType: 2,
            //         info: () => <p>{'You'}</p>
            //     })
            // }
            setMarkers(markerList)
        // }
    }, [acData])

    //schnucks urbana
    const center = { lat: 40.1139, lng: -88.2054 }

    

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
            </GoogleMap>
        </>
    )
}