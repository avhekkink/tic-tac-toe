import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../components/Game/gameSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
