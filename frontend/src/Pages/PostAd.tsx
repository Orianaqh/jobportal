import { useEffect, useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import { MdEmail } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import useAds from '../Hooks/useAds'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import imagePostAd from '../assets/images/PostAd_chef.png'
import UniButton from '../Components/UniButton'

const PostAd = () => {
  const navigate = useNavigate()

  const ads = useAds()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [wage, setWage] = useState<number>()
  const [category, setCategory] = useState('')
  const [contactVia, setContactVia] = useState([''])
  const [checked, setChecked] = useState({ email: true, phone: false })
  // const [image, setImage] = useState('')
  console.log(description)

  // Handle ContactVia according checkbox
  useEffect(() => {
    if (checked.email && checked.phone) {
      setContactVia(['email', 'phone'])
    } else if (!checked.email && checked.phone) {
      setContactVia(['phone'])
    } else if (checked.email && !checked.phone) {
      setContactVia(['email'])
    } else {
      toast.warning('Please select a contact option!')
    }
  }, [checked])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    ads.setIsLoading(true)

    const ad = {
      title,
      category,
      description,
      location,
      wage,
      contactVia,
    }
    console.log(ad)

    const response = await axiosInstance
      .post('/ads/post', ad)
      .catch((e) => e.response)

    console.log(response)

    if (response.status === 201) {
      const id = response.data._id
      navigate('/ad/' + id)
    } else if (response.status === 400) {
      const error = response.data.message[0]
      const key = Object.keys(error)[0]
      const message = error[key]
      ads.setError(message)
      toast.error(message)

      console.log('ERROR', ads.error)
    } else if (response.status === 401) {
      ads.setError('You are not logged in.')
      toast.warning('You are not logged in!')
    } else {
      ads.setError('Something went wrong')
      toast.error('Something went wrong')
    }
    ads.setIsLoading(false)
  }

  return (
    <div
      area-label='page-postAd'
      className='h-full lg:pt-0 mt-[0px] relative flex justify-center items-center text-Black '
    >
      {/* CIRCLE and LINES */}
      <div
        area-label='circle'
        className='hidden md:block md:w-[332px] md:h-[332px] md:absolute md:top-[50%] md:left-[-250px] md:translate-y-[-50%] md:rounded-full md:bg-lightGreen'
      />
      <div
        area-label='line'
        className='w-screen hidden md:block md:absolute md:top-[50%] md:translate-y-[-50%] md:left-0 md:border-b-[3px] md:border-lightGreen'
      />

      {/* MAIN */}
      <div
        area-label='main'
        className='relative  h-full min-h-[920px] w-[85%] max-w-[1000px]  md:w-[70%] flex flex-col justify-center'
      >
        {/* TITLE - Create your Ad - MOBILE with line*/}
        <div>
          <h1
            area-label='title-mobile'
            className='text-4xl font-medium text-textBlack md:hidden lg:hidden'
          >
            <span className='italic font-medium text-lightGreen md:hidden lg:hidden'>
              Create{' '}
            </span>
            your Ad
          </h1>
          <div
            area-label='line'
            className='w-[140px] absolute top-[%] left-0 border-b-[3px] border-lightGreen md:hidden lg:hidden'
          />
        </div>

        {/* AD FORM */}
        <form
          area-label='form'
          className='mt-8 gap-6 md:flex-col lg:flex-row md:gap-10 lg:gap-20 z-10 '
          onSubmit={handleSubmit}
          // className="flex flex-col justify-center"
        >
          <div
            area-label='ad'
            className='p-5 pt-10  flex flex-col item-center rounded-[21px] bg-white shadow-standard  sm:p-10 '
          >
            {/* TITLE - Create your Ad */}
            <div
              area-label='text left'
              className='flex flex-col items-center md:items-center lg:items-center md:gap-6'
            >
              <h1
                area-label='title-md'
                className='hidden p-3 text-4xl font-medium text-textBlack md:block'
              >
                <span className='italic font-medium text-lightGreen'>
                  Create{' '}
                </span>
                your Ad
              </h1>

              {/* RADIO (offering- searching) */}

              <div
                area-label='index-radio'
                className='px-1 w-full flex justify-end items-center gap-5'
              >
                <div className='flex gap-2'>
                  <input
                    type='radio'
                    value='offering'
                    name='case'
                    className='accent-darkGreen'
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label className='form-label'>offering</label>
                </div>

                <div className='flex gap-2'>
                  <input
                    type='radio'
                    value='searching'
                    name='case'
                    className='accent-darkGreen'
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label className='form-label'>searching</label>
                </div>
              </div>
            </div>

            {/* TITLE - CITY */}
            <div
              area-label='inputs colum'
              className='w-full mt-3 flex flex-col items-center justify-center'
            >
              <div
                area-label='title-city'
                className='w-full flex flex-col justify-center  lg:flex-row lg:justify-between gap-2 '
              >
                <div className='w-full flex flex-col lg:w-[65%]'>
                  <label
                    htmlFor='title'
                    className='form-label hidden mb-0 text-gray font-semibold  lg:inline-block'
                  >
                    Title
                  </label>
                  <input
                    type='text'
                    name='title'
                    className=' form-control py-1 px-5 w-full block text-gray border-2 rounded-lg border-lightGray border-opacity-50 placeholder:text-sm 
                focus:outline-lightGray '
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className='w-full flex flex-col  lg:w-[35%]'>
                <label
                  area-label='city'
                  htmlFor='city'
                  className='form-label hidden mb-0 text-gray font-semibold lg:inline-block'
                >
                  City
                </label>
                <input
                  type='text'
                  name='city'
                  className='py-1 px-5 form-control box-border  text-gray rounded-lg border-2 border-lightGray border-opacity-50 placeholder:text-sm  focus:outline-lightGray'
                  placeholder='City'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                </div>

                
              </div>

              {/* TEXTAREA */}
              <textarea
                area-label='text area'
                name='text'
                id='text'
                className='h-[170px] w-full mt-3 mb-3 p-5 rounded-xl resize-none caret-gray border-2 border-lightGray border-opacity-50 focus:outline-none placeholder:text-sm placeholder:text-lightGray  lg:w-full  lg:mb-0 lg:rounded-3xl lg:placeholder:text-base'
                placeholder='Your description..'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              {/* CHECKBOX (email-phone) */}
              <div
                area-label='form-bottom'
                className='w-full m-2 flex flex-wrap-reverse justify-start gap-3 lg:flex-row lg:justify-between lg:gap-2 '
              >
                <div
                  area-label='checkbox-text '
                  className=' w-[300px] flex  flex-wrap justify-start  gap-1 sm:gap-3 lg:flex-row lg:justify-center lg:items-center'
                >
                  <p className='text-lightGray'>How to reach you:</p>

                  <div area-label='email-phone' className='flex flex-row justify-start gap-3'>
                    <div area-label='email' className='flex flex-row gap-2'>
                      <input
                        type='checkbox'
                        value='email'
                        name='contact'
                        checked={checked.email}
                        className='accent-darkGreen form-checkbox'
                        onChange={(e) =>
                          setChecked({
                            email: !checked.email,
                            phone: checked.phone,
                          })
                        }
                      />
                      <label>Email</label>
                    </div>
                    <div area-label='phone' className='flex flex-row gap-2'>
                      <input
                        type='checkbox'
                        value='phone'
                        name='contact'
                        checked={checked.phone}
                        className='accent-darkGreen form-checkbox'
                        onChange={(e) =>
                          setChecked({
                            email: checked.email,
                            phone: !checked.phone,
                          })
                        }
                      />
                      <label>Phone</label>
                    </div>
                  </div>
                </div>
                {/* WAGE */}
                <div
                  area-label='wage'
                  className='w-[300px] flex flex-wrap justify-start items-center lg:items-center gap-1 sm:gap-3 lg:flex-row lg:justify-end lg:gap-2'
                >
                  <label className=' text-lightGray'>
                    Approx. wage per hour:
                  </label>
                  <div>
                    <input
                    type='number'
                    name='wage'
                    className='py-1 px-5 w-[100px] text-sm text-gray rounded-lg border-2 border-lightGray border-opacity-50 focus:outline-none  placeholder:font-bold placeholder:opacity-50 '
                    placeholder ='00'
                    value={wage}
                    onChange={(e) => setWage(Number(e.target.value) || 0)}
                    />
                    <span className='text-lightGray ml-1'>€</span>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          {/* POST AD - BUTTON */}
          <UniButton
            area-label='postAdButton'
            text={ads.isLoading ? 'loading' : 'Post Ad'}
            className='my-7 mx-auto w-[200px] self-center  md:mb-0 lg:w-[250px]'
          />
        </form>
         {/* IMAGE right/botton */}
      <img
        className='w-[200]  lg:w-[260px] lg:h-[330px] hidden absolute bottom-[-55px] right-[-60px]  sm:block z-30'
        src={imagePostAd}
      ></img>
      </div>

     

      <ToastContainer position='top-left' />
    </div>
  )
}

export default PostAd
