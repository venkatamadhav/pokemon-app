import React from 'react'
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#babfbb" highlightColor="#d9dedb">
    <div className='flex flex-wrap justify-center'>
    {Array(20)
        .fill()
        .map((_, index) => (
        <div className="card p-4 " key={index}>
            <div className='bg-gray-200 p-4 rounded' >
                <div className='h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] flex justify-center items-center'>
                    <Skeleton height={260} width={260}/>
                </div>
                <div className='flex justify-center'>
                    <p className='mr-2 px-2.5 py-0.5 rounded'><Skeleton height={20} width={60} /></p>
                    <p className='mr-2 px-2.5 py-0.5 rounded'><Skeleton height={20} width={60} /></p>
                </div>
                <p className='text-center'>
                    <span className='m-2 pt-2'>
                        <Skeleton height={30} width={260}/>
                    </span>
                </p>
            </div>
        </div>
        ))}
        </div>
        </SkeletonTheme>
  )
}

export default CardSkeleton