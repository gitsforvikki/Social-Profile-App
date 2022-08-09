import React from 'react';
import spinner from '../../../assets/img/spinner.gif';

let Spinner = ()=>{
    return(
        <React.Fragment>
           <div>
               <img src={spinner} alt="" className="d-block m-auto"/>
           </div>
        </React.Fragment>
    )
}
export default Spinner;