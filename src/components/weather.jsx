import React from 'react';
import './weather.scss';

function minmaxTemp(min, max){
    if(min && max){
    return (
        <h3>
            <span className="px-4">Min temp:  {min}&deg;</span>
            <span className="px-4">Max temp:  {max}&deg;</span>
        </h3>
    )}else{
        return (null)
    }
}

const Weather = (props) => {
    return (
        <div className="container">
            <div className="cards pt-4">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`}/>
                </h5>
                { props.temp_celsius ? <h1 className="py-2">Temp: {props.temp_celsius}&deg;</h1> : null }
                {minmaxTemp(props.temp_min, props.temp_max)}

                <h4 className="py-3">{props.description}</h4>
            </div>
        </div>
    )
}

export default Weather