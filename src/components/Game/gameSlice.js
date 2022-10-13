import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    stepNumber: 0,
    xIsNext: true,
    history: [{ squares: Array(9).fill(null) }],
  },
  reducers: {
    makeMove: (state, action) => {
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      squares[action.payload] = state.xIsNext ? 'X' : 'O';

      return {
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
        history: history.concat([
          {
            squares: squares,
          },
        ]),
      };
    },
    jumpToMove: (state, action) => {
      state.stepNumber = action.payload;
      state.xIsNext = action.payload % 2 === 0;
    },
  },
});

export const { makeMove, jumpToMove } = gameSlice.actions;

export default gameSlice.reducer;
