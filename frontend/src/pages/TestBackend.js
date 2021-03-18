import React, { Component } from 'react';
import axios from './axios';

export default class testBackend extends Component {

    GET = () => {
        try{
            const Data = axios.get("/data");
            console.log('here: '+Data);
        }
        catch (err){
            alert("GET Error!!");
        }
    };


    render() {
        return (
            <div>
                <p>
                    <h1>get something from backend</h1>
                    <button onClick={this.GET}>get from backend</button>
                </p>
                <p>
                    <h1>post something to backend</h1>

                </p>
            </div>
        )
    }
}