export type Variant = { size: string; price: number };
export type Product = {
  id: string;
  name: string;
  tone: 'indigo' | 'white' | 'yellow';
  line: string;
  facts: [string, string][];
  variants: Variant[];
};

// Prices are placeholders in rupees until the real price list is supplied.
export const products: Product[] = [
  {
    id: 'reserve', name: 'Reserve', tone: 'indigo',
    line: 'Our longest grain, held back longest. The one for biryani and for guests.',
    facts: [['Aged', '12 months'], ['Best for', 'Biryani, dum pulao']],
    variants: [{ size: '1 kg', price: 289 }, { size: '5 kg', price: 1349 }],
  },
  {
    id: 'classic', name: 'Classic', tone: 'white',
    line: 'The everyday bag. Light, fragrant and forgiving on a weeknight.',
    facts: [['Aged', '8 months'], ['Best for', 'Dal chawal, jeera rice']],
    variants: [{ size: '1 kg', price: 199 }, { size: '5 kg', price: 949 }, { size: '10 kg', price: 1799 }],
  },
  {
    id: 'golden-sella', name: 'Golden Sella', tone: 'yellow',
    line: 'Parboiled in the husk, so it stays firm through long cooking and big pots.',
    facts: [['Aged', '8 months'], ['Best for', 'Feasts, catering']],
    variants: [{ size: '5 kg', price: 899 }, { size: '25 kg', price: 3999 }],
  },
];

export const FREE_DELIVERY_FROM = 999;

const rupees = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
export const price = (amount: number) => rupees.format(amount);
