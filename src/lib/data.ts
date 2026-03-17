export interface Tool {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  pricing: string;
  logo: string;
  rating: number;
  users: string;
  api_available: boolean;
  open_source: boolean;
  deploy: string;
  integrations: number;
  context_window: string;
  company: string;
  atlas_score: number;
}

export interface StackStep {
  tool_name: string;
  role: string;
  action: string;
  step_order: number;
}

export interface Stack {
  id: number;
  slug: string;
  title: string;
  goal: string;
  difficulty: string;
  cost_monthly: number;
  views: number;
  clones: number;
  steps: StackStep[];
}

export const CATEGORIES = [
  "All","Writing","Image","Video","Audio","Research","Automation","Productivity","Coding",
];

export const MOCK_TOOLS: Tool[] = [
  {id:1,name:"ChatGPT",slug:"chatgpt",description:"Advanced conversational AI for writing, analysis, coding, and general-purpose intelligence tasks. Supports GPT-4 Turbo with 128k context.",category:"Writing",pricing:"Freemium — $20/mo Pro",logo:"🤖",rating:4.8,users:"200M+",api_available:true,open_source:false,deploy:"Cloud",integrations:5000,context_window:"128k tokens",company:"OpenAI",atlas_score:97},
  {id:2,name:"Claude",slug:"claude",description:"Anthropic's AI assistant focused on safety and helpfulness. Excels at long-form analysis, coding, and nuanced writing with 200k context.",category:"Writing",pricing:"Freemium — $20/mo Pro",logo:"🧠",rating:4.7,users:"50M+",api_available:true,open_source:false,deploy:"Cloud",integrations:800,context_window:"200k tokens",company:"Anthropic",atlas_score:96},
  {id:3,name:"Midjourney",slug:"midjourney",description:"Industry-leading AI image generation through text prompts. Creates photorealistic and artistic images with unmatched aesthetic quality.",category:"Image",pricing:"$10 — $120/mo",logo:"🎨",rating:4.9,users:"16M+",api_available:false,open_source:false,deploy:"Cloud (Discord)",integrations:50,context_window:"N/A",company:"Midjourney Inc",atlas_score:94},
  {id:4,name:"Runway",slug:"runway",description:"AI-powered creative suite for video generation and editing. Features Gen-2 text-to-video, motion brush, and professional editing tools.",category:"Video",pricing:"Freemium — $12-76/mo",logo:"🎬",rating:4.5,users:"5M+",api_available:true,open_source:false,deploy:"Cloud",integrations:120,context_window:"N/A",company:"Runway AI",atlas_score:91},
  {id:5,name:"ElevenLabs",slug:"elevenlabs",description:"State-of-the-art AI voice synthesis and cloning. Generate natural-sounding speech in 29 languages with emotional control.",category:"Audio",pricing:"Freemium — $5-330/mo",logo:"🎙️",rating:4.7,users:"3M+",api_available:true,open_source:false,deploy:"Cloud",integrations:200,context_window:"N/A",company:"ElevenLabs",atlas_score:93},
  {id:6,name:"Cursor",slug:"cursor",description:"AI-first code editor built on VS Code. Features intelligent autocomplete, codebase-aware chat, and multi-file editing with AI.",category:"Coding",pricing:"Freemium — $20/mo Pro",logo:"⌨️",rating:4.8,users:"2M+",api_available:false,open_source:false,deploy:"Desktop",integrations:1000,context_window:"Full codebase",company:"Anysphere",atlas_score:95},
  {id:7,name:"Perplexity",slug:"perplexity",description:"AI-powered search engine that provides cited, real-time answers. Combines LLM intelligence with live web search for accurate research.",category:"Research",pricing:"Freemium — $20/mo Pro",logo:"🔍",rating:4.6,users:"15M+",api_available:true,open_source:false,deploy:"Cloud",integrations:150,context_window:"N/A",company:"Perplexity AI",atlas_score:92},
  {id:8,name:"Zapier",slug:"zapier",description:"No-code automation platform connecting 6,000+ apps. Build complex workflows with AI-powered triggers, actions, and conditional logic.",category:"Automation",pricing:"Freemium — $19-99/mo",logo:"⚡",rating:4.5,users:"2.2M+",api_available:true,open_source:false,deploy:"Cloud",integrations:6000,context_window:"N/A",company:"Zapier",atlas_score:90},
  {id:9,name:"Notion AI",slug:"notion-ai",description:"AI writing and knowledge assistant embedded in Notion workspace. Summarize, brainstorm, draft, and translate within your documents.",category:"Productivity",pricing:"$10/mo per member",logo:"📝",rating:4.4,users:"30M+",api_available:true,open_source:false,deploy:"Cloud",integrations:300,context_window:"N/A",company:"Notion Labs",atlas_score:88},
  {id:10,name:"Stable Diffusion",slug:"stable-diffusion",description:"Open-source image generation model. Run locally or in the cloud with full control over fine-tuning, LoRAs, and custom pipelines.",category:"Image",pricing:"Free (Open Source)",logo:"🖼️",rating:4.5,users:"10M+",api_available:true,open_source:true,deploy:"Self-hosted / Cloud",integrations:500,context_window:"N/A",company:"Stability AI",atlas_score:89},
  {id:11,name:"Jasper",slug:"jasper",description:"Enterprise AI marketing platform for brand-consistent content creation. Generate ads, blog posts, social media, and marketing copy at scale.",category:"Writing",pricing:"$39-125/mo",logo:"✍️",rating:4.3,users:"100K+",api_available:true,open_source:false,deploy:"Cloud",integrations:250,context_window:"N/A",company:"Jasper AI",atlas_score:85},
  {id:12,name:"Synthesia",slug:"synthesia",description:"AI video generation platform with realistic digital avatars. Create training videos, marketing content, and presentations without cameras.",category:"Video",pricing:"$22-67/mo",logo:"🎥",rating:4.4,users:"50K+",api_available:true,open_source:false,deploy:"Cloud",integrations:100,context_window:"N/A",company:"Synthesia Ltd",atlas_score:87},
];

export const MOCK_STACKS: Stack[] = [
  {id:1,slug:"youtube-automation",title:"YouTube Automation Pipeline",goal:"Automate YouTube content creation from ideation to publishing",difficulty:"Intermediate",cost_monthly:85,views:12400,clones:890,steps:[
    {tool_name:"Perplexity",role:"Research Engine",action:"Research trending topics and competitor analysis",step_order:1},
    {tool_name:"ChatGPT",role:"Script Writer",action:"Generate video scripts with hooks and CTAs",step_order:2},
    {tool_name:"ElevenLabs",role:"Voice Generator",action:"Convert scripts to natural voiceover audio",step_order:3},
    {tool_name:"Runway",role:"Video Producer",action:"Generate B-roll footage and visual effects",step_order:4},
    {tool_name:"Midjourney",role:"Thumbnail Creator",action:"Design click-worthy thumbnails",step_order:5},
  ]},
  {id:2,slug:"saas-landing-page",title:"SaaS Landing Page Builder",goal:"Design and build a high-converting SaaS landing page with AI",difficulty:"Beginner",cost_monthly:40,views:8300,clones:620,steps:[
    {tool_name:"ChatGPT",role:"Copywriter",action:"Generate compelling headlines and page copy",step_order:1},
    {tool_name:"Midjourney",role:"Visual Designer",action:"Create hero images and section graphics",step_order:2},
    {tool_name:"Cursor",role:"Developer",action:"Code the landing page with AI-assisted development",step_order:3},
    {tool_name:"Jasper",role:"SEO Optimizer",action:"Optimize meta tags and content for search engines",step_order:4},
  ]},
  {id:3,slug:"podcast-production",title:"AI Podcast Production",goal:"Produce a professional podcast from research to distribution",difficulty:"Intermediate",cost_monthly:60,views:5600,clones:340,steps:[
    {tool_name:"Perplexity",role:"Researcher",action:"Deep research on episode topics with citations",step_order:1},
    {tool_name:"Claude",role:"Script Developer",action:"Write detailed episode outlines and talking points",step_order:2},
    {tool_name:"ElevenLabs",role:"Audio Engine",action:"Generate intro/outro and voice segments",step_order:3},
    {tool_name:"ChatGPT",role:"Show Notes Writer",action:"Create show notes, timestamps, and summaries",step_order:4},
    {tool_name:"Zapier",role:"Distributor",action:"Auto-publish to Spotify, Apple Podcasts, and social",step_order:5},
  ]},
  {id:4,slug:"ai-coding-workflow",title:"AI Coding Workflow",goal:"Ship production code faster with AI-assisted development",difficulty:"Advanced",cost_monthly:45,views:18200,clones:1200,steps:[
    {tool_name:"Perplexity",role:"Technical Researcher",action:"Research best practices, libraries, and architecture patterns",step_order:1},
    {tool_name:"Claude",role:"Architect",action:"Design system architecture and data models",step_order:2},
    {tool_name:"Cursor",role:"AI Pair Programmer",action:"Write, refactor, and debug code with AI assistance",step_order:3},
    {tool_name:"ChatGPT",role:"Code Reviewer",action:"Review code for bugs, security issues, and improvements",step_order:4},
    {tool_name:"Notion AI",role:"Documentation",action:"Generate API docs, READMEs, and technical specs",step_order:5},
    {tool_name:"Zapier",role:"CI/CD Connector",action:"Automate deployment notifications and monitoring",step_order:6},
  ]},
];

export function getTools(opts?: { category?: string; search?: string }): Tool[] {
  let tools = [...MOCK_TOOLS];
  if (opts?.category && opts.category !== "All") {
    tools = tools.filter((t) => t.category === opts.category);
  }
  if (opts?.search) {
    const q = opts.search.toLowerCase();
    tools = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }
  return tools;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return MOCK_TOOLS.find((t) => t.slug === slug);
}

export function getStacks(): Stack[] {
  return [...MOCK_STACKS];
}

export function getStackBySlug(slug: string): Stack | undefined {
  return MOCK_STACKS.find((s) => s.slug === slug);
}
