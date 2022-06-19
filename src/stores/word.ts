import create from "zustand";
import { IWord } from "../components/Word";

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
  words: IWord[];

  setLetter: (letter: string) => void;

  setLetterFocus: (
    wordIdx: number,
    letterIdx: number,
    isFocused: boolean
  ) => void;
};

export const useWordStore = create<State>((set) => ({
  words: [...INITIAL_WORDS],

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
}));
