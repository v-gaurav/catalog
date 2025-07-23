import type { Tool } from './types';

const tools: Tool[] = [
  {
    id: '1',
    name: 'SynthWeaver',
    purpose: 'Automated content generation for marketing campaigns.',
    description: 'SynthWeaver uses advanced generative models to create compelling marketing copy, social media posts, and email newsletters. It helps marketing teams scale their content production.',
    howToUse: '1. Connect your brand guidelines.\n2. Select a content template (e.g., blog post, tweet).\n3. Provide a brief prompt or keywords.\n4. Generate and refine the output.',
    region: 'Global',
    businessUnit: 'Marketing',
    languageSupport: 'English, Spanish, French',
    cost: 'Paid',
    access: 'Controlled',
    views: 1258,
    createdAt: '2023-01-15T09:30:00Z',
    updatedAt: '2023-10-26T14:00:00Z',
  },
  {
    id: '2',
    name: 'DataScribe',
    purpose: 'Transcribes audio and video files with high accuracy.',
    description: 'DataScribe is an AI-powered transcription service that supports over 50 languages and dialects. It features speaker identification and custom vocabulary.',
    howToUse: '1. Upload your audio or video file.\n2. Select the language.\n3. Start the transcription process.\n4. Review and export the transcript in various formats (TXT, SRT, VTT).',
    region: 'North America',
    businessUnit: 'Operations',
    languageSupport: '50+ Languages',
    cost: 'Paid',
    access: 'Controlled',
    views: 890,
    createdAt: '2023-02-20T11:00:00Z',
    updatedAt: '2023-11-05T18:20:00Z',
  },
  {
    id: '3',
    name: 'InsightSphere',
    purpose: 'Analyzes customer feedback to identify trends and sentiment.',
    description: 'InsightSphere connects to various data sources like surveys, reviews, and support tickets. It uses natural language processing to extract actionable insights and visualize data.',
    howToUse: '1. Connect your data sources (e.g., Zendesk, SurveyMonkey).\n2. Configure analysis dashboards.\n3. Monitor real-time sentiment and key topics.\n4. Generate reports to share with stakeholders.',
    region: 'EMEA',
    businessUnit: 'Customer Experience',
    languageSupport: 'English, German',
    cost: 'Paid',
    access: 'Controlled',
    views: 2340,
    createdAt: '2023-03-10T16:45:00Z',
    updatedAt: '2023-11-12T11:30:00Z',
  },
  {
    id: '4',
    name: 'CodePilot',
    purpose: 'AI assistant for writing and debugging code.',
    description: 'CodePilot integrates with popular IDEs to provide code completions, suggest refactoring, and help identify bugs. It supports a wide range of programming languages.',
    howToUse: '1. Install the CodePilot extension for your IDE (e.g., VS Code).\n2. Sign in with your account.\n3. Start typing, and CodePilot will provide suggestions.\n4. Use chat to ask coding questions or debug errors.',
    region: 'Global',
    businessUnit: 'Engineering',
    languageSupport: 'Python, JavaScript, Java, C++',
    cost: 'Free',
    access: 'Open',
    views: 5432,
    createdAt: '2023-04-01T10:00:00Z',
    updatedAt: '2023-11-15T09:00:00Z',
  },
  {
    id: '5',
    name: 'HR-Bot',
    purpose: 'Automates responses to common HR questions.',
    description: 'An internal chatbot that integrates with the company\'s knowledge base to answer employee questions about policies, benefits, and procedures, freeing up the HR team.',
    howToUse: '1. Access the chatbot via Slack or the company portal.\n2. Ask your question in plain language (e.g., "how much vacation time do I have?").\n3. If the bot cannot answer, it will escalate to an HR representative.',
    region: 'Global',
    businessUnit: 'Human Resources',
    languageSupport: 'English',
    cost: 'Free',
    access: 'Controlled',
    views: 765,
    createdAt: '2023-05-25T14:20:00Z',
    updatedAt: '2023-10-30T12:00:00Z',
  },
   {
    id: '6',
    name: 'SecureScan',
    purpose: 'Identifies security vulnerabilities in applications.',
    description: 'SecureScan uses AI to perform static and dynamic analysis of codebases, identifying potential security threats and compliance issues before they reach production.',
    howToUse: '1. Integrate SecureScan into your CI/CD pipeline.\n2. Configure scanning rules for your projects.\n3. Review scan results in the dashboard.\n4. Triage and fix identified vulnerabilities.',
    region: 'Global',
    businessUnit: 'Engineering',
    languageSupport: 'Multiple',
    cost: 'Paid',
    access: 'Controlled',
    views: 987,
    createdAt: '2023-06-18T08:00:00Z',
    updatedAt: '2023-11-10T17:45:00Z',
  },
];

export const getTools = (): Tool[] => tools;

export const getToolById = (id: string): Tool | undefined => tools.find(tool => tool.id === id);

// In a real app, this would be a database operation.
export const addTool = (tool: Omit<Tool, 'id' | 'views' | 'createdAt' | 'updatedAt'>) => {
  const newTool: Tool = {
    id: (tools.length + 1).toString(),
    ...tool,
    views: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tools.push(newTool);
  return newTool;
}
