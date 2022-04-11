import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const { is_flex, width, maxWidth, padding, border, margin, bg, children, center, _onClick } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    maxWidth: maxWidth,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    border: border, 
  }

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
    </React.Fragment>
  );
}

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  maxWidth: '900px',
  padding: false,
  margin: false,
  bg: false,
  center: false,
  border: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.is_flex ? `display: flex; align-items: center; justify-content: space-between;` : "")}
  ${(props) => (props.center ? `text-align: center;` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
`;

export default Grid;