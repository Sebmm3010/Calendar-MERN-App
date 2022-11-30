import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearError, onChecking, onLogin, onLogout } from "../store";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        // Cambiar estado a checking
        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-time', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (err) {
            dispatch(onLogout('Las credenciales son incorrectas'));

            setTimeout(() => {
                dispatch(clearError());
            }, 10);
        }
    }

    const startRegister = async ({ name, email, password }) => {

        // Cambiar estado a checking
        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-time', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            const { response } = error;
            dispatch(onLogout(response.data?.msg || 'Error!!'));
            setTimeout(() => {
                dispatch(clearError());
            }, 10);
        }


    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('/auth/renew', token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-time', new Date().getTime());
            localStorage.setItem('token', data.token);
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }


    return {
        // Propiedades
        status,
        user,
        errorMessage,


        // Metodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}
