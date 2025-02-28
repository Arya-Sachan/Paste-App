import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title,setTitle] = useState('');
    const [value,setValue] = useState(''); 
    const [searchParams ,setSearchParams] = useSearchParams();
    const pasteId= searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect( () =>{
        console.log("chl raha h");
        if(pasteId){
            const paste = allPastes.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
  
    }, [pasteId])

    function createPaste (){
        const paste= {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }



        if(pasteId){
            //update
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }
    //after updation or creation:
    setTitle('');
    setValue('');
    setSearchParams({});


    }

  return (
    <div>
        <div className='flex flex-row gap-7 place-content-between'>
        {/* Home */}

            <input type="text" placeholder='Enter title here.'
                className='p-1 pl-4 w-[64%] rounded-md bg-zinc-950 mt-2'
                value={title}
                onChange={(e) => setTitle(e.target.value)} />

            <button className='bg-stone-950 p-2 mt-2' onClick={createPaste}>
                { pasteId ? "Update My Paste" : "Create My Paste" }
            </button>
        </div>

        <div className='mt-7'>
            <textarea
            className='p-2 rounded-md bg-zinc-950 mt-4 min-w-[500px]'
            value={value}
            placeholder='Enter Content here.'
            onChange={(e) => setValue(e.target.value)}
            rows={20}
            />
        </div>
    </div>
  );

}

export default Home
