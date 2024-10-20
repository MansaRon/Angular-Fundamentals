interface PaymentMethod {
    id: string;
    label: string;
    description: string;
    checked: boolean;
    processingFee: number | null;
  }
  
  interface Payments {
    paymentMethods: PaymentMethod[];
  }