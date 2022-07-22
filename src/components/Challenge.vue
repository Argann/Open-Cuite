<script setup lang="ts">
const props = defineProps<{
  currentRound: number;
  maxRounds: number;
}>();

const emit = defineEmits<{
  (e: 'nextChallenge'): void;
}>();
</script>

<template>
  <div class="wrapper-challenge" @click="$emit('nextChallenge')">
    <div class="round-count">
      Round {{ props.currentRound }} sur {{ props.maxRounds }}
    </div>
    <div class="challenge-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.wrapper-challenge {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.challenge-content {
  font-family: 'Mochiy Pop One', sans-serif;
  font-size: 2em;
  text-align: center;
  padding: 3em;
}

.round-count {
  text-align: center;
  font-family: 'Mochiy Pop One', sans-serif;
  color: rgba(0, 0, 0, 0.5);
}
</style>
