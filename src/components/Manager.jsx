import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast, Bounce, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef();
  const [form, setform] = useState({site: "", username: "", password: ""});
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    // let passwordArray;
    if(passwords){
      setPasswordArray(JSON.parse(passwords));
    }
  }, [])

  const passwordRef = useRef(); 

  const showPassword = () => {
      if (ref.current.src.includes("icons/eyecross.svg")) {
          ref.current.src = "icons/eye.svg";
          passwordRef.current.type = "password"; 
      }
      else {
          ref.current.src = "icons/eyecross.svg";
          passwordRef.current.type = "text";
      }
  }

  const savePassword = () => {
    if (form.site.length > 0 && form.username.length > 0 && form.password.length > 0) { 
      const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
      setPasswordArray(newPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
      setform({site: "", username: "", password: ""});
      toast.success('Password Saved!', {
          position: "top-right",
          autoClose: 1000,
          theme: "dark", 
      });
    }
    else{
        toast.error('Error: Please fill all the fields!', {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  }

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this password?")
    if(c){
      const newPasswordArray = passwordArray.filter(item=>item.id!==id)
      setPasswordArray(newPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(newPasswordArray))

      toast.success('Password deleted!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
    }
  }

  const editPassword = (id) => {
    setform(passwordArray.filter(item=>item.id===id)[0])    
    setPasswordArray(passwordArray.filter(item=>item.id!==id))

    toast.success('Editing password!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
  }
  
  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value})
  }
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    
    toast.success('Copied to clipboard!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
  }

  return (
    <>
    
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark"
      transition={Slide}
      style={{ zIndex: 99999 }}
    />
    
    {/* <div className="absolute top-0 z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
    <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div> */}

    <div className="fixed inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
    </div>
    
    <div className="mycontainer">
        <h1 className='text-4xl text font-bold text-center'>
          <span className='text-green-500'>&lt;</span>
            Password Vault
          <span className='text-green-500'>/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your personal password manager</p>
          <div className="text-black flex flex-col p-4 gap-8 items-center">
              <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full px-4 py-1' type='text' name='site' id='' />
              <div className="flex w-full gap-8">
                  <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full px-4 py-1' type='text' name='username' id='' />
                  <div className="relative">
                    
                    <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 py-1' type='password' name='password' id='' />

                    <span className='absolute right-[3px] top-[3px] cursor-pointer' onClick={showPassword}>
                      <img ref={ref} className='p-1' width={27} src="icons/eye.svg" alt="eye" />
                    </span>
                  </div>
                  
              </div>
              
              <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
                <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="hover">
                </lord-icon>
                Save
              </button>

          </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl pb-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length != 0 && 
          <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-green-900 text-white'>
              <tr>
                <th class="px-4 py-2 text-center min-w-32">Site</th>
                <th class="px-4 py-2 text-center min-w-32">Username</th>
                <th class="px-4 py-2 text-center min-w-32">Password</th>
                <th class="px-4 py-2 text-center min-w-20">Actions</th>

              </tr>
            </thead>

            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    
                    <td className='py-2 border border-white text-center min-w-32'>
                      <div className='flex items-center justify-center gap-1'>
                        <a href={item.site} target='_blank' rel="noreferrer">{item.site}</a>
                        <img 
                          onClick={() => copyToClipboard(item.site)} 
                          className="w-5 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125 active:scale-90" 
                          src="/icons/copy.svg" 
                          alt="copy" 
                        />
                      </div>
                    </td>

                    <td className='py-2 border border-white text-center min-w-32'>
                      <div className='flex items-center justify-center gap-1'>
                        <span>{item.username}</span>
                        <img 
                          onClick={() => copyToClipboard(item.username)} 
                          className="w-5 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125 active:scale-90" 
                          src="/icons/copy.svg" 
                          alt="copy" 
                        />
                      </div>
                    </td>

                    <td className='py-2 border border-white text-center min-w-32'>
                      <div className='flex items-center justify-center gap-1'>
                        <span>{item.password}</span>
                        <img 
                          onClick={() => copyToClipboard(item.password)} 
                          className="w-5 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125 active:scale-90" 
                          src="/icons/copy.svg" 
                          alt="copy" 
                        />
                      </div>
                    </td>

                    <td className='py-2 border border-white text-center min-w-20'>
                      <div className='flex justify-center items-center gap-7'>
                        <span onClick = {() => {editPassword(item.id)}}>
                          <img
                            className="w-5 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125 active:scale-90" 
                            src="/icons/edit.svg" 
                            alt="copy" 
                          />
                        </span>
                        <span className='cursor-pointer' onClick = {() => {deletePassword(item.id)}}>
                          <script src="https://cdn.lordicon.com/lordicon.js"></script>
                          <lord-icon
                              src="https://cdn.lordicon.com/xyfswyxf.json"
                              trigger="hover"
                              style={{"width":"20px", "height":"20px"}}
                              className="transition-transform duration-200 ease-in-out hover:scale-125 active:scale-90"
                              >
                          </lord-icon>
                        </span>
                      </div>
                    </td>
                    
                  </tr>
                )
              })}
            </tbody>
            </table> 
            
            }
        </div>
      </div></>
  )
}

export default Manager
