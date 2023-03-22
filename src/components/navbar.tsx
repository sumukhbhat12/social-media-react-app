import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { signOut } from 'firebase/auth';

export const Navibar = () => {

    const [ user ] = useAuthState(auth);
    const navigate = useNavigate();
    const signUserOut = async () => {
        await signOut(auth);
        navigate('/');
    }

    return(
        
        <Navbar bg='light' expand='lg'>
            <Container>
                    <Nav>
                        {
                        user &&
                        <Nav.Link href='/main'>Main</Nav.Link>
                        }
                        {
                        user &&
                        <Nav.Link href='/createpost'>Create Post</Nav.Link>
                        }
                        {
                        !user &&
                        <Nav.Link href='/login'>Login</Nav.Link>
                        }
                    </Nav>
                    {user &&
                    <div className='d-flex mt-3'>
                        <p style={{marginRight:'10px', fontSize:'17px'}}> {user?.displayName} </p>
                        <img src={ user?.photoURL || ''} width='30' height='30' className='rounded-circle' />
                        <button className='rounded-9 border-1' style={{width:'70px', height:'30px', marginLeft:'10px'}} onClick={signUserOut}>Signout</button>
                    </div>
                    }
            </Container>
        </Navbar>
    )
}