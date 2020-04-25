import React, { useEffect, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import { currentTerm } from "../../../../store/items/selectors";

import { artistsArrayLength } from "../../../../store/fetchArtists/selectors";

import { albumsArrayLength } from "../../../../store/fetchAlbums/selectors";

import { songsListByAlbum } from "../../../../store/fetchSongsByAlbum/selectors";

import {
  songsList,
  songsListLength,
} from "../../../../store/fetchSongs/selectors";

import { fetchArtistsStarted } from "../../../../store/fetchArtists/actions";
import { fetchAlbumsStarted } from "../../../../store/fetchAlbums/actions";
import { fetchSongsStarted } from "../../../../store/fetchSongs/actions";
import { fetchSongsByArtist } from "../../../../store/fetchSongsByArtist/actions";
import { fetchSongsByAlbum } from "../../../../store/fetchSongsByAlbum/actions";

import {
  setSong,
  setIndex,
  playThisSong,
  setArtist,
  setAlbum,
} from "../../../../store/items/actions";

import { setPlay } from "../../../../store/player/actions";

import { SearchLayout } from "./layout";
import { Song } from "../../../../store/models";

export const Search = () => {
  const term = useSelector(currentTerm);

  const songsByAlbumArr = useSelector(songsListByAlbum);

  const artistsArrLength: number = useSelector(artistsArrayLength);
  const albumsArrLength: number = useSelector(albumsArrayLength);
  const songsArrLength: number = useSelector(songsListLength);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(fetchArtistsStarted(term));
    dispatch(fetchAlbumsStarted(term, 8));
    dispatch(fetchSongsStarted(term, 8));
  }, []);

  const handleFetchMoreAlbums = useCallback(
    (term: string, limit: number) => (event: React.MouseEvent) => {
      dispatch(fetchAlbumsStarted(term, 100));
      history.push("/user/search/albums");
    },
    []
  );

  const handleFetchMoreTracks = useCallback(
    (term: string, limit: number) => (event: React.MouseEvent) => {
      dispatch(fetchSongsStarted(term, 100));
      history.push("/user/search/tracks");
    },
    []
  );

  const handleFetchTracksByArtistName = useCallback(
    (term: string, limit: number) => (event: React.MouseEvent) => {
      dispatch(setArtist(term));
      dispatch(fetchSongsByArtist(term, 100));
      history.push(`/user/search/artist/${term}/tracks`);
    },
    []
  );

  const handleFetchTracksByAlbumName = useCallback(
    (term: string, limit: number) => (event: React.MouseEvent) => {
      dispatch(setAlbum(term));
      dispatch(fetchSongsByAlbum(term, limit));
      history.push(`/user/search/album/${term}/tracks`);
    },
    []
  );

  const handlePlayThisAlbumNow = useCallback(
    (term: string, limit: number) => (event: React.MouseEvent) => {
      dispatch(fetchSongsByAlbum(term, limit));
      dispatch(setPlay(false));
      dispatch(playThisSong(songsByAlbumArr[0]));
      dispatch(setAlbum(term));
      dispatch(setPlay(true));
      history.push(`/user/search/album/${term}/tracks`);
    },
    []
  );

  const handleSetCurrentSong = useCallback(
    (song: Song, id: number) => (event: React.MouseEvent) => {
      dispatch(setSong(song));
      dispatch(setIndex(id));
      history.push("/user/search/tracks");
    },
    []
  );

  const handlePlayThisTrackNow = useCallback(
    (song: Song, id: number) => (event: React.MouseEvent) => {
      dispatch(setPlay(false));
      dispatch(playThisSong(song));
      dispatch(setIndex(id));
      dispatch(setPlay(true));
      history.push("/user/search/tracks");
    },
    []
  );

  return (
    <SearchLayout
      term={term}
      handleFetchMoreAlbums={handleFetchMoreAlbums}
      handleFetchMoreTracks={handleFetchMoreTracks}
      handleFetchTracksByArtistName={handleFetchTracksByArtistName}
      handleFetchTracksByAlbumName={handleFetchTracksByAlbumName}
      handlePlayThisAlbumNow={handlePlayThisAlbumNow}
      artistsArrLength={artistsArrLength}
      albumsArrLength={albumsArrLength}
      songsArrLength={songsArrLength}
      handleSetCurrentSong={handleSetCurrentSong}
      handlePlayThisTrackNow={handlePlayThisTrackNow}
    />
  );
};
