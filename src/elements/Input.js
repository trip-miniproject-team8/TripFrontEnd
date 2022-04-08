import React from 'react';
import styled from 'styled-components';
import { Text, Grid } from './index';

const Input = (props) => {
  const {label, placeholder, _onChange, type, multiLine, value} = props;

  if(multiLine) {
    return (
      <React.Fragment>
        <Grid>
          {label && <Text margin='0'>{label}</Text>}
          <ElTextarea value={value} rows={10} placeholder={placeholder} onChange={_onChange}></ElTextarea>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin='0'>{label}</Text>}
        <ElInput type={type} placeholder={placeholder} onChange={_onChange}/>
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  label: false,
  placeholder: '텍스트를 입력해주세요.',
  _onChange: () => {},
  type: 'text',
  multiLine: false,
  value: '',
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  outline: none;
  &:focus {
    border: 1px solid blue;
  }
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  outline: none;
  &:focus {
    border: 1px solid blue;
  }
`;


export default Input;