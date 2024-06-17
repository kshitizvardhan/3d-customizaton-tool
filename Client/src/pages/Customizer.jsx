import React, {useState, useEffect} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config.js'
import state from '../store/index.js'
import {download } from '../assets'
import {downloadCanvasToImage, reader} from '../config/helpers.js'
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants.js'
import { fadeAnimation, slideAnimation } from '../config/motion'
import {AIPicker,ColorPicker,FilePicker, Tab,CustomButton} from "../components"

const Customizer = () => {
  return (
    <div>Customizer</div>
  )
}

export default Customizer