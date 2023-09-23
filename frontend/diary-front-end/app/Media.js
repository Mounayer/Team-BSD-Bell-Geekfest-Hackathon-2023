import Text from '@/src/components/mediaThumbnail/Text'
import React from 'react'
import Picture from '@/src/components/mediaThumbnail/Picture';

const Media = ({media}) => {

  return (
    <div className=' flex mx-5 flex-col border-black border w-[170px] h-[250px]'>
        <div className=' h-full flex justify-center items-center'>
          {getMediaThumbnail()}
        </div>
        <div className=' p-5 bg-slate-200 text-center text-sm'>
            <h2>{media.file_name}</h2>
        </div>
    </div>
  )

  function getMediaThumbnail() {
    if(media.data_type == 'text') {
      console.log('THIS');
      return <Text />
    }
    if(media.data_type == "image") {
      console.log('FOUND IMAGE');
      return <Picture />
    }
  }
}

export default Media