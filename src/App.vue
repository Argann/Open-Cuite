<script setup lang="ts">
import PlayerSelection from './components/PlayerSelection.vue';
import Challenge from './components/Challenge.vue';
import Header from './components/Header.vue';
import allChallenges from './data/challenges.json';
import { ref, reactive, computed, toRaw } from 'vue';
import { getRandomFormattedChallenges } from './utils/shuffle';

const maxRounds = 3;

enum GameState {
  PlayerSelection,
  Playing,
  End,
}

const currentState = ref(GameState.PlayerSelection);

let players = reactive(new Array() as Array<string>);

let challengeList: string[] = [];
const challengeId = ref(0);
const challengeContent = computed(() => {
  return challengeList[challengeId.value];
});

function onStartGame() {
  currentState.value = GameState.Playing;
  challengeList = getRandomFormattedChallenges(
    players,
    allChallenges,
    maxRounds
  );
  challengeId.value = -1;

  onNextChallenge();
}

function onNextChallenge() {
  challengeId.value++;

  if (challengeId.value >= maxRounds) {
    onEndGame();
    return;
  }
}

function onEndGame() {
  currentState.value = GameState.End;
}

function onChangePlayers() {
  currentState.value = GameState.PlayerSelection;
}

function onPlayersUpdate(newPlayers: string[]) {
  players.length = 0;
  players.push(...newPlayers);
}
</script>

<template>
  <div class="wrapper-main">
    <Header />
    <Transition mode="out-in">
      <PlayerSelection
        @start-game="onStartGame"
        v-if="currentState === GameState.PlayerSelection"
        :players="players"
        @update:players="onPlayersUpdate"
      />
      <Challenge
        v-else-if="currentState === GameState.Playing"
        :key="challengeId"
        :currentRound="challengeId + 1"
        :maxRounds="maxRounds"
        @next-challenge="onNextChallenge"
      >
        {{ challengeContent }}
      </Challenge>
      <div class="endgame-wrapper" v-else-if="currentState === GameState.End">
        <h1 class="endgame-title">Fin de la partie !</h1>
        <button class="endgame-button" @click="onStartGame">Rejouer</button>
        <button class="endgame-button" @click="onChangePlayers">
          Changer les participant.e.s
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.wrapper-main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*align-items: center;*/
  height: 100%;
}

.endgame-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.endgame-title {
  font-family: 'Mochiy Pop One', sans-serif;
  color: #f87474;
}

.endgame-button {
  margin-top: 30px;
  font-size: 1.2em;
  padding: 8px;
  border: 2px solid rgba(248, 116, 116, 0.5);
  border-radius: 10px;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  font-family: 'Mochiy Pop One', sans-serif;
  color: #f87474;
}

.endgame-button:hover {
  border: 2px solid rgba(248, 116, 116, 1);
  cursor: pointer;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
