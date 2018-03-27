import { get, post } from './request';
import * as apis from '@/constants/apis';

export default {
  signIn: (user, password) => post(apis.SIGN_IN, {
    user,
    password
  }),
  signOut: () => get(apis.SIGN_OUT),
};
