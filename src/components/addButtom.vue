<template>
  <button class="add__btn" @click="$emit('openModal')">
    <img src="@/assets/images/edit.svg" alt="">
  </button>
</template>

<script>
export default {
}
</script>

<style>
.add__btn {
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);
  border-radius: 16px;
  padding: 16px;
  position: fixed;
  bottom: 30px;
  right: 30px;

}

.add__btn:hover {
  background: #ada7a7;
  transition: 200ms;
}
</style>