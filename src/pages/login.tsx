import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export const Login = () => {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth,provider);
        console.log(result);
        navigate('/main');
    }

    return(
        <div className='text-center'>
            <h1>Login Page</h1>
            
            <p>Sign in with Google</p>
            <button onClick={signInWithGoogle} className='rounded-pill border-1' style={{width:'75px', height:'40px'}}>Sign in</button>
            
        </div>
    )
}