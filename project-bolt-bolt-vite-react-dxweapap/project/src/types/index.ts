export interface Receipt {
  id: string;
  image: string;
  text: string;
  date: string;
  reminderDate?: string;
  amount?: string;
  store?: string;
  notificationMethod?: 'email' | 'sms';
  notificationContact?: string;
  userEmail?: string;
}

export interface NotificationSettings {
  method: 'email' | 'sms';
  contact: string;
}