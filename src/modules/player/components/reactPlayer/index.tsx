import React, { useState, useCallback, useEffect, useRef } from "react";

import ReactPlayer from "react-player";

import { useSelector, useDispatch } from "react-redux";

import {
  playRX,
  pipRX,
  volumeRX,
  mutedRX,
  loopRX,
  seekToRX,
  shuffleRX,
} from "../../../../store/player/selectors";

import {
  setPlay,
  setPlayed,
  setDuration,
} from "../../../../store/player/actions";

import { currentSongsArray } from "../../../../store/items/selectors";

import {
  currentIndex,
  currentCategory,
  currentPlaylist,
  NowPlayedSong,
} from "../../../../store/items/selectors";

import {
  songsList,
  songsListLength,
} from "../../../../store/fetchSongs/selectors";

import { favSongsList } from "../../../../store/favSongs/selectors";

import { playlists } from "../../../../store/playlists/selectors";

import {
  playThisSong,
  setIndex,
  playNextSong,
} from "../../../../store/items/actions";

import { Song, Playlist } from "../../../../store/models";

type RefProps = {
  current: any;
};

export const ReactMusicPlayer = () => {
  // Functions consts
  const shuffleSongs: boolean = useSelector(shuffleRX);
  const songIndex: number = useSelector(currentIndex);
  const category: string = useSelector(currentCategory);

  const searchSongsArr: Song[] = useSelector(songsList);
  const searchSongsArrLength: number = useSelector(songsListLength);
  const favSongArr: Song[] = useSelector(favSongsList);
  const currentPlaylistSongs: Playlist[] = useSelector(playlists);
  const currentPlaylistName: string = useSelector(currentPlaylist);

  const currentSongsArr: Song[] = useSelector(currentSongsArray);

  console.log(currentSongsArr);

  const [currentPlaylistSongsList, setCurrentPlaylistSongsList] = useState<
    Song[]
  >([]);

  // Player consts
  const playing: boolean = useSelector(playRX);
  const currentPlayedSong: Song = useSelector(NowPlayedSong);
  let url: string = currentPlayedSong.previewUrl;
  const pip: boolean = useSelector(pipRX);
  const volume: number = useSelector(volumeRX);
  const muted: boolean = useSelector(mutedRX);
  const loop: boolean = useSelector(loopRX);
  const seekTo: number = useSelector(seekToRX);

  const dispatch = useDispatch();

  // ReactPlayer functions

  const handlePlay = useCallback((): void => {
    dispatch(setPlay(true));
  }, []);

  const handlePause = useCallback((): void => {
    dispatch(setPlay(false));
  }, []);

  const handleEnded = useCallback(() => {
    if (shuffleSongs === true) {
      if (category === "search") {
        let index = Math.floor(1 + (Math.random() * searchSongsArrLength - 1));
        let song = searchSongsArr[index - 1];
        dispatch(playThisSong(song));
        dispatch(setIndex(index));
      } else if (category === "favList") {
        let index = Math.floor(1 + (Math.random() * favSongArr.length - 1));
        let song = favSongArr[index - 1];
        dispatch(playThisSong(song));
        dispatch(setIndex(index));
      } else if (category === "playlist") {
        let index = Math.floor(
          1 + (Math.random() * currentPlaylistSongsList.length - 1)
        );
        let song = currentPlaylistSongsList[index - 1];
        dispatch(playThisSong(song));
        dispatch(setIndex(index));
      }
    } else if (shuffleSongs === false && category === "search") {
      if (songIndex < searchSongsArrLength - 1) {
        let song = searchSongsArr[songIndex + 1];
        dispatch(playThisSong(song));
        dispatch(playNextSong(1));
      } else {
        let song = searchSongsArr[0];
        dispatch(playThisSong(song));
        dispatch(setIndex(0));
      }
    } else if (shuffleSongs === false && category === "favList") {
      if (songIndex < favSongArr.length - 1) {
        let song = favSongArr[songIndex + 1];
        dispatch(playThisSong(song));
        dispatch(playNextSong(1));
      } else {
        let song = favSongArr[0];
        dispatch(playThisSong(song));
        dispatch(setIndex(0));
      }
    } else if (shuffleSongs === false && category === "playlist") {
      if (songIndex < currentPlaylistSongsList.length - 1) {
        let song = currentPlaylistSongsList[songIndex + 1];
        dispatch(playThisSong(song));
        dispatch(playNextSong(1));
      } else {
        let song = currentPlaylistSongsList[0];
        dispatch(playThisSong(song));
        dispatch(setIndex(0));
      }
    }
    dispatch(setPlay(true));
  }, [
    songIndex,
    searchSongsArr,
    favSongArr,
    currentPlaylistSongsList,
    category,
    currentPlayedSong,
    shuffleSongs,
  ]);

  const ref: RefProps = useRef(null);

  const handleProgress = (value: any) => {
    console.log("obecnyIndex", songIndex);
    let playedValue = parseFloat(value.played);
    dispatch(setPlayed(playedValue));
  };

  const handleDuration = (duration: number) => {
    dispatch(setDuration(duration));
  };

  // Skip song to optional second

  useEffect(() => {
    ref.current.seekTo(seekTo);
    dispatch(setPlayed(seekTo));
  }, [seekTo]);

  // Get current playlist songs

  useEffect(() => {
    currentPlaylistSongs.map((playlist) =>
      playlist.name === currentPlaylistName
        ? setCurrentPlaylistSongsList(playlist.songs)
        : null
    );
    console.log("playlistArr", currentPlaylistSongsList);
  }, [currentPlaylistName]);

  return (
    <ReactPlayer
      ref={ref}
      className="react-player"
      width="0px"
      height="0px"
      url={url}
      pip={pip}
      playing={playing}
      loop={loop}
      volume={volume}
      muted={muted}
      onReady={() => console.log("onReady")}
      onPlay={handlePlay}
      onPause={handlePause}
      onBuffer={() => console.log("onBuffer")}
      onSeek={(e) => console.log("onSeek", e)}
      onStart={() => console.log("onStart")}
      onEnded={handleEnded}
      onError={(e) => console.log("onError", e)}
      onProgress={handleProgress}
      onDuration={handleDuration}
    />
  );
};
