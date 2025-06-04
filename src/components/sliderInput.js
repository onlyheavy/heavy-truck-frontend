import React from 'react';
import { Range } from 'react-range';

const SliderInput = ({ label, value, min, max, step, onChange }) => {
  return (
    <div className="mb-7">
      <label className="flex justify-between items-center mb-4">
        <span className="font-medium ">{label}</span>{' '}
        <span className="border border-gray-300 w-44 p-2 rounded-sm">{value}</span>
      </label>
      <Range
        step={step}
        min={min}
        max={max}
        values={[value]}
        onChange={(values) => onChange(values[0])}
        renderTrack={({ props, children }) => (
          <div {...props} className="w-full h-1 bg-gray-300 rounded" style={{ ...props.style }}>
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className="h-5 w-5 bg-orange-500 rounded-full shadow" />
        )}
      />
    </div>
  );
};

export default SliderInput;
