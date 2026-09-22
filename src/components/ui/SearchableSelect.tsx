import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Option {
  value: string;
  label: string;
  group?: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SearchableSelect({ options, value, onChange, placeholder, icon, className = '' }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (option.group && option.group.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group options
  const groupedOptions = filteredOptions.reduce((acc, option) => {
    const group = option.group || 'Ungrouped';
    if (!acc[group]) acc[group] = [];
    acc[group].push(option);
    return acc;
  }, {} as Record<string, Option[]>);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative h-full ${className}`} ref={dropdownRef}>
      <div 
        className="w-full h-full min-h-[56px] pl-12 pr-10 py-3.5 bg-transparent text-white cursor-pointer flex items-center justify-between transition-all select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00E5FF] transition-colors">
          {icon}
        </div>
        <div className="flex flex-col text-left overflow-hidden pr-2">
          <span className={`text-sm md:text-base font-semibold truncate ${!selectedOption ? 'text-gray-400' : 'text-white'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.group && (
            <span className="text-[10px] text-gray-400 font-medium">
              {selectedOption.group}
            </span>
          )}
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
                setSearchTerm('');
              }}
              className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="sr-only">Clear</span>
              ×
            </button>
          )}
          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#00E5FF]' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full min-w-[280px] sm:min-w-[340px] mt-2 bg-slate-950/95 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(0,229,255,0.15)] overflow-hidden"
          >
            <div className="p-3 border-b border-white/10 relative bg-white/[0.02]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00E5FF]/60 transition-colors text-sm font-medium"
                placeholder="Type to filter options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <div className="max-h-[360px] overflow-y-auto p-2 custom-scrollbar space-y-1">
              <div 
                className={`px-3 py-2.5 rounded-xl cursor-pointer flex items-center justify-between text-sm transition-colors ${value === '' ? 'bg-[#00E5FF]/15 text-[#00E5FF] font-semibold' : 'text-gray-300 hover:bg-white/[0.06] hover:text-white'}`}
                onClick={() => {
                  onChange('');
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                <span>{placeholder}</span>
                {value === '' && <Check className="h-4 w-4 text-[#00E5FF]" />}
              </div>

              {Object.entries(groupedOptions).map(([group, opts]) => (
                <div key={group} className="pt-2">
                  {group !== 'Ungrouped' && (
                    <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-white/[0.03] rounded-lg mb-1 flex items-center justify-between">
                      <span>{group}</span>
                      <span className="text-[10px] text-gray-500 font-normal">{opts.length}</span>
                    </div>
                  )}
                  {opts.map(option => (
                    <div
                      key={option.value}
                      className={`px-3 py-2.5 rounded-xl cursor-pointer flex items-center justify-between text-sm transition-colors ${value === option.value ? 'bg-[#00E5FF]/20 text-[#00E5FF] font-semibold border border-[#00E5FF]/30' : 'text-gray-300 hover:bg-white/[0.06] hover:text-white'}`}
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                    >
                      <span className="truncate">{option.label}</span>
                      {value === option.value && <Check className="h-4 w-4 text-[#00E5FF] shrink-0" />}
                    </div>
                  ))}
                </div>
              ))}

              {filteredOptions.length === 0 && (
                <div className="py-6 text-center text-gray-400 text-xs">
                  No matching options found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
