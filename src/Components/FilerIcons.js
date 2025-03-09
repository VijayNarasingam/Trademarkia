import React from 'react'
import '../Styles.css'
import filterIcon from '../assets/filter3.png'
import shareIcon from '../assets/share.png'
import lineIcon from '../assets/filter2.png'
const FilerIcons = () => {
  return (
    <div>
      <div className='filterBtn'>
        <button className='filterIcon'> <img src={filterIcon}/> Filter</button>
        <button className='shareIcon'> <img src={shareIcon}/></button>
        <button className='lineIcon'> <img src={lineIcon}/></button>
        
      </div>
    </div>
  )
}

export default FilerIcons
