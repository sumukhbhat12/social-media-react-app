import { Card, Col, Container, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import placeholder from '../resources/testimage.png';

export const Profile = () => {
    const [user] = useAuthState(auth);
    return(
        <Container style={{height:'100vh'}}>
            <Row>
                <Col></Col>
                <Col>
                    <h3 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4" id='profile'>Profile</h3>
                    <Card className="mt-5">
                        <Card.Header>Username : {user?.displayName}</Card.Header>
                        <Card.Body className="">
                            <Card.Img className='rounded' style={{height:'100%', width:'100%'}} src={user?.photoURL? user.photoURL : placeholder} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
                    </Row>
        </Container>
    )
}