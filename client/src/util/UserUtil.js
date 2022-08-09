export const isLoggedIn = ()=>{
  return localStorage.getItem('social-profile-token') ? true : false
};

export const getToken=()=>{
  return localStorage.getItem('social-profile-token');
};