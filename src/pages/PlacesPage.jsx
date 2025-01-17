import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Perks from '../Perks';
import axios from 'axios';

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
     
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text)
    {
        return (
        <h2 className='text-2xl mt-4'>{text}</h2>
    );
    }
    function inputDescription(text)
    {
        return (
        <p className='text-gray-500 text-sm'>{text}</p>
    );
    }
    function preInput(header,description)
    {
        return (
        <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
        );
    }

    async function addPhotoByLink(ev)
    {
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link',{link:photoLink})
        // setAddedPhotos([...addedPhotos,filename]);
        setAddedPhotos(prev=>{
            return [...prev,filename];
        });
        setPhotoLink('');
    }

    function uploadPhoto(ev)
    {
        const  files=ev.target.files;
        const data=new FormData();
        
        for (let i=0;i<files.length;i++)
        {
            data.append('photos',files[i]);
        }
        

        axios.post('/upload',data,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(response=>{
            const {data:filenames}=response;
            setAddedPhotos(prev=>{
                return [...prev, ...filenames];
            }
            );
            
        })
    }


    return (
        <div>
            {action !== "new" && (
                <div className='text-center'>
                    <Link to={'/account/places/new'} className='inline-flex gap-1 py-2 px-6 bg-primary text-white rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                        </svg>

                        Add new place</Link>
                </div>

            )}
            {action === "new" && (
                <div>
                    <form >
                        {preInput('Title','Title for your place . should be short and catchy as in an advertisement')}
            
                        <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)}  placeholder='title , for example My lovely Apartment' />

                        {preInput('Address','Address to your place')}
                        
                        <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder='address' />

                        {preInput('Photos','more=better')}
                        

                        <div className='flex gap-2'>
                            <input type="text" value={photoLink} onChange={ev=>setPhotoLink(ev.target.value)} placeholder='Add using a link  ....jpg' />
                            <button className='bg-gray-200 px-4 rounded-2xl' onClick={addPhotoByLink}>Add&nbsp;photo</button>
                        </div>


                        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {addedPhotos.length>0 && addedPhotos.map(link=>(
                                <div className='h-32 flex'>
                                    <img className='rounded-2xl w-full object-cover' src={"http://localhost:4000/uploads/"+link} alt="no img" />
                                    
                                </div>
                            ))}

                            <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                                <input type="file" multiple  className='hidden' onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>

                                Upload
                            </label>

                        </div>                        

                        
                        {preInput('Description','description of the place')}
                        <textarea value={description} onChange={ev=>setDescription(ev.target.value)} />
                        
                        {preInput('Perks','Select all the perks of your place')}
                       
                        
                        <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                            
                            <Perks selected={perks} onChange={setPerks} />

                        </div>

                        {preInput('Extra info','house rules etc')}
            
                        <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)} />

                        {preInput('Check in & out','add check in and out times, remember to have some time window for cleaning the room between guests')}

                        <div className='grid  gap-2 sm:grid-cols-3'>

                            
                            <div>
                                <h3 className='mt-2 -mb-1'>Check in time</h3>
                                <input type="text" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} placeholder='13'/>
                            </div>
                            
                            <div>
                                <h3 className='mt-2 -mb-1'>Check out time</h3>
                                <input type="text" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}  placeholder='11' />
                            </div>
                            
                            <div>
                                <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                                <input type="number" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} />
                            </div>                            
                                
                            <button className="primary my-4">Save</button>
                            
                        </div>
                    </form>
                </div>
            )}

        </div>
    )
}
