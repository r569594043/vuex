import { get, post } from './request';

export default {
  fetch: () => get('fetch.php'),
  save: (todos) => post('save.php', {
    data: JSON.stringify(todos),
    action: 'save',
  }),
  add: (todo) => post('save.php', {
    data: JSON.stringify(todo),
    action: 'add',
  }),
  remove: (todo) => post('save.php', {
    data: todo.id,
    action: 'remove',
  }),
  modify: (todo) => post('save.php', {
    data: JSON.stringify(todo),
    action: 'modify',
  }),
};
