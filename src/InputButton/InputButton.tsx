import React from 'react';
import './InputButton.css'

interface InputButtonProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputButton: React.FC<InputButtonProps> = ({ value, onChange }) => {
  return (
    <div>
      <input
        className="tableInput"
        aria-label="adjust input value"
        type="number"
        value={value}
        onChange={onChange}
        step={1}
      />
    </div>
  );
};

export default InputButton
