import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import logo from '../resources/logo.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

export const Login = () => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth,provider);
        console.log(result);
        navigate('/main');
    }

    const alreadyLoggedIn = () => {
        if(user !== null){
            navigate('/main');
        }
    }

    useEffect(()=>{
        alreadyLoggedIn();
    })

    return(
        <Container style={{height:'100vh'}}>
            <Row>
                <Col></Col>
                <Col className='text-center' xs={6}>
                    <Card className='mt-5 justify-content-center' style={{height:'70vh'}}>
                        <Row>
                        <Card.Title className='fs-1 mt-3'>Login Page</Card.Title>
                        <Col></Col>
                        <Col>
                        <Card.Img src={logo} style={{width:'30vh', height:'30vh'}} />
                        </Col>
                        <Col></Col>
                        </Row>
                        
                        <Row>
                        <Card.Text className='fs-5 mt-5'>Sign in with Google</Card.Text>
                        </Row>
                        <Row>
                            <Col></Col>
                        <Col>
                        <Button variant='info' onClick={signInWithGoogle} className='rounded-7 border-1 mt-2' >Sign in</Button>
                        </Col>
                        <Col></Col>
                        </Row>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}