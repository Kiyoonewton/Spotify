import React, { useEffect, useState } from "react";
import { FaHeadphones, FaHeart, FaRegClock, FaRegHeart } from "react-icons/fa";
import MusicPlayer from "./MusicPlayer";
import Songs from "./Songs";

function AudioList() {
  const [favourite, setFavourite] = useState(Songs);
  const [song, setSong] = useState(Songs[0].song);
  const [img, setImg] = useState(Songs[0].imgSrc);

  useEffect(() => {
    const songs = document.querySelectorAll(".songs");
    function changeMenuactive() {
      songs.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    songs.forEach((n) => n.addEventListener("click", changeMenuactive));
  }, []);

  const changeFavourite = (id) => {
    Songs.forEach((song) => {
      if (song.id === id) {
        song.favourite = !song.favourite;
      }
    });
    setFavourite([...Songs]);
  };

  const setMainSong = (songSrc, imgSrc) => {
    setSong(songSrc);
    setImg(imgSrc);
  };
  return (
    <div className="audioList">
      <h2 className="title">
        The list <span>{`${Songs.length} Songs`}</span>
      </h2>
      <div className="songsContainer">
        {favourite &&
          favourite.map((song, index) => (
            <div
              className="songs"
              key={song.id}
              onClick={() => setMainSong(song?.song, song?.imgSrc)}
            >
              <div className="count">
                {index + 1 < 10 ? `#0${index + 1}` : `#${index + 1}`}
              </div>
              <div className="song">
                <div className="imgBox">
                  <img src={song?.imgSrc} alt="" />
                </div>
                <div className="section">
                  <p className="songName">
                    {song?.songName}
                    <span className="spanArtist">{song?.artist}</span>
                  </p>
                  <div className="hits">
                    <p className="hit">
                      <i>
                        <FaHeadphones />
                      </i>
                      95,490,102
                    </p>
                    <p className="duration">
                      <i>
                        <FaRegClock />
                      </i>
                      3:04
                    </p>
                    <div
                      className="favourite"
                      onClick={() => changeFavourite(song?.id)}
                    >
                      {song?.favourite ? (
                        <i>
                          <FaHeart />
                        </i>
                      ) : (
                        <i>
                          <FaRegHeart />
                        </i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <MusicPlayer song={song} imgSrc={img} />
    </div>
  );
}

export default AudioList;
