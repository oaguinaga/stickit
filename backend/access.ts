// at it's simplest, access control is either a ter or no value depending on the users session

import { ListAccessArgs } from './types';

export function isSignedIn({ session }): ListAccessArgs {
  return !!session;
}
