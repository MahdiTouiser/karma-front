export interface JumpRecord {
  date: string;
  location: string;
  equipments: string;
  planeType: string;
  height: number;
  time: string;
  description: string;
  confirmed: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddJumpRecordRequest {
  date: string;
  location: string;
  equipments: string;
  planeType: string;
  height: number;
  time: string;
  description: string;
  userId?: string;
}
