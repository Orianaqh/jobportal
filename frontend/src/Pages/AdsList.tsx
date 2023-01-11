// Hooks
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAds from '../Hooks/useAds'
import useUser from '../Hooks/useUser'
import useSearch from '../Hooks/useSearch'
// Components
import Ad from '../Components/Ad'
import UniButton from '../Components/UniButton'
import Spinner from '../Components/Spinner'
import Search from '../Components/Search'
// framer-motion
import { motion } from 'framer-motion'
// Images
import man from '../assets/images/Ads_man_working.png'

const AdsList = () => {
  // CONSTANTS
  const { searchWord, setSearchWord } = useSearch()
  const [searchInput, setSearchInput] = useState('')
  const user = useUser()
  const ads = useAds(`/ads?search=${searchWord}`)
  const navigate = useNavigate()

  // HANDLE POST AD BUTTON
  const handleClick = () => {
    if (user.user) {
      navigate('/post-ad')
    } else {
      navigate('/auth-required')
    }
  }

  return (
    <motion.div
      initial={{ width: '100%' }}
      animate={{ width: '100%' }}
      exit={{ x: window.innerWidth }}
      className='pt-[120px] pb-[80px] h-full w-full min-h-[920px]'
    >
      {/* LOADING SPINNER */}
      {ads.isLoading ? (
        <Spinner />
      ) : (
        <>
          {/* Heading with underline  */}
          <div className='mx-auto mt-[30px]  h-[100px] w-[250px]'>
            <h2 className='text-left text-[45px] font-semibold leading-tight'>
              Be part of
              <p>
                our
                <span className='capitalize  text-lightGreen text-[45px'>
                  {' '}
                  mission
                </span>
              </p>
            </h2>

            {/* Line */}
            <div className='w-[52%] min-w-[220px] hidden  border-b-[3px] border-lightGreen sm:block absolute sm:top-[260px] sm:right-0' />
            {/* Semicircle */}
            <div className='w-24 h-24 hidden  right-[-3rem] top-[210px]  rounded-full bg-lightGreen lg:block absolute'></div>
          </div>

          {/* Main Container */}
          <div className='mx-auto  w-full h-full  flex justify-center items-start gap-10 '>
            {/* Image */}
            <div
              className='lg:w-[500px] lg:h-[400px] hidden 
             xl:h-[500px] lg:ml-2 lg:flex'
            >
              <img
                className='h-full w-full'
                src={man}
                alt='person working on computer'
              />
            </div>

            <div
              className='flex flex-col justify-end items-end'>

            {/* Search */}
            <div
              aria-label='search'
              className='w-[500px] pr-2 h-auto flex justify-end items-end mt-[50px]'>
              <Search
                searchInput={searchInput}
                setSearchInput={setSearchInput}/>
            </div>
            {/* Ads Container */}
            {ads.adList.length === 0 ? (
              <div className='mt-[30px] h-[150px] text-center sm:px-5 sm:w-[600px] md:w-[900px] font-bold relative text-3xl
              top-[40px] lg:top-[150px] xl:top-[200px] md:text-4xl
              text-darkBeige'>
                No ads found
              </div>
            ) : (
              <div className='mt-[10px] w-full h-full flex flex-wrap justify-items-center items-start sm:px-5 sm:w-[600px] sm:h-[552px]  md:w-[900px] md:h-[435px] sm:overflow-y-scroll '>
            

                {/* Ads */}
                <div className='mx-auto flex flex-wrap justify-center '>
                  {ads.adList?.map((ad) => (
                    <Ad key={ad._id} ad={ad} />
                  ))}
                </div>
              </div>
            )}
          </div>
          </div>

          {/* Button Ad Post */}
          <div
            className='mb-[30px]  w-full h-[50px] 
          flex justify-center items-center lg:w-[50%] xl:p-0 mx-auto'
          >
            <UniButton
              text='Post Ad'
              onClick={handleClick}
              className='my-5  w-[250px] flex justify-center lg:w-[600px] lg:mb-0 2xl:justify-center'
            />
          </div>
        </>
      )}
    </motion.div>
  )
}

export default AdsList
