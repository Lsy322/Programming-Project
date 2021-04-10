import React, { useState, Component } from "react";
import Annotation from "react-image-annotation";
import styled from "styled-components";

import {connect} from 'react-redux';
import {updatePost} from '../../context/action/posts';

const Comments = styled.div`
  border: 1px solid black;
  max-height: 80px;
  overflow: auto;
`;

const Comment = styled.div`
  padding: 8px;
  &:nth-child(even) {
    background: rgba(0, 0, 0, 0.05);
  }
  &:hover {
    background: #ececec;
  }
`;
const Root = styled.div`
  font-family: "Open Sans", sans-serif;
  margin: 0 auto;
  font-size: 14px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Montserrat", sans-serif;
  }
  input {
    font-family: "Open Sans", sans-serif;
  }
`;

class ViewAnnotation extends Component {
  //the state have to be saved after submition
  state = {
    annotations: this.props.post.annotations,
    annotation: {},
  };

  onClick = (id) => e => {
    this.props.post.annotations = this.props.post.annotations.filter(annotation => annotation.annotation_id !== id);
    this.props.updatePost(this.props.post.id, this.props.post);
  }
  render() {

    return (
      <Root>
        <Annotation
          //need to convert to database image later
          src={this.props.post.image}
          alt="Picture"
          annotations={this.props.post.annotations}
          type={this.state.type}
          value={this.state.annotation}
        />
        <h4>Delete Annotation (You need to reopen this window to see the most updated list of annotations)</h4>
        <Comments>
          {this.props.post.annotations.map((annotation) => (
            <Comment
              key={annotation.annotation_id}
              onClick = {this.onClick(annotation.annotation_id)}
            >
              {annotation.data.text}
            </Comment>
          ))}
        </Comments>
      </Root>
    );
  }
}

export default connect(null, {updatePost})(ViewAnnotation);