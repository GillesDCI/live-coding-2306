import {useEffect, useState} from 'react'
import axios from './../util/axiosInstance';

export default function Profile() {
  //state
  const [profileInfo, setProfileInfo] = useState(null);


   //methods
    const getProfileInfo = async() => {
        try {
          const res = await axios.get('/api/users/profile'); 
  
          setProfileInfo(res.data.profile);
  
        } catch (error) {
            console.error("An error happened", error);
        } 
    }

  useEffect(() => {
       getProfileInfo()
   }, [])



  //ui elements
  return (
      <>
    <div>Profile</div>

    {
        profileInfo != null 
        ? 
        <>
         <h1>{profileInfo.firstname} {profileInfo.lastname}</h1>
         <h3>{profileInfo.username}</h3>
         <h3>{profileInfo.email}</h3>

        </>

        :
        <p>No user found</p>
    }
    </>
  )
}
