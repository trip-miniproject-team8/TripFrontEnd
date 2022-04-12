import React from 'react';
import styled from 'styled-components';

const Image = (props) => {

  const {shape, src, size} = props;
  const styles = {
    src: src,
    size: size,
  };

  if (shape === "rectangle") {
    return (
      <React.Fragment>
        <AspectOutter>
          <AspectInner {...styles}></AspectInner>
        </AspectOutter>
      </React.Fragment>
    );
  }

  if (shape === "circle") {
    return (
      <React.Fragment>
        <ImageCircle {...styles}></ImageCircle>
      </React.Fragment>
    );
  }

  if (shape === "logo") {
    return (
      <React.Fragment>
        <AspectOutter>
          <AspectInner {...styles}></AspectInner>
        </AspectOutter>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
        <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
}

Image.defaultProps = {
  shape: "circle",
  src: "https://user-images.githubusercontent.com/91959791/162676721-7bc22048-3e1d-4514-b403-b91d81d9c8f2.png",
  size: 36,
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-position: center;
`;


const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-position: center;
  margin: 4px 10px 4px 4px;
`;

export default Image;