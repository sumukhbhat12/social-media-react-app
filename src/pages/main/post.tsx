import { Posts } from "./main";
import Card from 'react-bootstrap/Card';
import moment from "moment";
import { addDoc, getDocs, deleteDoc , collection, query, where, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: Posts,
}

interface Likes {
    userId: string,
}

export const Post = (props: Props) => {
    const { post } = props;
    const [ user ] = useAuthState(auth);
    const [ likes , setLikes ] = useState<Likes[] | null>(null);

    const hasUserLiked = likes?.find((like) => {
        return like.userId == user?.uid;
    })

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where('postId','==',post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
    }

    const addLike = async () => {
        try{
            await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id,
            });
    
            if (user) {
                setLikes((prev) => prev ? [...prev, {userId: user?.uid}] : [{userId: user?.uid}]);
            }
        }
        catch (err){
            console.log(err);
        }
    }

    const removeLike = async () => {
        try{
            //Get the reference for the documents which represents the post which the current user has liked
            const likeToDeleteQuery = query(likesRef,where('postId','==',post.id),where('userId','==',user?.uid));

            //From the reference, get the actual documents
            const data = await getDocs(likeToDeleteQuery);

            //There could only be 1 document because a user can like a post only 1 times, hence only 1 document is created for the particular userId and postId
            //Use the document's id to get the document
            const likeToDelete = doc(db,'likes', data.docs[0].id);

            //Delete the actual document
            await deleteDoc(likeToDelete);

            //To auto update the ui when dislike button is pressed
            if (user) {
                setLikes((prev) => prev?.filter((like) => {
                    return like.userId != user.uid;
                }) as Likes[]);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getLikes();
    },[]);

    return(
        <Card className="m-5">
            <Card.Header>@{post.username} - { moment(post.date,'YYYYMMDD hh:mm a').fromNow() }</Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="d-inline-flex align-items-start">
                
                <button className="rounded-7 border-1 me-2" onClick={ hasUserLiked ? removeLike : addLike}> { hasUserLiked? <>&#128078;</> : <>&#128077;</> }</button>
                { likes?.length && <p> { likes?.length } Likes </p>}
                    
            </Card.Footer>
        </Card>
    )
}