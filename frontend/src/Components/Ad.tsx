import { Link } from 'react-router-dom'
import profileImg from '../assets/images/Account_profilDefault.png'


type Props = {
    ad:{
        title:string
        location:string
        category: string
        wage:number
        createdAt: Date 
        _id: string
    }
}



function Ad({ad}: Props) {

  
  return (
    <div className='w-full px-1 py-[0px] md:py-1 md:w-[90%] sm:px-[0px]'>

        {/* Link to Single Ad  */}
        <Link to={`/ad/${ad?._id}`}>
        
        <div className='mx-auto h-[110px] w-[95%] flex justify-between items-center border-lightBeige border-b-0 border-t-2 text-[14px] md:h-[80px] md:border-y-2'>
          {/* Left Section*/}
        <div className="h-full flex justify-start sm:gap-3">
             {/* Profile Image*/}
             <div className='w-[50px] '>
                <div className='mb-[20px] w-[50px] h-[75px] flex self-start justify-center items-end rounded-b-[40px]  bg-lightBeige md:w-[40px] md:h-[50px]'>
                    <div className='mb-1 w-[40px]  h-[40px]  self-end rounded-full bg-white md:w-[30px] md:h-[30px]'>
                        <img src={profileImg} alt="" />
                    </div>
                </div>
             </div>
          

           
            <div className='w-[180px] flex  flex-col  justify-center items-center md:w-[400px] md:flex-row sm:w-[200px]'>
                <div className='w-[150px] flex sm:w-[200px]'>

                    {/* Title, Sector */}
                    <div className='text-textBlack sm:w-[250px]'>
                        <p className='text-[18px] text-textBlack'>{ad.title}</p>
                        <p className='text-[16px] text-textBlack text-opacity-50'>Sector</p>
                    </div>
                </div>

                <div className='w-[150px] flex justify-end gap-1 sm:w-[200px] sm:gap-2'>
                    {/* Location */}
                    <div className='p-1 w-[100px] flex justify-center items-center  border-2 border-lightBeige rounded-full text-[10px] text-textBlack text-opacity-50 sm:w-[100px] sm:text-[12px]'>
                        <p>{ad.location}</p>
                    </div>
                    {/* Category */}
                    <div  className='p-1 w-[100px] flex justify-center items-center rounded-full text-[10px]  text-textBlack text-opacity-50  bg-lightBeige sm:w-[100px] sm:text-[12px]'>
                        <p>{ad.category}</p>
                    </div>
                </div>
            </div>
          </div>
           
          {/* Right Section */}
          <div className='w-[70px] h-full flex self-end flex-col justify-end  items-start gap-1 md:w-[180px] md:flex-row md:self-center md:items-center md:justify-between'>
            {/* Created At */}
            <div className='text-[14px] text-textBlack text-opacity-50 md:ml-[10px] md:text-[16px]'>
                <p>{new Date(ad.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Wage */}
            <div className=' w-[70px] h-[60px] flex justify-center items-center     rounded-t-[20px] text-[14px]  text-textBlack text-opacity-70 bg-lightBeige md:mr-[-15px] md:h-[80px] md:w-[70px] md:rounded-r-[20px] md:rounded-tl-[0px] md:text-[16px]'>
                <div className='text-[18px]'>
                    {ad.wage}€ 
                    <p className='text-[14px] text-textBlack text-opacity-50'>
                        / hour
                    </p>
                </div>
            </div>
          </div>
        </div>
        </Link>
    </div>
  )
}

export default Ad