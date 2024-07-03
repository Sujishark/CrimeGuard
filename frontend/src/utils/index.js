import moment from 'moment-timezone'
export function createTimestamp(timestamp, locationOffset) {
  // const combinedDateTimeString = `${dateString} ${timeString}`;

  // Parse the combined datetime string and set the timezone
  const localDateTime = moment.tz(timestamp, 'America/Chicago');

  // Apply the offset to get the UTC timestamp
  const utcTimestamp = localDateTime.add(6, 'hours');

  return localDateTime;
}

export function haversineDistance(loc1, loc2) {
  // Convert latitude and longitude from degrees to radians
  const toRadians = (angle) => (angle * Math.PI) / 180;
  const { x: lat1, y: lon1 } = loc1
  const { x: lat2, y: lon2 } = loc2
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Radius of the Earth in kilometers (mean value)
  const R = 6371;

  // Calculate the distance
  const distance = R * c;

  return distance;
}

// Example usage
const distance = haversineDistance(37.7749, -122.4194, 34.0522, -118.2437);
console.log(`Distance: ${distance.toFixed(2)} km`);
