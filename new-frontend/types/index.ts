export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SocialLink {
  name: string;
  link: string;
}

export interface Challenger {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  national_code?: string;
  university?: string;
  is_confirmed: boolean;
  cv_file?: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  level: string;
  members: Challenger[];
  judge_username?: string;
  judge_password?: string;
}

export interface Invitation {
  id: number;
  from_challenger: Challenger;
  to_challenger: Challenger;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
}

