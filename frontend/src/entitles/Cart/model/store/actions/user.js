import { LOGIN_USER, LOGOUT_USER } from '../types';

const loginUser = (user) => ({
   type: LOGIN_USER,
   payload: user
});

const logoutUser = () => ({
   type: LOGOUT_USER
});

export default { loginUser, logoutUser };
