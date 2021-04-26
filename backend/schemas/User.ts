import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';

// Named export
export const User = list({
  // access:
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    // Todo: add roles, cart and orders
    orders: relationship({ ref: 'Order.user', many: true }),
  },
});
