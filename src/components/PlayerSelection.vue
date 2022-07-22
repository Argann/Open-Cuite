<script setup lang="ts">
import { ref, reactive, computed, toRaw } from 'vue';

const props = defineProps<{
  players: string[];
}>();

const emit = defineEmits<{
  (e: 'startGame'): void;
  (e: 'update:players', value: string[]): void;
}>();

const playerList = reactive(new Array() as Array<string>);

for (let i = 0; i < props.players.length; i++) {
  playerList.push(props.players[i]);
}
const isPlayerListValid = computed(() => {
  return playerList.length >= 2 && playerList.every((i) => i.trim().length > 0);
});

function addPlayer() {
  playerList.push('');
  emit('update:players', toRaw(playerList));
}

function deletePlayer(index: number) {
  playerList.splice(index, 1);
  emit('update:players', toRaw(playerList));
}

function updatePlayer(index: number, text: string) {
  playerList[index] = text.trim();
  emit('update:players', toRaw(playerList));
}

function startGame() {
  emit('startGame');
}
</script>

<template>
  <div class="wrapper-ps">
    <h1>Qui va se prendre une cuite ?</h1>
    <div class="player-row" v-for="(player, index) in playerList">
      <input
        class="player-input"
        type="text"
        :id="index"
        :value="playerList[index]"
        @input="updatePlayer(index, $event.target.value)"
      />
      <button class="player-delete" @click="deletePlayer(index)">❌</button>
    </div>
    <button class="add-player" @click="addPlayer">
      Ajouter un.e joueur.euse
    </button>
    <button
      class="start-game"
      @click="startGame"
      :disabled="!isPlayerListValid"
    >
      Jouer !
    </button>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Mochiy Pop One', sans-serif;
  margin-left: 1.5em;
  color: #f87474;
}

.player-row {
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
}

.player-input {
  margin-right: 10px;
  font-size: 2em;
  border-radius: 10px;
  border: 2px solid rgba(58, 176, 255, 0.5);
  padding: 10px;
  font-family: 'Dancing Script', cursive;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  color: #3ab0ff;
}

.player-input:focus {
  border: 2px solid rgba(58, 176, 255, 1);
  outline: none;
}

.player-delete {
  font-size: 2em;
  padding: 8px;
  border: 2px solid rgba(58, 176, 255, 0.5);
  border-radius: 10px;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}

.player-delete:hover {
  border: 2px solid rgba(58, 176, 255, 1);
  cursor: pointer;
}

.add-player {
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

.add-player:hover {
  border: 2px solid rgba(248, 116, 116, 1);
  cursor: pointer;
}

.start-game {
  margin-top: 10px;
  font-size: 1.2em;
  padding: 8px;
  border: 2px solid rgba(248, 116, 116, 0.5);
  border-radius: 10px;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  font-family: 'Mochiy Pop One', sans-serif;
  color: #f87474;
}

.start-game:hover {
  border: 2px solid rgba(248, 116, 116, 1);
  cursor: pointer;
}

.start-game:disabled {
  border: 2px solid rgba(248, 116, 116, 0.1);
  color: rgba(248, 116, 116, 0.1);
  cursor: not-allowed;
}

.wrapper-ps {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
