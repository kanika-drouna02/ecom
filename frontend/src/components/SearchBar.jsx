import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search , setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const location = useLocation();
    
    // Check if current page is collection page
    // Adjust the path check based on your actual collection page route
    const isCollectionPage = location.pathname === '/collection' || 
                             location.pathname.includes('/collection/') ||
                             location.pathname === '/collections' || 
                             location.pathname.includes('/collections/');

    // On navigation: restore saved per-page visibility (if any)
    // Only run this effect if we're on collection page
    useEffect(()=>{
        if (!isCollectionPage) {
            setShowSearch(false);
            return;
        }
        
        const key = `search_open:${location.pathname}`;
        const saved = sessionStorage.getItem(key);
        if(saved === 'true') setShowSearch(true);
        else setShowSearch(false);
    },[location.pathname, setShowSearch, isCollectionPage])

    // Persist visibility for the current pathname whenever it changes
    // Only run this effect if we're on collection page
    useEffect(()=>{
        if (!isCollectionPage) return;
        
        const key = `search_open:${location.pathname}`;
        try{ sessionStorage.setItem(key, showSearch ? 'true' : 'false'); }catch(e){}
    },[showSearch, location.pathname, isCollectionPage])

    // Only render if on collection page AND showSearch is true
    return (isCollectionPage && showSearch) ? (
        <div className='border-t border-b bg-gray-40 text-center'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input 
                    value={search} 
                    onChange={(e)=>setSearch(e.target.value)} 
                    className='flex-1 outline-none bg-inherit text-sm' 
                    type="text" 
                    placeholder='Search' 
                />
                <img className='w-4 cursor-pointer' src={assets.search_icon} alt="search" />
            </div>
            <img 
                onClick={()=>setShowSearch(false)} 
                className='inline w-3 cursor-pointer' 
                src={assets.cross_icon} 
                alt="close" 
            />
        </div>
    ) : null
}

export default SearchBar