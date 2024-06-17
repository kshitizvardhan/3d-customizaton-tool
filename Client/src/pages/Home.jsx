import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import {headContainerAnimation, headTextAnimation, slideAnimation, headContentAnimation } from '../config/motion'
import state from '../store'
import { CustomButton } from '../components'

const Home = () => {
    // similar to useContext hook of create, here we using useSnapshot from valtio
    const snap = useSnapshot(state)
    // snap --> 1 current snapshot of that state

  return (
    <AnimatePresence>
        {snap.intro && (
            <motion.section className='home' {...slideAnimation('left')}>
                <motion.header {...slideAnimation('down')}>
                    <img src='./threejs.png' alt="logo" className='w-8 h-8 object-contain'/>
                </motion.header>
                <motion.div className='homeContent' {...headContainerAnimation}>
                    <motion.div {...headTextAnimation}>
                        <h1 className='head-text'>
                            LET's <br className='xl:block hidden'/> DO IT.
                        </h1>
                    </motion.div>
                    <motion.div {...headContentAnimation} className="flex flex-col gap-5">
                        <p className="max-w-md font-normal text-gray-600 text-base">
                        Level Up Your Style! Unleash your inner designer with our 3D Customization Tool. <strong>Unleash Your Imagination</strong> {" "} and define your own style.
                        </p>
                        <CustomButton type='filled' title='Customize It' handleClick={()=> state.intro = false} customStyles="w-fit px-4 py-2.5 font-bold text-sm"/>
                    </motion.div>
                </motion.div>
            </motion.section>
        )}
    </AnimatePresence>
  )
}

export default Home

/* (Framer-Motion)
    AnimatePresence allows components to animate out when they're removed from the React tree.

    It's required to enable exit animations because React lacks a lifecycle method that:

    - Notifies components when they're going to be unmounted and
    Allows them to defer that unmounting until after an operation is complete (for instance an animation).

*/


/*
    There's a motion component for every HTML and SVG element, for instance <motion.div />, <motion.circle/>, <motion.section/> etc.

    These work exactly like their static counterparts, but offer props that allow you to:

    - Animate
    - Add drag, pan, hover and tap gestures
    - Respond to gestures and elements entering the viewport with animation
    - Deeply animate throughout React trees via variants 
*/