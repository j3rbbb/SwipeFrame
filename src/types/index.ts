export interface SlideStyle {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontSize: number;
  isBold: boolean;
  isAllCaps: boolean;
  isItalic: boolean;
  alignment: 'left' | 'center' | 'right';
}

export interface Slide {
  id: string;
  order: number;
  headline: string;
  body: string;
  label?: string;
  style: SlideStyle;
  backgroundImage?: string;
}

export interface Carousel {
  id: string;
  title: string;
  platform: 'instagram' | 'linkedin' | 'twitter' | 'custom';
  template: 'dark-tech' | 'minimal-white' | 'bold-gradient' | 'clean-business';
  slides: Slide[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  type: 'dark-tech' | 'minimal-white' | 'bold-gradient' | 'clean-business';
  preview: string;
}
