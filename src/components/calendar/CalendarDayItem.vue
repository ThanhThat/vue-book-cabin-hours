<template>
  <li>
    <slot></slot>
  </li>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
li {
  border: 1px solid #fff;
  min-height: 200px;
  font-size: 20px;
  transition: all 0.5s ease;
  overflow-x: auto;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px 10px rgba(0 0 0 / 0.2);
  }
}
</style>
