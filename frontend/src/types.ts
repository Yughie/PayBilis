export type SubscriptionValues = {
  fullName: string;
  contactNumber: string;
  houseAddress: string;
  frequency: 'One-time' | 'Monthly Subscription';
  billers: BillerEntry[];
};

export type BillerEntry = {
  billerName: string;
  accountNumber: string;
  accountName: string;
  estimatedAmount: string;
  collectionDate: string;
};