import React from 'react'
import LeftDiv from './left/LeftDiv';
import RightDiv from './right/RightDiv';

const Container = () => {
  return (
    <div className='container'>
      <LeftDiv />
      <RightDiv />
    </div>
  )
}

export default Container;