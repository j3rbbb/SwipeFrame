import {
  ChevronDown,
  FileImage,
  FileText,
  Sparkles,
  User,
  Instagram,
  Linkedin,
  Twitter,
  Layout,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Carousel } from '@/types';

interface TopBarProps {
  activeCarousel: Carousel;
  onPlatformChange: (platform: Carousel['platform']) => void;
  onExport: (format: 'png' | 'pdf') => void;
  onAIGenerate: () => void;
}

const platformIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram size={14} />,
  linkedin: <Linkedin size={14} />,
  twitter: <Twitter size={14} />,
  custom: <Layout size={14} />,
};

const platformLabels: Record<string, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  twitter: 'X / Twitter',
  custom: 'Custom',
};

const TopBar: React.FC<TopBarProps> = ({
  activeCarousel,
  onPlatformChange,
  onExport,
  onAIGenerate,
}) => {
  return (
    <header
      className="h-14 flex items-center justify-between px-5 fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: '#0A0A0C',
        borderBottom: '1px solid #2A2A32',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: '#7C3AED', color: '#FFFFFF' }}
        >
          SF
        </div>
        <span
          className="text-base font-bold tracking-tight"
          style={{ color: '#FFFFFF' }}
        >
          SwipeFrame
        </span>
      </div>

      {/* Center controls */}
      <div className="flex items-center gap-3">
        {/* Platform Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all duration-150 hover:brightness-110"
              style={{
                backgroundColor: '#121216',
                border: '1px solid #2A2A32',
                color: '#A1A1AA',
              }}
            >
              {platformIcons[activeCarousel.platform]}
              <span>{platformLabels[activeCarousel.platform]}</span>
              <ChevronDown size={12} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            style={{ backgroundColor: '#1E1E24', border: '1px solid #2A2A32' }}
          >
            {Object.entries(platformLabels).map(([key, label]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => onPlatformChange(key as Carousel['platform'])}
                className="flex items-center gap-2 cursor-pointer text-sm"
                style={{ color: '#A1A1AA' }}
              >
                {platformIcons[key]}
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* AI Image Button */}
        <button
          onClick={onAIGenerate}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:brightness-110"
          style={{
            backgroundColor: '#7C3AED',
            color: '#FFFFFF',
            boxShadow: '0 0 16px rgba(124, 58, 237, 0.3)',
          }}
        >
          <Sparkles size={14} />
          AI Image
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onExport('png')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all duration-150 hover:text-white"
          style={{
            border: '1px solid #2A2A32',
            color: '#A1A1AA',
            backgroundColor: 'transparent',
          }}
        >
          <FileImage size={14} />
          <span className="hidden sm:inline">Export PNG (ZIP)</span>
        </button>
        <button
          onClick={() => onExport('pdf')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all duration-150 hover:text-white"
          style={{
            border: '1px solid #2A2A32',
            color: '#A1A1AA',
            backgroundColor: 'transparent',
          }}
        >
          <FileText size={14} />
          <span className="hidden sm:inline">Export PDF</span>
        </button>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center ml-2"
          style={{ backgroundColor: '#2A2A32' }}
        >
          <User size={14} style={{ color: '#A1A1AA' }} />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
