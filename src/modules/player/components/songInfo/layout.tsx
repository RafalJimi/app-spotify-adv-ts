import React from "react";

import { SongInfoContainer } from "./layout.styled";
import { Song } from "../../../../store/models";

type SongInfoLayoutProps = {
  currentPlayedSong: Song;
};

export const SongInfoLayout = ({ currentPlayedSong }: SongInfoLayoutProps) => {
  return (
    <SongInfoContainer>
      <div className="songAlbum">
        {currentPlayedSong.artistName && (
          <img src={currentPlayedSong.artworkUrl30} alt="album" />
        )}
      </div>
      {currentPlayedSong.artistName && (
        <div className="songTitle">
          {" "}
          <p>{currentPlayedSong.trackName}</p>
        </div>
      )}
      {currentPlayedSong.artistName && (
        <div className="songArtist">
          {" "}
          <p>{currentPlayedSong.artistName}</p>
        </div>
      )}
    </SongInfoContainer>
  );
};
