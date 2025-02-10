export type Profile = {
  _id: string;
  email: string;
  firebase_user_id: string;
  name: string;
  role: string;
  customer: {
    id: string;
    invoice_settings: {
      default_payment_method: string;
    };
  };
  subscription?: {
    id: string;
    status: string;
    trial_end: number;
    items: [
      {
        id: string;
        price_id: string;
        lookup_key: string;
      }
    ];
    current_period_start: number;
    current_period_end: number;
  };
  is_onboarding_completed: boolean;
  profile_picture: string | null;
  notification_settings: string[];
  fcm_token: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
