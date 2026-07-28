import React from 'react';

interface CrifTechLogoProps {
  variant?: 'navbar' | 'footer' | 'hero' | 'icon-only';
  className?: string;
  showTagline?: boolean;
}

export const CrifTechLogo: React.FC<CrifTechLogoProps> = ({
  variant = 'navbar',
  className = ''
}) => {
  const isLarge = variant === 'hero';

  return (
    <div className={`inline-flex items-center select-none group cursor-pointer ${className}`}>
      {/* Single Rectangle Logo containing emblem + text */}
      <img
        src="/CrifTech1.png"
        alt="CrifTech"
        className={`object-contain rounded-xl ${isLarge ? 'h-12' : 'h-10'} w-auto transition-transform duration-300 group-hover:scale-105 shadow-sm`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
