'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';

interface SelectOption {
  id: string;
  label: string;
  subLabel?: string;
}

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string, selectedOption?: SelectOption) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Оберіть зі списку...',
  searchPlaceholder = 'Пошук...',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === value || opt.label === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (opt.subLabel && opt.subLabel.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#1A1A1E] border ${
          isOpen ? 'border-[#D4AF37]' : 'border-[#3F3F46]'
        } rounded-xl px-3.5 py-2.5 text-xs text-white text-left flex items-center justify-between transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-zinc-500'
        }`}
      >
        <span className={selectedOption ? 'text-white font-medium' : 'text-zinc-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 w-full mt-1 bg-[#161619] border border-[#3F3F46] rounded-xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
          {/* Search Header */}
          <div className="p-2 border-b border-[#27272A] relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-[#1A1A1E] border border-[#27272A] rounded-lg pl-8 pr-8 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto divide-y divide-[#27272A]/50">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-400">
                Нічого не знайдено за запитом "{searchQuery}"
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = value === option.id || value === option.label;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onChange(option.id, option);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left p-3 hover:bg-[#27272A] transition-colors flex items-center justify-between text-xs ${
                      isSelected ? 'bg-[#27272A]/80 text-[#D4AF37] font-semibold' : 'text-zinc-200'
                    }`}
                  >
                    <div>
                      <span className="block font-medium">{option.label}</span>
                      {option.subLabel && (
                        <span className="block text-[10px] text-zinc-400 mt-0.5">{option.subLabel}</span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
