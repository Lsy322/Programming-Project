import React, {useState, Component} from 'react';
import Annotation from 'react-image-annotation';

export default class ViewAnnotation extends Component {
    //the state have to be saved after submition
    state = {
        annotations: [
            {
                data: {text: 'Hello!', id: 0.5986265691759928},
                geometry: {type: 'RECTANGLE', x: 25.571428571428573, y: 33, width: 21.142857142857142, height: 34}
              },
              {
                data: {text: 'Hi!', id: 0.5986265691759929},
                geometry: {type: 'RECTANGLE', x: 50.571428571428573, y: 33, width: 21.142857142857142, height: 34}
              }
        ],
        annotation: {}
    }

  

    render () {
        console.log(this.state);
        return (
            <Annotation
            //need to convert to database image later
            src= 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGljdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
            alt = 'Picture'
            annotations = {this.state.annotations}

            type = {this.state.type}
            value = {this.state.annotation}

            />
        )
    }
}