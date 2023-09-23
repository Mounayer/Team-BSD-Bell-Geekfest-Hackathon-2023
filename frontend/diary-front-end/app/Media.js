import React from 'react'

const Media = ({fragment}) => {
  return (
    <div className=' flex mx-5 flex-col border-black border w-[170px] h-[250px] bg-orange-400'>
        <div className=' h-full'>

        </div>
        <div className=' p-5 bg-slate-200 text-center text-sm'>
            <h2>{fragment.name}</h2>
        </div>
    </div>
  )
}

export default Media