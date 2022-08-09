import React from 'react';
import { Link } from 'react-router-dom';

let Home = ()=>{
    return(
        <React.Fragment>
            <div className="landing-page">
                <div className="wrapper">
                    <div className="  d-flex flex-column justify-content-center align-item-center text-center h-100">
                        <p className="display-4">Social Profile App</p>
                        <p className="lead">Do you want to make sure you're using the best social media apps? After all, there are now so many social networks vying for your attention, it can be difficult choosing between them all.</p>
                        <p className="lead">With more than 2.7 billion users, it's the place to go if you want to easily connect with most of the people from your current or former life.</p>
                        <div className="animated jello">
                            <Link to='/users/register' className=" btn btn-light btn-sm">Register</Link>
                            <Link to='/users/login' className="btn btn-teal btn-sm">Login</Link>
                        </div>
                     </div>
                     
                </div>
            </div>
            
        </React.Fragment>
    )
}
export default Home;