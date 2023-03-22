import Container from "react-bootstrap/esm/Container";
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import { Post } from "./post";
import moment from "moment";

export interface Posts {
    id: string,
    userId: string,
    title: string,
    username: string,
    description: string,
    date: string,
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
        const sortedPostsList = postsList?.sort((a, b) => {
            return (moment(moment(a.date).format('YYYYMMDD hh:mm a')).unix() - moment(moment(b.date).format('YYYYMMDD hh:mm a')).unix());
        });
        postsList?.map((post) => console.log(moment(moment(post.date).format('YYYYMMDD hh:mm a')).unix()));
        //sortedPostsList?.map((post) => console.log(post));
        //setPostsList(postsList);
    },[]);

    
    return(
            <Container className="">
                <h1 className="text-center mt-3">Main Page</h1>
                <>{
                    postsList?.map((post:Posts) => {
                        return <Post key={post.id} post={post} />
                    })
                }</>
            </Container>
    )
}