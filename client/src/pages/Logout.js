import {useEffect} from 'react'
import axios from './../util/axiosInstance';

export default function Logout() {

  const logout = async () => {
      await axios.get('/api/users/logout');
  }

  useEffect(() => {
    logout();
  }, [])

  return (
    <div>Logout</div>
  )
}
