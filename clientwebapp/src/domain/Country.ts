export interface Country {
    id: number;
    name: string;
    is_in_eu: number; // MySQL returns TINYINT as number (0 or 1)
  }