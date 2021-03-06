import create from "zustand";
import { ELetterStatus } from "../components/Letter";
import { IWord } from "../components/Word";

import wordList from "../resource/wordList.json";

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

  ...Array.from({ length: 5 }, () => ({
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
  isAlertVisible: boolean;

  checkWord: () => void;
  setHiddenWord: (hiddenWord: string) => void;
  setNextLetterFocused: (direction: string) => void;
  setLetter: (letter: string) => void;
  setAlertVisibility: (value: boolean) => void;

  setLetterFocus: (wordIdx: number, letterIdx: number) => void;
};

export const useAppStore = create<State>((set, get) => ({
  gameState: EGameState.PLAYING,
  isAlertVisible: false,

  hiddenWord: "",

  words: [...INITIAL_WORDS],

  setAlertVisibility: (value: boolean) => {
    set((state) => {
      return {
        ...state,
        isAlertVisible: value,
      };
    });
  },

  setHiddenWord: (hiddenWord: string) => {
    set((state) => ({
      ...state,
      hiddenWord,
    }));
  },

  setNextLetterFocused: (direction: string) => {
    set((state) => {
      const wordIdx = state.words.findIndex((w) => w.focused);

      if (wordIdx === -1) return state;

      const letterIdx = state.words[wordIdx].letters.findIndex(
        (l) => l.focused
      );

      if (letterIdx === -1) return state;
      Object.assign(state.words[wordIdx].letters[letterIdx], {
        focused: false,
      });

      if (direction === "right") {
        if (letterIdx + 1 < state.words[wordIdx].letters.length) {
          Object.assign(state.words[wordIdx].letters[letterIdx + 1], {
            focused: true,
          });
        } else {
          Object.assign(state.words[wordIdx].letters[letterIdx], {
            focused: true,
          });
        }
      } else {
        if (letterIdx - 1 > -1) {
          Object.assign(state.words[wordIdx].letters[letterIdx - 1], {
            focused: true,
          });
        } else {
          Object.assign(state.words[wordIdx].letters[letterIdx], {
            focused: true,
          });
        }
      }

      return {
        words: [...state.words],
      };
    });
  },

  setLetterFocus: (wordIdx: number, letterIdx: number) => {
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

      const oldLetter = state.words[wordIdx].letters[letterIdx].letter;

      Object.assign(state.words[wordIdx].letters[letterIdx], {
        letter: letter,
        focused: false,
      });

      if (letter === "_") {
        if (letterIdx - 1 > -1 && oldLetter === "_") {
          Object.assign(state.words[wordIdx].letters[letterIdx - 1], {
            focused: true,
          });
        } else {
          Object.assign(state.words[wordIdx].letters[letterIdx], {
            focused: true,
          });
        }
      } else {
        if (letterIdx + 1 < state.words[wordIdx].letters.length) {
          Object.assign(state.words[wordIdx].letters[letterIdx + 1], {
            focused: true,
          });
        } else {
          Object.assign(state.words[wordIdx].letters[letterIdx], {
            focused: true,
          });
        }
      }

      return {
        words: [...state.words],
      };
    });
  },

  checkWord: () => {
    set((state) => {
      const wordIndex = state.words.findIndex((w) => w.focused);

      if (state.words[wordIndex].letters.find((e) => e.letter === "_"))
        return state;

      if (
        !wordList.find(
          (word) =>
            word.toUpperCase() ===
            state.words[wordIndex].letters
              .map(({ letter }) => letter)
              .join("")
              .toUpperCase()
        )
      ) {
        if (state.isAlertVisible) return state;

        setTimeout(() => {
          get().setAlertVisibility(false);
        }, 2000);

        return {
          ...state,
          isAlertVisible: true,
        };
      }

      const hiddenWordLetters = state.hiddenWord.split("");

      Object.assign(state.words[wordIndex], { focused: false });

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

      const lost = state.words.length === wordIndex + 1 && !won;

      if (won) return { words: [...state.words], gameState: EGameState.WON };

      if (lost) return { words: [...state.words], gameState: EGameState.LOSE };

      if (wordIndex + 1 < state.words.length) {
        Object.assign(state.words[wordIndex + 1], { focused: true });
        Object.assign(state.words[wordIndex + 1].letters[0], { focused: true });
        state.words[wordIndex + 1].letters.forEach((l) => (l.letter = "_"));
      }

      return { words: [...state.words] };
    });
  },
}));
