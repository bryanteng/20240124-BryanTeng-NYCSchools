import React, { useState } from 'react';

interface InputButtonProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputButton: React.FC<InputButtonProps> = ({ value, setValue, onClick, onChange }) => {
  return (
    <div>
      <input
        className="tableInput"
        type="number"
        value={value}
        onChange={onChange}
        step={1}
      />
    </div>
  );
};

export default InputButton
