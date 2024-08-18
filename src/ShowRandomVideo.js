// src/components/ShowRandomVideo.js

import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const ShowRandomVideo = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const videoList = querySnapshot.docs.map((doc) => doc.data().url);
        setVideos(videoList);
        if (videoList.length > 0) {
          setCurrentVideo(videoList[Math.floor(Math.random() * videoList.length)]);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleNextVideo = () => {
    if (videos.length === 0) return;
    setCurrentVideo(videos[Math.floor(Math.random() * videos.length)]);
  };

  return (
    <div>
      {currentVideo && (
        <iframe
          width="560"
          height="315"
          src={currentVideo}
          title="Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      <button onClick={handleNextVideo}>Next Video</button>
    </div>
  );
};

export default ShowRandomVideo;
