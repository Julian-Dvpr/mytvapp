// src/components/AddVideo.js

import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const AddVideo = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  // Convierte la URL del video a formato de incrustación
  const convertToEmbedUrl = (url) => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleAddVideo = async () => {
    if (!videoUrl) return;

    try {
      const embedUrl = convertToEmbedUrl(videoUrl);
      await addDoc(collection(db, 'videos'), {
        url: embedUrl,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });
      console.log('Video added!');
      setVideoUrl('');
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter YouTube video URL"
      />
      <button onClick={handleAddVideo}>Add Video</button>
    </div>
  );
};

export default AddVideo;
