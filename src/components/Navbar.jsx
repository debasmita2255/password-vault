import React from 'react'

const Navbar = () => {
  return (
    <nav className = 'bg-slate-800 text-white w-full'>
      <div className="mycontainer justify-between flex items-center px-4 py-5 h-16">
        <div className='logo font-bold text-white text-2xl'>
          <span className='text-green-500'>&lt;</span>
          Password Vault
          <span className='text-green-500'>/&gt;</span>
        </div>
          {/* <ul>
            <li className='flex gap-4'>
                <a href="#" className='hover:font-bold'>Home</a>
                <a href="#" className='hover:font-bold'>About</a>
                <a href="#" className='hover:font-bold'>Contact</a>
            </li>
          </ul> */}
          <a href="https://github.com/debasmita2255/password-vault?tab=readme-ov-file">
            <button className='text-white bg-green-600 my-5 rounded-full flex justify-between items-center'>
              <img className='invert w-8 p-1' src="/icons/github.png" alt="github logo" />
              <span className='font-semibold pr-2'>GitHub</span>
            </button>
          </a>
      </div>
    </nav>
  )
}

export default Navbar
