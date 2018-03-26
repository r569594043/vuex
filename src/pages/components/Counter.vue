<template>
  <div>
    <Input v-model="counter">
        <Button type="primary" @click="sub" slot="prepend">-</Button>
        <Button type="primary" @click="add" slot="append">+</Button>
    </Input>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data() {
    return {
      'counter': 1,
    };
  },
  methods: {
    add() {
      this.counter++;
    },
    sub() {
      this.counter--;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>
