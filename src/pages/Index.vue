<template>
  <div>
    我是首页
    <ul class="todo-list">
        <li v-for="todo in filteredTodos">
            <label>{{todo.title}} {{ todo.completed ? '√' : '×' }}</label>
            <Button @click="removeTodo(todo)">Remove</Button>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['redirect'],
  name: 'Index',
  data() {
    return {
        visibility: 'all'
    };
  },
  computed: {
    // ...mapGetters('todo', [
    //     'all',
    //     'active',
    //     'completed',
    //     'remaining',
    // ]),
    filteredTodos() {
      return this.$store.getters['todo/' + this.visibility];
    },
  },
  mounted() {
    this.getAllTodos();
  },
  methods: {
    ...mapActions('todo', [
        'getAllTodos'
    ]),
    ...mapActions('todo', {
        'removeTodoAction': 'removeTodo'
    }),
    removeTodo(todo) {
      this.$store.dispatch('todo/removeTodo', todo);
      // this.removeTodoAction(todo);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
