export interface CounselorDetail {
  career: { end_date: string | null; name: string; start_date: string }[];
  intro_content: string;
  intro_title: string;
  license: { name: string; organization: string }[];
  profile: {
    category: string[];
    id: number;
    location: string;
    name: string;
    score: number;
    thumbnail: string;
    time: { day: string; end: string; start: string }[];
  };
}
