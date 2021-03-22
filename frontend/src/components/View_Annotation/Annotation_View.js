import React, {useState, Component} from 'react';
import Annotation from 'react-image-annotation';

export default class ViewAnnotation extends Component {
    //the state have to be saved after submition
    state = {
        annotations: this.props.post.annotations,
        annotation: {}
    }

  

    render () {
        console.log(this.props.post);
        return (
            <Annotation
            //need to convert to database image later
            src= {this.props.post.image}
            alt = 'Picture'
            annotations = {this.state.annotations}

            type = {this.state.type}
            value = {this.state.annotation}

            />
        )
    }
}