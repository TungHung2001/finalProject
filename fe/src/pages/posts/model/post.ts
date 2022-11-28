export interface Post {
  id: number;
  title: string;
  image: string;
  slug: string;
  intro: string;
  content: string;
  category: string;
  createdAt: string; // Number
}

export interface PostForm {
  title: string;
  date?: string;
  image: string;
  summary: string;
  content: string;
}
