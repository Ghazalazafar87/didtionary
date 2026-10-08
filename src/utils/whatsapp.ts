import { Product, CartItem, CustomerInfo } from '../types';

export const getWhatsAppNumber = (): string => {
  // Support both Vite and Next.js env conventions with fallback to official store number
  const envNumber =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WHATSAPP_NUMBER) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_WHATSAPP_NUMBER) ||
    '923218492019';

  // Clean all non-digit characters
  return String(envNumber).replace(/\D/g, '') || '923218492019';
};

export const getWhatsAppBaseUrl = (): string => {
  const number = getWhatsAppNumber();
  return `https://wa.me/${number}`;
};

export const createWhatsAppUrl = (message: string): string => {
  const number = getWhatsAppNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

/**
 * Creates formatted WhatsApp message for a single product order
 */
export const getProductOrderWhatsAppUrl = (
  product: Product,
  quantity: number = 1,
  selectedColor?: string
): string => {
  const total = product.pricePKR * quantity;
  const lines = [
    'Assalam-o-Alaikum! I would like to place an order from StudyPop Pakistan.',
    '',
    '• Product: ' + product.name,
    selectedColor ? '• Color / Finish: ' + selectedColor : null,
    '• Quantity: ' + quantity,
    '• Unit Price: Rs. ' + product.pricePKR.toLocaleString(),
    '• Item Total: Rs. ' + total.toLocaleString(),
    '',
    'Please confirm stock availability and estimated delivery to my address. Thank you!',
  ].filter((line): line is string => line !== null);

  return createWhatsAppUrl(lines.join('\n'));
};

/**
 * Creates formatted WhatsApp message for full cart checkout
 */
export const getCartOrderWhatsAppUrl = (
  cart: CartItem[],
  totals: {
    subtotal: number;
    discount: number;
    shippingFee: number;
    total: number;
  },
  customerInfo?: CustomerInfo | null,
  paymentMethod?: string
): string => {
  const itemsText = cart
    .map(
      (item) =>
        `• ${item.product.name}${item.selectedColor ? ` (${item.selectedColor})` : ''} × ${item.quantity} — Rs. ${(item.product.pricePKR * item.quantity).toLocaleString()}`
    )
    .join('\n');

  const lines = [
    'Assalam-o-Alaikum! I would like to place an order.',
    '',
    'Order Items:',
    itemsText,
    '',
    `Subtotal: Rs. ${totals.subtotal.toLocaleString()}`,
    totals.discount > 0 ? `Student Discount: - Rs. ${totals.discount.toLocaleString()}` : null,
    `Delivery: ${totals.shippingFee === 0 ? 'FREE' : `Rs. ${totals.shippingFee}`}`,
    `Total: Rs. ${totals.total.toLocaleString()}`,
    '',
    customerInfo?.fullName ? `Name: ${customerInfo.fullName}` : null,
    customerInfo?.phone ? `Phone: ${customerInfo.phone}` : null,
    customerInfo?.address
      ? `Delivery Address: ${customerInfo.address}, ${customerInfo.city || ''} (${customerInfo.province || ''})`
      : null,
    customerInfo?.notes ? `Delivery Note: ${customerInfo.notes}` : null,
    paymentMethod ? `Payment Method: ${paymentMethod.toUpperCase()}` : 'Payment: Cash on Delivery / Online',
    '',
    'Thank you!',
  ].filter((line): line is string => line !== null);

  return createWhatsAppUrl(lines.join('\n'));
};

/**
 * General customer care / inquiry WhatsApp URL
 */
export const getGeneralInquiryWhatsAppUrl = (topic?: string): string => {
  const message = topic
    ? `Assalam-o-Alaikum StudyPop team! I have a question regarding: ${topic}. Could you please help?`
    : 'Assalam-o-Alaikum StudyPop team! I would like to inquire about student stationery, deliveries, and stock.';
  return createWhatsAppUrl(message);
};

export const openWhatsApp = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
