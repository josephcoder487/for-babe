export interface LoveNote {
  id: string;
  category: 'love' | 'comfort' | 'voucher' | 'compliment';
  message: string;
  author?: string;
  icon?: string;
}

export interface PlantedFlower {
  id: string;
  x: number;
  y: number;
  type: string;
  color: string;
  note: string;
  createdAt: number;
}

export interface BubbleItem {
  id: string;
  text: string;
  reward: string;
  color: string;
  x: number;
  y: number;
  popped: boolean;
}
