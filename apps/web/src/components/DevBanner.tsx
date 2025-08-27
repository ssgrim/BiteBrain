import React from 'react';

interface DevBannerProps {
  version?: string;
}

export const DevBanner: React.FC<DevBannerProps> = ({ 
  version = '0.1.0-dev' 
}) => {
  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="bg-zombie-lime text-bitebrain-navy px-4 py-2 text-center text-sm font-medium border-b border-bitebrain-teal">
      <div className="flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 bg-brain-coral rounded-full animate-pulse"></span>
        <span>
          🚧 <strong>Development Mode</strong> - BiteBrain AI Fishing Assistant v{version} - Work in Progress
        </span>
        <span className="inline-block w-2 h-2 bg-brain-coral rounded-full animate-pulse"></span>
      </div>
      <div className="text-xs mt-1 opacity-75">
        This is a development build. Features may be incomplete or unstable.
      </div>
    </div>
  );
};
