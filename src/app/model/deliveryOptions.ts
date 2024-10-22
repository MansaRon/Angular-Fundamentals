export interface DeliveryMethod {
    id: string;
    label: string;
    checked: boolean;
    deliveryDate: string;
    price: number;
}

export const DELIVERY_OPTIONS: DeliveryMethod[] = [
    {
        id: 'DHL',
        label: 'DHL Fast Delivery',
        checked: true,
        deliveryDate: formatDate(new Date()),
        price: 15.00
      },
      {
        id: 'FEDEX',
        label: 'Free Delivery - FedEx',
        checked: true,
        deliveryDate: formatDate(new Date(2024, 12, 25)),
        price: 27.00
      },
      {
        id: 'EXPRESS',
        label: 'Express Delivery',
        checked: true,
        deliveryDate: formatDate(new Date(2024, 9, 29)),
        price: 49.00
      },
]

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}