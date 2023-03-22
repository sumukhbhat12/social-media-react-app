import Container from "react-bootstrap/esm/Container";
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import { Post } from "./post";
import { Col, Row } from "react-bootstrap";

export interface Posts {
    id: string,
    userId: string,
    title: string,
    username: string,
    description: string,
    date: string,
    image: string,
}

export const Main = () => {

    const postRef = collection(db, "posts");
    const[ postsList, setPostsList ] = useState<Posts[] | null>(null);

    const getPosts = async () => {
        const data = await getDocs(postRef);
        setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Posts[]);
        
    }

    useEffect(() => {
        getPosts();
    },[]);

    
    return(
            <Container className="">
                <Row>
                    <Col></Col>
                    <Col xs={10}>
                <h1 className="text-center mt-3" id="mainpagetext">Main Page</h1>
                <>{
                    postsList?.map((post:Posts) => {
                        return <Post key={post.id} post={post} />
                    })
                }</>
                </Col>
                <Col></Col>
                </Row>
            </Container>
    )
}