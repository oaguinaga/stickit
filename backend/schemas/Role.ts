import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissionFields } from './fileds';

export const Role = list({
  fields: {
    name: text({ isRequired: true }),
    ...permissionFields,
    assignedTo: relationship({
      ref: 'User.role', // todo: ass this to the user
      many: true,
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
  },
});
