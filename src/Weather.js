import React from 'react';
import axios from 'axios';
    
const APP_Key = "53ff36a516736f2588021c40dc49e1e8";

const getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

class Weather extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isGeoError: false,
            waether: ""
        }
    }

    getWeather = async () => {
        try {
            console.log(1);
            const {coords} = await getCurrentPosition();
            const {data} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&APPID=${APP_Key}`);
            console.log(data.coord.lat + ", " + data.coord.lon);
            this.setState({waether: data.weather[0].main});
        } catch (error) {
            console.log(error);
            this.setState({isLoading: false, isGeoError: true});
        }
    }

    componentDidMount() {
        this.getWeather();
    }

    render() {
        const {waether} = this.state;
        return(
            <h4>{waether}</h4>
        );
    }
}

export default Weather;