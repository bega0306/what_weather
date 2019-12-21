import React, { Fragment } from 'react';
import axios from 'axios';
import './Weather.css';
import Loader from './Loader';
    
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
            const {coords} = await getCurrentPosition();
            const {data} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&APPID=${APP_Key}`);
            this.setState({isLoading: false, waether: data.weather[0].main});
        } catch (error) {
            let errorMsg = "";
            switch (error.code) {
                case 1:
                    errorMsg = "위치 정보 권한을 허락해주세요!";
                    break;
                case 2:
                    errorMsg = "위치 확인이 불가능해요...";
                    break;
                default:
                    console.log(error.code);
                    errorMsg = "문제 발생!";
                    break;
            }
            this.setState({isLoading: false, isGeoError: true, errorMsg});
        }
    }

    componentDidMount() {
        this.getWeather();
    }

    render() {
        const {isLoading, isGeoError, waether} = this.state;
        if(isLoading) {
            return(<Loader active="on"></Loader>);
        }else if(isGeoError) {
            return (
                <Fragment>
                    <Loader active="off"></Loader>
                    <h4>{this.state.errorMsg}</h4>
                </Fragment>
            )
        }else {
            return(
                <Fragment>
                    <Loader active="off"></Loader>
                    <h4>{waether}</h4>
                </Fragment>
            );
        }
    }
}

export default Weather;