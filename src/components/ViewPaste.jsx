import React from 'react'
//
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {

  const {id} =useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter( (p) => p._id === id)[0];
  console.log("final paste: ",paste)



  return (
    <div>
        <div className='flex flex-row gap-7 place-content-between'>
        {/* Home */}

            <input type="text" placeholder='Enter title here.'
                className='p-1 pl-4 w-[64%] rounded-md bg-zinc-950 mt-2'
                value={paste.title}
                disabled
                onChange={(e) => setTitle(e.target.value)} />

            {/* <button className='bg-stone-950 p-2 mt-2' onClick={createPaste}>
                { pasteId ? "Update My Paste" : "Create My Paste" }
            </button> */}
        </div>

        <div className='mt-7'>
            <textarea
            className='p-2 rounded-md bg-zinc-950 mt-4 min-w-[500px]'
            value={paste.content}
            disabled
            placeholder='Enter Content here.'
            onChange={(e) => setValue(e.target.value)}
            rows={20}
            />
        </div>
    </div>
  )
}

export default ViewPaste
