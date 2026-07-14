import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='texxt-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className='text-justify'>We started with a simple idea: shopping online should feel easy, inspiring, and genuinely enjoyable. What began as a passion for well-made products has grown into a space where quality, design, and everyday usefulness come together. Our goal has always been to offer items that feel good to buy and even better to use.</p>
          <p className='text-justify'>Our approach is simple and customer-first. We’ve designed our store to be clean, intuitive, and easy to navigate, so you can find what you’re looking for without unnecessary distractions. Clear descriptions, honest pricing, and real details help you shop with confidence, whether it’s your first visit or your fiftieth.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p className='text-justify'>Behind the scenes, we work closely with trusted suppliers and partners who share our commitment to consistency and craftsmanship. From sourcing to packaging, we pay attention to the details because we know they matter. Every order is handled with care to ensure it arrives exactly as expected — no compromises.</p>
          <p className='text-justify'>We also believe that good service should feel human. Our support team is here to help with questions, recommendations, or anything in between. No scripted responses, no runarounds — just friendly, reliable assistance when you need it. Building long-term relationships with our customers is just as important to us as making a great sale.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600 text-justify'>We maintain strict quality standards to ensure every product meets expectations for durability and reliability.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600 text-justify'>Shop effortlessly with intuitive navigation, secure checkout, fast delivery, and seamless order tracking anytime.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600 text-justify'>Our friendly support team delivers prompt, personalized assistance to ensure every customer feels valued.</p>
        </div>
      </div>

      <NewsletterBox/>

    </div>
  )
}

export default About