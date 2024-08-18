import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const ViewVideos = () => {
  const [videos, setVideos] = useState([]);
  const [randomVideo, setRandomVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const videoList = querySnapshot.docs.map((doc) => doc.data());
        setVideos(videoList);
        if (videoList.length > 0) {
          setRandomVideo(videoList[Math.floor(Math.random() * videoList.length)]);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleNext = () => {
    if (videos.length > 0) {
      setRandomVideo(videos[Math.floor(Math.random() * videos.length)]);
    }
  };

  return (
    <div>
      <h2>View Videos</h2>
      {randomVideo ? (
        <div>
          <p>{randomVideo.url}</p>
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default ViewVideos;
