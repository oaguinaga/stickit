import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import 'dotenv/config';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-stickit';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long should they stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // Add initial roles here
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: add data seeding here
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
    }),
    ui: {
      // Show the UI only for people that pass this test
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    // TODO: Add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // graphQL query
      User: 'id',
    }),
  })
);
