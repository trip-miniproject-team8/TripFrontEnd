import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { text, _onClick, is_float, children, width, bg, color, border, borderRadius, margin } = props;
  const styles = {
    width: width,
    bg: bg,
    color: color,
    border: border,
    borderRadius: borderRadius,
    margin: margin,
  };

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text? text : children}</FloatButton>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElButton onClick={_onClick} {...styles}>{text? text : children}</ElButton>
    </React.Fragment>
  );
}

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  width: '100%',
  bg: 'transparent',
  color: '#212121',
  border: '1px solid #212121',
  borderRadius: false,
  margin: false,
};

const ElButton = styled.button`
  height: 45px;
  width: ${(props) => props.width};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  outline: none;
  box-sizing: border-box;
  font-size: 16px;
  border: ${(props) => props.border};
  ${(props) => (props.borderRadius ? `border-radius: ${props.borderRadius};` : '')}
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')} 
  &:hover {
    font-weight: 700;
    cursor: pointer;
  }
`;

const FloatButton =  styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: white;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 30px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  position: fixed;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`;

export default Button;