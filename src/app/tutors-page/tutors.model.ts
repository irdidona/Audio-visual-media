import { Course } from "../course-list/course.model";

export interface Tutor {
    id: number;
    name: string | null;
    bio: string | null;
    profilePictureUrl: string;
    courses: Course[];
    isLiveStreaming: boolean;
  }