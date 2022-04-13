import React from 'react';
import styled from 'styled-components';
import { Text, Grid } from './index';

const Input = (props) => {
  const {label, placeholder, _onChange, type, multiLine, value, is_submit, onSubmit, border} = props;

  const styles = {
    border: border,
  };


  if(multiLine) {
    return (
      <React.Fragment>
        <Grid>
          {label && <Text margin='0'>{label}</Text>}
          <ElTextarea {...styles} value={value} rows={5} placeholder={placeholder} onChange={_onChange}></ElTextarea>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin='0'>{label}</Text>}
        {is_submit ? (<ElInput  {...styles} type={type} placeholder={placeholder} onChange={_onChange} value={value} onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSubmit(e);
          }
        }}/>) : (
          <ElInput {...styles} type={type} placeholder={placeholder} onChange={_onChange}/>
        )}
        
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  label: false,
  placeholder: '텍스트를 입력해주세요.',
  onSubmit: () => {},
  _onChange: () => {},
  type: 'text',
  multiLine: false,
  value: '',
  is_submit: false,
  border: '1px solid #212121',
};

const ElTextarea = styled.textarea`
  border: ${(props) => props.border};
  width: 100%;
  padding: 20px 20px;
  box-sizing: border-box;
  outline: none;
  font-size: 16px;
  &:focus {
    border: 1px solid blue;
  }
`;

const ElInput = styled.input`
  border: ${(props) => props.border};
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  font-size: 16px;
  outline: none;
  // &:focus {
  //   border: 1px solid blue;
  // }
`;


export default Input;