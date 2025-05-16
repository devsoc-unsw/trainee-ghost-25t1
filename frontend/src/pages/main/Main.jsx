import { useState } from 'react'
import createTeam from '../../assets/createTeam.png';
import joinTeam from '../../assets/joinTeam.png';
import './Main.css'

function Main() {
  const [count, setCount] = useState(0)

  const onClick = () => {
    console.log('hello world!');
  }

  return (
    <>
      <div>
        <h1>Welcome!</h1>
        <h2>Set off on your journey to be the very best...</h2>
        <img className='create-team-button' src={createTeam} onClick={onClick}/>
        <img className='join-team-button' src={joinTeam}/>
      </div>
    </>
  )
}

export default Main
