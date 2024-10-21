export interface PaymentMethod {
    id: string;
    label: string;
    description: string;
    checked: boolean;
    processingFee: number | null;
}

export const PAYMENT_OPTIONS: PaymentMethod[] = [
  {
    id: 'credit-card',
    label: 'Credit Card',
    description: 'Pay with your credit card',
    checked: true,
    processingFee: null
  },
  {
    id: 'pay-on-delivery',
    label: 'Payment on delivery',
    description: '+$15 payment processing fee',
    checked: false,
    processingFee: 15
  },
  {
    id: 'paypal',
    label: 'Paypal account',
    description: 'Connect to your account',
    checked: false,
    processingFee: null
  }
]