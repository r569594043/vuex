import { get, post } from './request';

export default {
  signIn: (user, password) => post('signin.php', {
    user,
    password
  }),
  signOut: () => get('signout.php'),
};
