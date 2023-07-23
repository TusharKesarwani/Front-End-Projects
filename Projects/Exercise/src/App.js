import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import Exercises from './components/Exercises';
import SearchExercises from './components/SearchExercises';
import ExerciseDetail from './pages/ExerciseDetail';
import  { useState } from 'react';









const App = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
    
    <Routes>
      <Route path="/" />
      <Route path="/exercise/:id" element={<ExerciseDetail />} />
    </Routes><Box>
    <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
    
      <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} /></Box>

  </Box>
  );
};

export default App;