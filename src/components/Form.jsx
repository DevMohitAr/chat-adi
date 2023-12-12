import React from 'react'

export const Form = ({search,setSearch,onSubmit}) => {
  return (
    <form className="relative" onSubmit={(e)=>onSubmit(e)}>
      <div >
        <label htmlFor="search">Enter your text</label>
        <input
          type="search"
          name="search"
          id="search"
          value={search}
          className="w-full p-3 border-2 border-gray-500 rounded-md"
          onChange={(e)=>setSearch(e.target.value)}
      
        />
      </div>
      <div className='absolute top-[50%] right-5'>
        <button>Submit</button>
      </div>
    </form>
  );
}
