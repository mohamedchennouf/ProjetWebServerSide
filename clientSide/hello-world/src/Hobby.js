
 import React, { Component } from 'react';

 function Hobby(h) {

    const liStyle = {
        color: (h.indice %2) ? 'green' : 'purple'
    }
   
     return (  
       <li onClick={() => h.removeHobby(h.name)} className="list-group-item">{h.name}</li>
     );

   }
 
   export default Hobby;