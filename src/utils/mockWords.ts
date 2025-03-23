// src/utils/mockWords.ts
const WORDS_WITH_HINTS: Array<[string, string[]]> = [
  ['BREAD', ['GRAIN', 'BUTTER', 'CRUST', 'SLICE', 'BAKER']],
  ['WATER', ['DRINK', 'CLEAR', 'OCEAN', 'THIRST', 'FLUID']],
  ['HOUSE', ['ROOM', 'FAMILY', 'ROOF', 'HOME', 'DOOR']],
  ['MUSIC', ['SOUND', 'MELODY', 'RHYTHM', 'BAND', 'NOTES']],
  ['CLOUD', ['SKY', 'RAIN', 'FLUFFY', 'WHITE', 'STORM']],
  ['CHAIR', ['SIT', 'LEGS', 'WOOD', 'SEAT', 'DESK']],
  ['CLOCK', ['TIME', 'HANDS', 'ALARM', 'TICK', 'WATCH']],
  ['BIRD', ['WINGS', 'FLY', 'NEST', 'TWEET', 'FEATHER']],
  ['PHONE', ['CALL', 'TALK', 'MOBILE', 'SCREEN', 'APP']],
  ['EARTH', ['PLANET', 'SOIL', 'ROUND', 'BLUE', 'GREEN']]
];

export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * WORDS_WITH_HINTS.length);
  return WORDS_WITH_HINTS[randomIndex][0];
};

export const getHintForWord = (word: string, hintIndex: number): string => {
  const wordEntry = WORDS_WITH_HINTS.find(([w]) => w === word);
  return wordEntry ? wordEntry[1][hintIndex] : '';
};

export const getAllHintsForWord = (word: string): string[] => {
  const wordEntry = WORDS_WITH_HINTS.find(([w]) => w === word);
  return wordEntry ? [...wordEntry[1]] : [];
}; 