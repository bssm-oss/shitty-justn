export interface MessageEntry {
  title: string;
  description: string;
  fix: string;
}

export type MessageDictionary = Record<string, MessageEntry>;
