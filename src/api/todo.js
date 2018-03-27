import { get, post } from './request';
import * as apis from '@/conf/apis';

export default {
  fetch: () => get(apis.FETCH_TODO),
  save: (todos) => post(apis.SAVE_TODO, {
    data: JSON.stringify(todos),
    action: 'save',
  }),
  add: (todo) => post(apis.SAVE_TODO, {
    data: JSON.stringify(todo),
    action: 'add',
  }),
  remove: (todo) => post(apis.SAVE_TODO, {
    data: todo.id,
    action: 'remove',
  }),
  modify: (todo) => post(apis.SAVE_TODO, {
    data: JSON.stringify(todo),
    action: 'modify',
  }),
};
