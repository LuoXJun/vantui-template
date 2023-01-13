<template>
  <div>
    <van-rate v-model="value" />
    <van-cell is-link title="基础用法" @click="show = true" />
    <van-action-sheet v-model:show="show" :actions="actions" />
    <div class="asda" @click="showa"></div>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'vant'
const value = ref(2.5)
const show = ref(false)
const actions = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]

const showa = () => {
  console.log(123)
  const loading = Toast({
    type: 'loading',
    message: 'loading',
    duration: 0,
    loadingType: 'spinner'
  })
  setTimeout(() => {
    loading.clear()
  }, 2000)
}
</script>

<style scoped>
.asda {
  background-color: red;
  width: 100px;
  height: 100px;
}
</style>
