<template>
  <div class="header-wrapper">
    <h1>Open Cuite</h1>
    <a><img src="../assets/GitHub-Mark-32px.png" /></a>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Mochiy+Pop+One&display=swap');

.header-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-family: 'Mochiy Pop One', sans-serif;
  margin-left: 1.5em;
  color: #f87474;
}

a {
  margin-right: 1.5em;
  color: #f87474;
  transition: filter 0.2s;
  filter: drop-shadow(0 0 10px transparent);
}

a:hover {
  filter: drop-shadow(0 0 10px grey);
  cursor: pointer;
}
</style>
