import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes); //print the stored data in localhost (in Application bar)
  console.log(pastes);

  const [searchTerm, setSearchTerm]= useState("");

  const dispatch = useDispatch();

  const filteredData = pastes.filter( 
    (paste) => paste.title.toLowerCase().includes
    (searchTerm.toLowerCase())
  );

  function handleDelete (pasteId){
    dispatch(removeFromPastes(pasteId));
  }



  return (
    <div>
      <input 
        className='p-2 rounded-md w-[600px] mt-5 bg-zinc-950'
        type="search"
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}        
      />

      <div className='flex flex-col mt-5 gap-5'>
        {
          filteredData.length > 0 && 
          filteredData.map(
            (paste) => {
              return (
                <div className='border' key={paste?._id} >

                  <div>
                    {paste.title}
                  </div>

                  <div>
                    {paste.content}
                  </div>

                  <div className='flex flex-row place-content-evenly mt-5 mb-3 gap-5'>

                    <button>
                      <a href= {`/?pasteId=${paste?._id}`}> Edit</a>
                    </button>

                    <button>
                      <a href={`/pastes/${paste?._id}` } >View </a>
                    </button>

                    <button onClick= { () =>handleDelete(paste?._id)} >
                      Delete
                    </button>

                    <button onClick= { () => {
                      navigator.clipboard.writeText
                      (paste?.content)
                      toast.success("Copied to clipboard")
                    }}>
                      Copy
                    </button>

                    <button>Share</button>

                  </div>

                  <div className='mb-3'>
                    {paste.createdAt}
                  </div>

                </div>
              )
            }
          )
        }

      </div>


    </div>
  )
}

export default Paste
