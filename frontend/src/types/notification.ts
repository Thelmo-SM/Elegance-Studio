export interface NotificationTypes {
    id: string;
    barberId: string;
    clientId: string;
    appointmentId: string;
    message: string;
    timestamp: string;
    read: boolean;
  }
  export interface Notification extends NotificationTypes {
    badge?: string;
    body?: string;
    data?: unknown;
    dir?: string;
  }