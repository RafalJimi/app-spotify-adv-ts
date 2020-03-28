import { Action } from "../../helpers/actions";

import {
  ADD_SONG_TO_PLAYLIST,
  DELETE_MUSIC_FROM_PLAYLIST,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST
} from "./consts";

import { Playlist } from "../models";

export type playlistsState = Playlist[];

const initialState: playlistsState = [];

export const playlistsReducer = (
  state = initialState,
  action: Action
): playlistsState => {
  switch (action.type) {
    case ADD_SONG_TO_PLAYLIST:
      console.log(action);
      return state.map(playlist => ({
        ...playlist,
        songs:
          playlist.name === action.payload.playlistName
            ? [...playlist.songs, action.payload.song.song]
            : [...playlist.songs]
      }));
    case DELETE_MUSIC_FROM_PLAYLIST:
      console.log(action);
      return state.map(playlist => ({
        ...playlist,
        songs:
          playlist.name === action.payload.playlistName
            ? playlist.songs.filter(
                song => song.previewUrl !== action.payload.song.song.previewUrl
              )
            : [...playlist.songs]
      }));
    case CREATE_PLAYLIST:
      console.log(action);
      return [
        ...state,
        {
          name: action.payload.name,
          songs: []
        }
      ];
    case DELETE_PLAYLIST:
      console.log(action);
      return state.filter(playlist => playlist.name !== action.payload.name);
    default:
      return state;
  }
};
