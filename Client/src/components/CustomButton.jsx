import React from 'react'
import state from '../store'
import { useSnapshot } from 'valtio'

const CustomButton = ({title, type, customStyles, handleClick}) => {
    const snap = useSnapshot(state);
    const generateStyle = (type) => {
        if(type === "filled"){
            return{
                backgroundColor: "#EFBD48",
                color: "#fff"
            }
        } else if (type === "outline"){
          return{
            borderWidth: "1px",
            borderColor: "#EFBD48",
            color: "#fff"
          }
        }
    }
    
  return (
    <button className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`} style={generateStyle(type)} onClick={handleClick}>{title}</button>
  )
}

// As soon as the button is clicked the handleClick sets the intro in state to false and hence we no longer on the Home Page
// After button is clicked we will move to Customizer-page

export default CustomButton