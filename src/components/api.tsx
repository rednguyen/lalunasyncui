import axios from 'axios';
import SiteMinderRoomModel from './roomModels';

export default function GetRoomAvailabilityFromSiteMinder() {
    
    axios.get('http://localhost:5000/siteminderavailability')
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
    })
}