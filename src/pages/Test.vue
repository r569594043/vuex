<template>
  <div>
    <Counter class="counter"></Counter>
    <Counter class="counter"></Counter>
    <Counter class="counter"></Counter>
  </div>
</template>

<script>
import Counter from './components/Counter';

export default {
  name: 'Test',
  data() {
    return {
    };
  },
  methods: {
  },
  components: {
    Counter
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .counter {
    width: 120px;
    margin-bottom: 10px;
  }
</style>
