import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from "../components/DiaryList.jsx";

const Home = () => {
  return (
    <div>
      <Header title={'2025년 11월'} leftChild={<Button text={'<'} />} rightChild={<Button text={'>'} />} />
      <DiaryList />
    </div>
  );
};

export default Home;
