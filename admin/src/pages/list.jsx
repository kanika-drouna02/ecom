import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'

const list = () => {

  const [list,setList] = useState([])

  const fetchList = async () => {
    try{
      const response = await axios.get(backendUrl + '/api/product/list')
      if(response.data.success){
        setList(response.data.products);
      }else{
        
      }
    }catch (error){

    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div>

    </div>
  )
}

export default list