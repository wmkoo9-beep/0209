
export enum AppStep {
  UPLOAD = 'UPLOAD',
  GENERATING = 'GENERATING',
  STORY = 'STORY'
}

export interface Decoration {
  id: string;
  type: string;
  x: number;
  y: number;
  scale: number;
}

export interface StoryChapter {
  title: string;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
  allowDecoration?: boolean;
}

export interface StoryBook {
  title: string;
  chapters: StoryChapter[];
}
