import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox'



const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, itaque nesciunt! Dolores temporibus aperiam ipsa nisi non nulla praesentium sint, exercitationem, dolore optio reprehenderit aut explicabo magnam at illum dignissimos?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam sunt laborum perferendis esse. Voluptatem, labore architecto voluptatum ratione reprehenderit cumque cum similique iure? Culpa distinctio nihil placeat perspiciatis dolor?</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quisquam doloremque esse expedita harum, soluta ipsa, et repudiandae quis tempora, saepe laudantium voluptatum! Eum enim dignissimos asperiores alias modi. Necessitatibus!</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Qulity Assurance:</b>
           <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis dicta consequatur, culpa ullam hic tempora aliquid totam illum.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Convience:</b>
           <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis dicta consequatur, culpa ullam hic tempora aliquid totam illum.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Exceptional Customer Service:</b>
           <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis dicta consequatur, culpa ullam hic tempora aliquid totam illum.</p>
        </div>
      </div>

      <NewsletterBox/>


    </div>
  )
}

export default About