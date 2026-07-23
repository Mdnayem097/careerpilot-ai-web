export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  headline?: string;
  targetRole?: string;
  role: 'user' | 'admin';
  provider: 'credentials' | 'google' | 'demo';
}

export interface CareerItem {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  } | string;
  title: string;
  category: 'Job Listing' | 'Skill Pathway' | 'Learning Resource' | 'Mentorship';
  companyOrProvider: string;
  location: string;
  type: 'Full-time' | 'Remote' | 'Contract' | 'Course' | 'Certification';
  salaryOrCost: string;
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior' | 'Executive';
  description: string;
  requirements: string[];
  skillsRequired: string[];
  applicationUrl?: string;
  status: 'active' | 'archived' | 'draft';
  createdAt: string;
}

export interface ResumeAnalysis {
  _id: string;
  userId: string;
  rawText: string;
  targetRole: string;
  atsScore: number;
  extractedSkills: string[];
  missingKeywords: string[];
  strengthPoints: string[];
  improvementSuggestions: {
    section: string;
    issue: string;
    recommendation: string;
    revisedText: string;
  }[];
  createdAt: string;
}

export interface CareerRoadmap {
  _id: string;
  userId: string;
  currentRole: string;
  targetRole: string;
  reasoningChain: string[];
  readinessScore: number;
  milestones: {
    phase: string;
    timeframe: string;
    skillsToAcquire: string[];
    actionItems: string[];
    completed: boolean;
  }[];
  memoryContext: {
    previousSkillGaps: string[];
    preferredPacing: string;
    lastEvaluationDate: string;
  };
  createdAt: string;
}

export interface ChatMessage {
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  agentThinking?: string;
}

export interface ChatConversation {
  _id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
}

export interface DashboardAnalytics {
  summary: {
    careerReadinessScore: number;
    atsScore: number;
    targetRole: string;
    totalItems: number;
    userCreatedItems: number;
    skillsMasteredCount: number;
  };
  atsTrend: { month: string; atsScore: number; keywordsMatch: number }[];
  skillRadar: { subject: string; current: number; target: number; fullMark: number }[];
  pipelineFunnel: { stage: string; count: number; fill: string }[];
}
