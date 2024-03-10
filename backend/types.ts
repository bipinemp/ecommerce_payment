export type Customer = {
  id: string;
  object: string;
  address: null | any; // You can replace 'any' with a specific type for address if available
  balance: number;
  created: number;
  currency: null | string; // You can replace 'string' with a specific type for currency if available
  default_source: null | any; // You can replace 'any' with a specific type for default_source if available
  delinquent: boolean;
  description: null | string; // You can replace 'string' with a specific type for description if available
  discount: null | any; // You can replace 'any' with a specific type for discount if available
  email: string;
  invoice_prefix: string;
  invoice_settings: {
    custom_fields: null | any; // You can replace 'any' with a specific type for custom_fields if available
    default_payment_method: null | any; // You can replace 'any' with a specific type for default_payment_method if available
    footer: null | any; // You can replace 'any' with a specific type for footer if available
    rendering_options: null | any; // You can replace 'any' with a specific type for rendering_options if available
  };
  livemode: boolean;
  metadata: {
    userId: string;
    cart: string;
  };
  name: null | string; // You can replace 'string' with a specific type for name if available
  next_invoice_sequence: number;
  phone: null | string; // You can replace 'string' with a specific type for phone if available
  preferred_locales: string[];
  shipping: null | any; // You can replace 'any' with a specific type for shipping if available
  tax_exempt: "none" | string; // You can replace 'string' with a specific type for tax_exempt if available
  test_clock: null | any; // You can replace 'any' with a specific type for test_clock if available
};

export type Data = {
  id: string;
  object: string;
  after_expiration: null | any;
  allow_promotion_codes: null | any;
  amount_subtotal: number;
  amount_total: number;
  automatic_tax: {
    enabled: boolean;
    liability: null | any;
    status: null | any;
  };
  billing_address_collection: null | any;
  cancel_url: string;
  client_reference_id: null | any;
  client_secret: null | any;
  consent: null | any;
  consent_collection: null | any;
  created: number;
  currency: string;
  currency_conversion: null | any;
  custom_fields: any[];
  custom_text: {
    after_submit: null | any;
    shipping_address: null | any;
    submit: null | any;
    terms_of_service_acceptance: null | any;
  };
  customer: string;
  customer_creation: null | any;
  customer_details: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: null | any;
      postal_code: string;
      state: string;
    };
    email: string;
    name: string;
    phone: null | any;
    tax_exempt: string;
    tax_ids: any[];
  };
  customer_email: null | any;
  expires_at: number;
  invoice: null | any;
  invoice_creation: {
    enabled: boolean;
    invoice_data: {
      account_tax_ids: null | any;
      custom_fields: null | any;
      description: null | any;
      footer: null | any;
      issuer: null | any;
      metadata: any;
      rendering_options: null | any;
    };
  };
  livemode: boolean;
  locale: null | any;
  metadata: any;
  mode: string;
  payment_intent: string;
  payment_link: null | any;
  payment_method_collection: string;
  payment_method_configuration_details: null | any;
  payment_method_options: {
    card: {
      request_three_d_secure: string;
    };
  };
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: {
    enabled: boolean;
  };
  recovered_from: null | any;
  setup_intent: null | any;
  shipping_address_collection: {
    allowed_countries: string[];
  };
  shipping_cost: {
    amount_subtotal: number;
    amount_tax: number;
    amount_total: number;
    shipping_rate: string;
  };
  shipping_details: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: null | any;
      postal_code: string;
      state: string;
    };
    name: string;
  };
  shipping_options: {
    shipping_amount: number;
    shipping_rate: string;
  }[];
  status: string;
  submit_type: null | any;
  subscription: null | any;
  success_url: string;
  total_details: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
  };
  ui_mode: string;
  url: null | any;
};
