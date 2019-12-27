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
            weather: {},
            main: {},
            wind: {},
            locationName: ""
        }
    }

    getWeather = async () => {
        try {
            const {coords} = await getCurrentPosition();
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&APPID=${APP_Key}&lang=kr&units=metric`);
            this.setState({
                isLoading: false,
                weather: data.weather[0],
                locationName: data.name,
                main: data.main
            });
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
        const {isLoading, isGeoError, weather, main, locationName} = this.state;

        if(isLoading) {
            return(<Loader active="on" msg="이 사이트는 사용자의 위치 정보를 사용합니다!"></Loader>);
        }else if(isGeoError) {
            return (
                <Fragment>
                    <Loader active="off" msg="에러..!"></Loader>
                    <p className="errorMsg">{this.state.errorMsg}</p>
                </Fragment>
            )
        }else {
            return(
                <Fragment>
                    <Loader active="off" msg="로딩 완료!"></Loader>
                    <div className="weather_bg_ef" value={weather.main}></div>
                    <div className="weather_bg" background={weather.main}></div>
                    <div className="weather_bg last" background={weather.main}></div>
                    <div id="weather_card">
                        <p className="temp">{main.temp}°</p>
                        <div className="card_line"></div>
                        <p className="main">{weather.description}({weather.main})</p>
                        <p className="location">{locationName}</p>
                    </div>
                </Fragment>
            );
        }
    }
}

export default Weather;