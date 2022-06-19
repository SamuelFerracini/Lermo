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

      const letterIdx = state.words[wordIdx].letters.findIndex(
        (l) => l.focused
      );

      state.words[wordIdx].letters[letterIdx].letter = letter;

      return {
        words: [...state.words],
      };
    });
  },
}));
