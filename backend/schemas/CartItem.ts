import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const CartItem = list({
  // TODO: Custom label in here
  ui: {
    listView: {
      initialColumns: ['product', 'user', 'quantity'],
    },
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({ ref: 'Product' }),
    // two-way relationship User.cart ❯ Cart & Cart.user ❯ User
    user: relationship({ ref: 'User.cart' }),
  },
});
