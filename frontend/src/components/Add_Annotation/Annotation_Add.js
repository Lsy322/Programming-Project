import React, {useState, Component} from 'react';
import Annotation from 'react-image-annotation';

export default class AddAnnotation extends Component {
    //the state have to be saved after submition
    state = {
        annotations: [],
        annotation: {}
    }

    onChange = (annotation) => {
        this.setState({annotation});
    }

    onSubmit = (annotation) => {
        const { geometry, data } = annotation
    
        this.setState({
          annotation: {},
          annotations: this.state.annotations.concat({
            geometry,
            data: {
              ...data,
              id: Math.random()
            }
          })
        })
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
            onChange = {this.onChange}
            onSubmit = {this.onSubmit}
            allowTouch 

            />
        )
    }
}