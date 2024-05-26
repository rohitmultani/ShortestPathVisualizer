import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Grid from './components/Grid';
import { Analytics } from "@vercel/analytics/react"
import { VisualizerProvider } from './context/VisualizerContext';
import Intro from './components/Intro';

const App = () => {
  return (
    <VisualizerProvider>
      <Analytics/>
      <Intro />
      <NavBar />
      <div className="p-4">
        <Grid rows={30} cols={80} />
      </div>
    </VisualizerProvider>
  );
};

export default React.memo(App);
