import React from 'react';

interface InputWithLabelProps {
  label: string;
  placeholder: string;
  type: 'text' | 'select'; 
  value: string;
  options?: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // 
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  placeholder,
  type,
  value,
  options,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      {type === 'select' ? (
        <select
          className="pl-2 py-1 border rounded-lg w-full"
          value={value}
          onChange={onChange}
        >
          <option value="">{placeholder}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          className="pl-2 py-1 border rounded-lg w-full"
          placeholder={placeholder}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
        />
      )}
    </div>
  );
};

export default InputWithLabel;
