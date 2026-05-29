import type { Carousel, Template } from '@/types';

const now = new Date();
const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

const defaultStyle = {
  backgroundColor: '#000000',
  textColor: '#FFFFFF',
  accentColor: '#7C3AED',
  fontSize: 48,
  isBold: true,
  isAllCaps: true,
  isItalic: false,
  alignment: 'left' as const,
};

export const defaultSlideStyle = defaultStyle;

export const initialCarousels: Carousel[] = [
  {
    id: 'carousel-1',
    title: 'Claude Opus 4.8 Update',
    platform: 'instagram',
    template: 'dark-tech',
    createdAt: oneHourAgo,
    updatedAt: now,
    slides: [
      {
        id: 'slide-1-1',
        order: 0,
        headline: 'CLAUDE OPUS 4.8\nJUST CHANGED\nAI WORK',
        body: 'Not because it writes prettier answers.\n\nBecause it is better at long-running, serious tasks.',
        label: 'HOOK',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-1-2',
        order: 1,
        headline: 'WHAT CHANGED',
        body: 'Anthropic upgraded Opus to Claude Opus 4.8.\n\nThe big improvements are around:\n\n• Coding\n• Agentic tasks\n• Professional work\n• Long-session consistency\n• Better collaboration\n• More reliable judgment\n\nThis is not a toy update.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-1-3',
        order: 2,
        headline: 'REASON 1',
        body: 'It is built for longer work.\n\nMost AI tools are fine for quick tasks.\n\nBut business work is messy:\n\n• Multiple files\n• Long context\n• Changing requirements\n• Review cycles\n• Mistakes to catch\n• Decisions to explain\n\nOpus 4.8 is designed to handle more of that.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-1-4',
        order: 3,
        headline: 'REASON 2',
        body: 'It is better for agentic workflows.\n\nThat means Claude can work through bigger tasks with more independence.\n\nNot just:\n"Write this."\n\nMore like:\n"Plan this, execute the steps, check the work, and report back."\n\nThat is where AI starts becoming operational.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-1-5',
        order: 4,
        headline: 'REASON 3',
        body: 'Claude Code now has dynamic workflows.\n\nAnthropic says Claude Code can plan work and run many parallel subagents in one session.\n\nThis matters because complex work is rarely one step.\n\nIt needs research, execution, review, verification, and cleanup.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-1-6',
        order: 5,
        headline: 'REASON 4',
        body: 'It is more honest about uncertainty.\n\nThis is underrated.\n\nA model that confidently says the wrong thing is dangerous.\n\nAnthropic says Opus 4.8 is more likely to flag uncertainty and less likely to make unsupported claims.\n\nFor business, that matters.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-1-7',
        order: 6,
        headline: 'REASON 5',
        body: 'Users can control effort.\n\nClaude can spend more effort on harder tasks.\n\nThat means you can use different modes depending on the job:\n\n• Fast work\n• Normal work\n• Difficult work\n• Long-running workflows\n• Deep coding tasks\n\nNot every task needs maximum effort.\n\nBut some tasks do.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-1-8',
        order: 7,
        headline: 'WHAT THIS MEANS\nFOR TEAMS',
        body: 'Opus 4.8 is useful for:\n\n• Code reviews\n• Internal tools\n• Workflow automation\n• SOP creation\n• Long research tasks\n• Business analysis\n• Content systems\n• Complex project planning\n\nThe winner is not the team with more prompts.\n\nIt is the team with better AI workflows.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-1-9',
        order: 8,
        headline: 'THE REAL POINT',
        body: 'Claude is moving from chatbot to work partner.\n\nThe shift is not:\nAI answers questions.\n\nThe shift is:\nAI helps execute work across systems, files, teams, and projects.\n\nThat is the update people should pay attention to.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-1-10',
        order: 9,
        headline: 'WANT THE\nBREAKDOWN?',
        body: 'Comment OPUS\n\nand we\'ll send the business use cases for Claude Opus 4.8.',
        style: { ...defaultStyle },
      },
    ],
  },
  {
    id: 'carousel-2',
    title: 'Gemini Omni + Gemini 3.5 Update',
    platform: 'instagram',
    template: 'dark-tech',
    createdAt: now,
    updatedAt: now,
    slides: [
      {
        id: 'slide-2-1',
        order: 0,
        headline: 'GOOGLE JUST SHOWED\nWHERE AI IS GOING',
        body: 'Gemini Omni creates.\n\nGemini 3.5 executes.\n\nThat combination matters.',
        label: 'HOOK',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-2-2',
        order: 1,
        headline: 'THE UPDATE',
        body: 'Google announced two important model directions:\n\nGemini Omni\nA multimodal model that can create from text, image, audio, and video.\n\nGemini 3.5\nA model family built for agentic workflows, coding, and complex tasks.\n\nThis is not just another AI launch.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-2-3',
        order: 2,
        headline: 'PART 1:\nGEMINI OMNI',
        body: 'Omni is built around creation.\n\nGoogle says it can combine:\n\n• Text\n• Images\n• Audio\n• Video\n\nThen generate high-quality video grounded in Gemini\'s real-world knowledge.\n\nThat is the key phrase.\n\nCreation plus reasoning.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-2-4',
        order: 3,
        headline: 'WHY OMNI\nMATTERS',
        body: 'Most AI video tools generate clips from prompts.\n\nOmni is different because it is designed for conversational editing.\n\nYou can ask it to:\n\n• Change the scene\n• Add objects\n• Reimagine the action\n• Adjust the style\n• Keep characters consistent\n• Build on previous edits\n\nThat changes the workflow.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-2-5',
        order: 4,
        headline: 'THE REAL\nUSE CASE',
        body: 'For content teams, this means:\n\nShoot once.\nEdit with language.\nChange the environment.\nTest creative variations.\nCreate different versions for different platforms.\n\nThe video becomes the starting point.\n\nNot the final asset.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-2-6',
        order: 5,
        headline: 'PART 2:\nGEMINI 3.5',
        body: 'Gemini 3.5 is built for action.\n\nGoogle says 3.5 Flash is designed for:\n\n• Agents\n• Coding\n• Long-horizon tasks\n• Complex workflows\n• Real-world utility\n\nThis is the operator side of the update.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-2-7',
        order: 6,
        headline: 'WHY 3.5\nMATTERS',
        body: 'The future is not just AI that answers.\n\nIt is AI that can execute.\n\nThat means models will increasingly help with:\n\n• Research\n• Planning\n• Coding\n• Workflow automation\n• Business operations\n• Multi-step tasks\n• Tool use\n\nThis is where AI becomes infrastructure.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-2-8',
        order: 7,
        headline: 'THE BIG\nSHIFT',
        body: 'Gemini Omni points to AI as a creative engine.\n\nGemini 3.5 points to AI as an execution engine.\n\nTogether, they show the next stack:\n\nCreative AI\nplus\nAgentic AI\n\nContent creation and business operations are starting to merge.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-2-9',
        order: 8,
        headline: 'WHAT BUSINESSES\nSHOULD DO',
        body: 'Do not chase every AI tool.\n\nBuild systems around the shift:\n\n• AI video workflows\n• AI content engines\n• AI research agents\n• AI sales follow-up\n• AI operations dashboards\n• AI task automation\n• AI creative testing\n\nThe advantage is in the workflow, not the tool.',
        style: { ...defaultStyle },
      },
      {
        id: 'slide-2-10',
        order: 9,
        headline: 'WANT THE\nBREAKDOWN?',
        body: 'Comment GEMINI\n\nand we\'ll send the business use cases for Gemini Omni and Gemini 3.5.',
        style: { ...defaultStyle },
      },
    ],
  },
];

export const templates: Template[] = [
  { id: 'dark-tech', name: 'Dark Tech', type: 'dark-tech', preview: '#000000' },
  { id: 'minimal-white', name: 'Minimal White', type: 'minimal-white', preview: '#FFFFFF' },
  { id: 'bold-gradient', name: 'Bold Gradient', type: 'bold-gradient', preview: 'linear-gradient(135deg, #1a1a2e, #0f3460)' },
  { id: 'clean-business', name: 'Clean Business', type: 'clean-business', preview: '#FAFAFA' },
];

export const templateStyles: Record<string, { backgroundColor: string; textColor: string; accentColor: string }> = {
  'dark-tech': { backgroundColor: '#000000', textColor: '#FFFFFF', accentColor: '#7C3AED' },
  'minimal-white': { backgroundColor: '#FFFFFF', textColor: '#000000', accentColor: '#DC2626' },
  'bold-gradient': { backgroundColor: '#1a1a2e', textColor: '#FFFFFF', accentColor: '#E94560' },
  'clean-business': { backgroundColor: '#FAFAFA', textColor: '#18181B', accentColor: '#2563EB' },
};
