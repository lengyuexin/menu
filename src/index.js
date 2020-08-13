import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

import Menu from './menu';

import './index.css';



function App() {

  const [list, setList] = useState([])


  useEffect(() => {


    fetch('/tree.json').then(res => res.json()).then(data => {
     

      setList(data)
    }).catch(err => {
      console.error(err)
    })

  }, [])

  return (
    <div className='menu-container'>
      <Menu list={list} />


    </div>

    
  )
}

render(<App />, document.getElementById("root"))