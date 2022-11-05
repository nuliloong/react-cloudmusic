import React from 'react'
import './index.less'
import Musicinfo from './musicinfo'
import PlayControl from './playline'
import VolumeControl from './volumecontrol'

export default function Footer() {
  return (
    <div className='footer'>
      <Musicinfo/>
      <PlayControl/>
      <VolumeControl/>
    </div>
  )
}
