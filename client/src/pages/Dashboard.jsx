import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Sparkles } from 'lucide-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import {useAuth} from '@clerk/react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(false)
  
  const {getToken} = useAuth();

  const getDashboardData = async () => {
    try{
      const {data} = await axios.get('/api/user/get-user-creations', {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })

      if(data.success){
        setCreations(data.creations)
      }
      else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className='h-full overflow-y-scroll p-6'>
      <div className='flex justify-start gap-4 flex-wrap'>
        
        {/* Total Creations */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'> 
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex items-center justify-center'>
            <Sparkles className='w-5 text-white'/>
          </div>
        </div>

        {/* Published Creations */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'> 
          <div className='text-slate-600'>
            <p className='text-sm'>Published</p>
            <h2 className='text-xl font-semibold'>
              {creations.filter(c => c.publish).length}
            </h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#20C363] to-[#11B97E] text-white flex items-center justify-center'>
            <Sparkles className='w-5 text-white'/>
          </div>
        </div>

        {/* Drafts */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'> 
          <div className='text-slate-600'>
            <p className='text-sm'>Drafts</p>
            <h2 className='text-xl font-semibold'>
              {creations.filter(c => !c.publish).length}
            </h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#F76C1C] to-[#F04A3C] text-white flex items-center justify-center'>
            <Sparkles className='w-5 text-white'/>
          </div>
        </div>

        {/* Articles */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'> 
          <div className='text-slate-600'>
            <p className='text-sm'>Articles</p>
            <h2 className='text-xl font-semibold'>
              {creations.filter(c => c.type === 'article').length}
            </h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#B153EA] to-[#E549A3] text-white flex items-center justify-center'>
            <Sparkles className='w-5 text-white'/>
          </div>
        </div>

      </div>
      {loading ? (
        <div className='flex justify-center items-center h-3/4'>
      <span className='w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'></span>
    </div>
      ): (
      <div className='space-y-3'>
        <p className='mt-6 mb-4'>Recent Creations</p>
        {creations.map((item) => (
          <CreationItem key={item.id} item={item} />
        ))}
      </div>)}
    </div>
  )
}

export default Dashboard