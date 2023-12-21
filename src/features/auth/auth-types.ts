import { TutorialSettings } from 'features/app/app-domain';
import { LearningSettings } from 'features/srs/srs-types';

export interface User {
  uid: string;
  profile: UserProfile;
  settings: {
    learning: LearningSettings;
    tutorial: TutorialSettings;
  };
  tutorial: {};
}

export interface UserProfile {
  fullName?: string;
}
