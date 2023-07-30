export interface CounselorInfo {
  category: string[];
  id: number;
  location: string;
  name: string;
  score: number;
  thumbnail: string;
  time: { day: string; start: string; end: string }[];
}
