export interface DeliveryMethod {
    id: string;
    label: string;
    checked: boolean;
    deliveryDate: Date;
    price: number;
}

export const DELIVERY_OPTIONS: DeliveryMethod[] = [
    {
        id: 'DHL',
        label: 'DHL Fast Delivery',
        checked: true,
        deliveryDate: new Date(),
        price: 15.00
      },
      {
        id: 'FEDEX',
        label: 'Free Delivery - FedEx',
        checked: true,
        deliveryDate: new Date('2024-12-25'),
        price: 27.00
      },
      {
        id: 'EXPRESS',
        label: 'Express Delivery',
        checked: true,
        deliveryDate: new Date('2024-10-29'),
        price: 49.00
      },
]