import React from 'react'
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const PokeSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#babfbb" highlightColor="#d9dedb" >   
        <div className='flex-1 flex justify-center items-center'>
            <div style={{ maxWidth: '100%' }} className='h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] flex justify-center items-center'><Skeleton height={400} width={400} /></div>
        </div>
        <div className='flex-1 min-h-screen pb-24 pr-4 bg-gray-300 flex flex-wrap sm:flex-nowrap justify-center items-center'>
            <div className='flex-1'>
              <p>
                <Skeleton height={25} width={200}/>
              </p>
              <p className='mt-2'>
                <Skeleton height={20} width={100}/>
              </p>
              <p>
                <Skeleton height={20} width={100}/>
              </p>
              <div className='flex justify-center'>
                  <p className='mr-2 px-4 rounded'><Skeleton height={30} width={100} /></p>
                  <p className='mr-2 px-4 rounded'><Skeleton height={30} width={100} /></p>
              </div>
              {Array(6)
                .fill()
                .map((_, index) => (
                    <div key={index}>
                        <div className="flex justify-between mt-2">
                        <span><Skeleton height={20} width={30}/></span>
                        <span><Skeleton height={20} width={20}/></span>
                        </div>
                        <div className="h-4 w-full rounded-full">
                            <div className="h-4 rounded-full"><Skeleton height={20} width={1000} /></div>
                        </div>
                    </div>
                    ))}
              </div>
            </div> 
    </SkeletonTheme>
  )
}

export default PokeSkeleton