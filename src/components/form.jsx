import React from 'react';
import './form.scss';

const Form = props => {
    return (
        <div className="cotainer">
            <div>{props.error ? error() : null}</div>
            <form onSubmit={props.load}>
                <div className="row">
                    <div className="col-md-4 offset-md-2">
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            autoComplete="off"
                            placeholder="City"
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            name="country"
                            autoComplete="off"
                            placeholder="Country"
                        />
                    </div>
                </div>
                <div className="row align-self-center pt-4">
                    <div className="col">
                        <button className="btn btn-warning">Get Weather</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

function error() {
    return (<div className="alert alert-danger mx-5" role="alert">Please enter city and country</div>)
}

export default Form;