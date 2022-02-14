<script setup lang="ts"></script>

<template>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
  .strong-size {
    font-size: 1.4rem;
    line-height: 2rem;
  }

    @media (min-width: 520px) {
    .strong-size {
    font-size: 2rem;
    line-height: 2rem;
  }
  }</style>
