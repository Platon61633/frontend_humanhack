import L from 'leaflet';
import marker from './location.svg';
const iconPerson = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});

export { iconPerson };