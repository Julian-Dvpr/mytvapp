import React from 'react';
import Login from './Login';
import AddVideo from './AddVideo';
import ViewVideos from './ViewVideos';
import ShowRandomVideo from './ShowRandomVideo';

const App = () => {
  return (
    <div>
      <h1>Video App</h1>
      <Login />
      <AddVideo />
      <ViewVideos />
      <ShowRandomVideo />
    </div>
  );
};

export default App;
