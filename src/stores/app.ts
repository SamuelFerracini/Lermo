import create from "zustand";
import { ELetterStatus } from "../components/Letter";
import { IWord } from "../components/Word";

export enum EGameState {
  PLAYING = 0,
  LOSE = 1,
  WON = 2,
}

const INITIAL_WORDS = [
  {
    focused: true,

    letters: [
      { letter: "_" },
      { letter: "_" },
      { letter: "_" },
      { letter: "_" },
      { letter: "_" },
    ],
  },

  ...Array.from({ length: 4 }, () => ({
    focused: false,

    letters: [
      { letter: "" },
      { letter: "" },
      { letter: "" },
      { letter: "" },
      { letter: "" },
    ],
  })),
];

type State = {
  gameState: number;
  hiddenWord: string;
  words: IWord[];

  checkWord: () => void;
  setHiddenWord: (hiddenWord: string) => void;
  setLetter: (letter: string) => void;

  setLetterFocus: (
    wordIdx: number,
    letterIdx: number,
    isFocused: boolean
  ) => void;
};

export const useAppStore = create<State>((set) => ({
  gameState: EGameState.PLAYING,

  hiddenWord: "",

  words: [...INITIAL_WORDS],

  setHiddenWord: (hiddenWord: string) => {
    set((state) => {
      return {
        ...state,
        hiddenWord,
      };
    });
  },

  setLetterFocus: (wordIdx: number, letterIdx: number, isFocused: boolean) => {
    set((state) => {
      state.words[wordIdx].letters.forEach((letter) => {
        letter.focused = false;
      });

      state.words[wordIdx].letters[letterIdx].focused = true;

      return {
        words: [...state.words],
      };
    });
  },

  setLetter: (letter: string) => {
    set((state) => {
      const wordIdx = state.words.findIndex((w) => w.focused);

      if (wordIdx === -1) return state;

      const letterIdx = state.words[wordIdx].letters.findIndex(
        (l) => l.focused
      );

      if (letterIdx === -1) return state;

      if (letter === "_") {
        if (letterIdx - 1 > -1)
          Object.assign(state.words[wordIdx].letters[letterIdx - 1], {
            focused: true,
          });
      } else {
        if (letterIdx + 1 < state.words[wordIdx].letters.length)
          Object.assign(state.words[wordIdx].letters[letterIdx + 1], {
            focused: true,
          });
      }

      Object.assign(state.words[wordIdx].letters[letterIdx], {
        letter: letter,
        focused: false,
      });

      return {
        words: [...state.words],
      };
    });
  },

  checkWord: () => {
    set((state) => {
      const wordIndex = state.words.findIndex((w) => w.focused);

      const hiddenWordLetters = state.hiddenWord.split("");

      state.words[wordIndex].focused = false;

      state.words[wordIndex].letters.forEach((letter, letterIdx) => {
        const hiddenLetter = hiddenWordLetters[letterIdx].toUpperCase();

        if (letter.letter === hiddenLetter) letter.status = ELetterStatus.RIGHT;
        else {
          if (
            hiddenWordLetters.find((e) => e.toUpperCase() === letter.letter)
          ) {
            letter.status = ELetterStatus.WRONG_PLACE;
          } else {
            letter.status = ELetterStatus.WRONG;
          }
        }
      });

      const won = state.words[wordIndex].letters.every(
        (l) => l.status === ELetterStatus.RIGHT
      );

      if (won) {
        return { words: [...state.words], gameState: EGameState.WON };
      }

      if (wordIndex + 1 < state.words.length) {
        Object.assign(state.words[wordIndex + 1], { focused: true });
        Object.assign(state.words[wordIndex + 1].letters[0], { focused: true });
        state.words[wordIndex + 1].letters.forEach((l) => (l.letter = "_"));
      }

      return { words: [...state.words] };
    });
  },
}));
