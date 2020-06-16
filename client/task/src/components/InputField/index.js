import React from 'react';
import ErrorMsg from '../ErrorMsg';
import './InputField.css';

const InputField = (props) => {
  const OnErrorClass = ['form-control', 'InputError'].join(' ');
  return (
    <div className='form-group'>
      <label>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder || props.label}
        className={props.errors[props.name] ? OnErrorClass : 'form-control'}
        onChange={props.onChange}
        {...props}
      />
      {console.log(JSON.stringify(props.errors[props.name]))}
      {props.errors[props.name] !== '' && (
        <ErrorMsg data-testid='error-msg' msg={props.errors[props.name]} />
      )}
    </div>
  );
};

export default InputField;
