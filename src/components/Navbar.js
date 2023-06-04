import React from 'react'
import { Link } from 'react-router-dom'
import  logoimg  from "../logo.png"
const Navbar = () => {
  return (
    <div className='h-14 p-2 flex items-start justify-center bg-pokemon-red shadow-[0_4px_50px_#EF5350]'>
        <Link to="/">
            <img src={logoimg} alt="Logo" height={36} width={124}/>
        </Link>
    </div>
  )
}

export default Navbar