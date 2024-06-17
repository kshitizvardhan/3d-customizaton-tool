// Valtio- newly released state management tool
// Creating a store for this: similar to Recoil/Redux
// More similar to React Context

import { proxy } from "valtio";

const state = proxy({
    intro: true, // Are we currently on the Home-Page or not
    color: "EFBD48",
    isLogoTexture: true,  // are we currently displaying the logo on shirt or not
    isFullTexture: false,   // inital texture on shirt set to false
    logoDecal: './threejs.png',  // initial logo to show to user
    fullDecal: './threejs.png'

});

// Done with the State


export default state;