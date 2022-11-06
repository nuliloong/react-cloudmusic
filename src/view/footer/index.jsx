import React from 'react'
import './index.less'
import Musicinfo from './musicinfo'
import PlayState from './playstate'
import VolumeControl from './volumecontrol'

export default function Footer() {
  return (
    <div className='footer'>
      {/* 音乐信息 */}
      <Musicinfo/>
      {/* 音乐控制器 */}
      <PlayState/>
      {/* 右侧音量控制器 */}
      <VolumeControl/>
    </div>
  )
}
