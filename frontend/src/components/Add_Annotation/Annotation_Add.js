import React, { Component } from 'react'
import Annotation from 'react-image-annotation'

export default class AddAnnotation extends Component {
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
    this.props.post.annotations.push({data: data, geometry: geometry});
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
    console.log(this.props.post.annotations);
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
