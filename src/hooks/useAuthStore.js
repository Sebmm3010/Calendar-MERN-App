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
            dispatch( onLogin({name: data.name, uid: data.uid}) );

        } catch (err) {
            dispatch(onLogout('Las credenciales con incorrectas'));

            setTimeout(() => {
                dispatch(clearError());
            }, 10);
        }

    }


    return {
        // Propiedades
        status,
        user,
        errorMessage,


        // Metodos
        startLogin
    }
}
