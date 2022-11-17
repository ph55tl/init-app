<template>
  <div :style="styleExternalIcon" class="svg-external-icon svg-icon" v-bind="$attrs" />
</template>

<script setup lang="ts">
const props = defineProps<{ iconClass: String }>()

const getIconUrl = (name: String) => {
  return new URL(`../../assets/svg/${name}.svg`, import.meta.url).href
}

const styleExternalIcon = computed(() => {
  return {
    mask: `url(${getIconUrl(props.iconClass)}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${getIconUrl(props.iconClass)}) no-repeat 50% 50%`
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentcolor;
}
.svg-external-icon {
  display: inline-block;
  background-color: currentcolor;
  mask-size: cover !important;
}
</style>
