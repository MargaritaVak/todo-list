import { HttpInterceptorFn } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token')
  if(token){
    let decodedToken = jwtDecode(token);
    const isExpired = 
    decodedToken && decodedToken.exp ? 
    decodedToken.exp < Date.now() / 1000
    : false;

    if(isExpired) {
      console.log('token expired');
    } else{
      console.log('token not expired')
    }
  }
  return next(req);
};
