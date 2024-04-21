export interface WalletData {
  userId: string;
  balance: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChargeWalletData {
    userId: string | undefined;
    amount: number;
  }
