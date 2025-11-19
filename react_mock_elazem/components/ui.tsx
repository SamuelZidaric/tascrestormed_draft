
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'indigo' | 'purple';
}

export const Badge: React.FC<BadgeProps> = ({ children, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-200 text-gray-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {children}
    </span>
  );
};

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  const handleSelect = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          {label}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40 max-h-60 overflow-y-auto">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map(option => (
              <div key={option} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => handleSelect(option)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">{option}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center pb-3 border-b">
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>
                <div className="mt-3">
                    {children}
                </div>
            </div>
        </div>
    );
};
