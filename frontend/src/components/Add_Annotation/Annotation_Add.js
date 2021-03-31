import React, { Component } from 'react'
import Annotation from 'react-image-annotation'
import {connect} from 'react-redux';
import {updatePost} from '../../context/action/posts';

class AddAnnotation extends Component {
  state = {
    annotations: [],
    annotation: {}
  }

  onChange = (annotation) => {
    this.setState({ annotation })
  }

  onSubmit = (annotation) => {
    const { geometry, data } = annotation
    
    //upload the annotation
    // this.props.updateAnnotation(this.props.post.id, {data: data, geometry: geometry});
    this.props.post.annotations.push({data: data, geometry: geometry});
    this.props.updatePost(this.props.post.id, this.props.post);
    this.setState({
      annotation: {},
      //should add key later
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
    return (
      <Annotation
        src={this.props.post.image}
        alt='Two pebbles anthropomorphized holding hands'

        annotations={this.state.annotations}

        type={this.state.type}
        value={this.state.annotation}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        allowTouch
      />
    )
  }
}

export default connect(null,{updatePost})(AddAnnotation);