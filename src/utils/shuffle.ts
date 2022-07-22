export function getRandomFormattedChallenges(
  players: string[],
  challengeList: { players: number; content: string }[],
  size: number
): string[] {
  // Get random challenges from list

  let challenges = challengeList
    .sort((a, b) => 0.5 - Math.random())
    .slice(0, size);

  // Get total number of players requested

  let numberOfPlayers = 0;

  for (let i = 0; i < challenges.length; i++) {
    numberOfPlayers += challenges[i].players;
  }

  // Get correctly shuffled total player list

  let playerList: string[] = [];

  while (playerList.length < numberOfPlayers) {
    let shuffledPlayers = [...players].sort((a, b) => 0.5 - Math.random());

    if (
      playerList.length > 0 &&
      playerList[playerList.length - 1] === shuffledPlayers[0]
    ) {
      [shuffledPlayers[0], shuffledPlayers[1]] = [
        shuffledPlayers[1],
        shuffledPlayers[0],
      ];
    }

    let itemsToAdd = Math.min(
      shuffledPlayers.length,
      numberOfPlayers - playerList.length
    );

    for (let i = 0; i < itemsToAdd; i++) {
      let player = shuffledPlayers.shift();
      if (player !== undefined) playerList.push(player);
    }
  }

  // parse challenges content

  let result: string[] = [];
  let playerCursor = 0;

  for (let i = 0; i < challenges.length; i++) {
    let challengeContent = challenges[i].content;
    for (let j = 0; j < challenges[i].players; j++) {
      challengeContent = challengeContent.replace(
        '{{' + j + '}}',
        playerList[j + playerCursor]
      );
    }
    playerCursor += challenges[i].players;
    result.push(challengeContent);
  }

  return result;
}
