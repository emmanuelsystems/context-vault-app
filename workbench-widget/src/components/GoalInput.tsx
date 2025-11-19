import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function GoalInput({ value, onChange }: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Describe what you want to accomplish in this Run..."
      className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
}
