import React, {useState, useEffect} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config.js'
import state from '../store/index.js'
import {download, logoShirt, stylishShirt } from '../assets'
import {downloadCanvasToImage, reader} from '../config/helpers.js'
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants.js'
import { fadeAnimation, slideAnimation } from '../config/motion'
import {AIPicker,ColorPicker,FilePicker, Tab,CustomButton} from "../components"

const Customizer = () => {
  const snap = useSnapshot(state);

  // file state
  const [file, setFile] = useState("");

  // AI-prompt state
  const [prompt, setPrompt] = useState("");

  // loading state
  const [generatingImg, setGeneratingImg] = useState(false);

  // state for active button, which button we chosing, Color,Ai or file picker

  const [activeEditorTab, setActiveEditorTab] = useState("");

  // State for which shirt is being shown logo or full texture - basically for the two tabs at the bottom
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  })

  // show the tab content depending on the active tab
  // logic-> we will have switch statement which will look for the activeEditorTab  state variable, if the the state variable is ColorPicker then return a ColorPicker Component... similarly for others you can do.

  const generateTabContent = () =>{
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker 
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  // type-> logo or full texture
  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please Enter a Prompt");
    try {
      // call AI to generate Backend Image
      
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab("");
    }
  }

  const handleActiveFilterTab = (tabname) => {
    switch (tabname) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabname]
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabname]
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, active filter tab is to be updated.

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        // spreading the object to get the contents
        [tabname]: !prevState[tabname]
        // this toggles the filter tab off and on 
      }
    })
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    // then update the state
    state[decalType.stateProperty] = result;
    // now we will handle the bottom two tabs- the filter tab to show accordingly the logo or full texture uploaded by the user.
    if(!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result); // with this function we will handle the file and update the decal states in store accordingly 
        setActiveEditorTab("");
      })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation('left')}>
          {/* min-h-screen full height of the screen */}
            <div className='flex items-center min-h-screen'>
                <div className='editortabs-container tabs'>
                  {EditorTabs.map((tab)=>(
                    <Tab key={tab.name} tab={tab} handleClick={()=>{setActiveEditorTab(tab.name)}}/>
                  ))}
                  {/* Changing state as the user clicks and below calling the function to render the component */}
                  {generateTabContent()}
                </div>
            </div>
          </motion.div>
          <motion.div className="absolute top-5 right-5" {...fadeAnimation}>
            <CustomButton type="filled" title="Go Back" handleClick={()=> state.intro = true} customStyles="w-fit px-4 py-2.5 font-bold text-sm"/>
          </motion.div>
          <motion.div className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((tab)=>(
              <Tab key={tab.name} tab={tab} isFilterTab isActiveTab={activeFilterTab[tab.name]} handleClick={()=>{handleActiveFilterTab(tab.name)}}/>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer