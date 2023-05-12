interface IStory {
  id: number;
  url: string;
  type: string;
  duration: number;
  isReadMore: boolean;
  storyId: number;
  isSeen: boolean;
  dateCreate?: string;
}

interface IStoryByUser {
  id: number;
  username: string;
  profile: string;
  stories: IStory[];
}

export type {IStory, IStoryByUser};
