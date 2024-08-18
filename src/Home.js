// src/Home.js
import React, { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const Home = () => {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      const querySnapshot = await getDocs(collection(db, 'urls'));
      const urlsList = querySnapshot.docs.map(doc => doc.data().url);
      setUrls(urlsList);
    };

    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (url) {
      await addDoc(collection(db, 'urls'), { url });
      setUrls([...urls, url]);
      setUrl('');
    }
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.error('Error signing out:', error));
  };

  const getRandomUrl = () => {
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
  };

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter video URL"
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleSignOut}>Sign Out</button>
      <div>
        <h2>Random Video URL:</h2>
        <p>{urls.length > 0 ? getRandomUrl() : 'No URLs available'}</p>
      </div>
    </div>
  );
};

export default Home;
