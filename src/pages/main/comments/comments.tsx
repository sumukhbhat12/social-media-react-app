import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../config/firebase";
import { Props } from "../post";
import { Comment } from './comment';

export interface CurrentPostComments {
    commentId: string,
    userId: string,
    body: string,
    username: string | null | undefined,
}

export const Comments = (props: Props) => {
    const [ user ] = useAuthState(auth);
    const { post } = props;
    const [ commentValue, setCommentValue ] = useState('');
    const [ currentPostComments, setCurrentPostComments ] = useState<CurrentPostComments[] | null>(null);

    const commentsRef = collection(db, 'comments');

    const addComment = () => {
        try{
            addDoc(commentsRef, {
                postId : post.id,
                userId : user?.uid,
                body: commentValue,
                username: user?.displayName,
            }).then((doc) => {
                if(user)
                setCurrentPostComments((prev) => prev? [...prev, {commentId : doc.id,
                    userId : user?.uid,
                    body: commentValue,
                username: user?.displayName}] : [ {commentId : doc.id,
                    userId : user?.uid,
                    body: commentValue,
                username: user?.displayName}]);
            })

            
        }
        catch(err){
            console.log(err);
        }
        
    }

    const currentPostCommentsRef = query(commentsRef, where('postId','==',post.id))

    const getComments = async () => {
        try{
            const data = await getDocs(currentPostCommentsRef);
            setCurrentPostComments(data.docs.map((doc) => ({ commentId:doc.id ,userId: doc.data().userId, body:doc.data().body, username:doc.data().username })));
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getComments();
    },[]);

    return(
        <div>
        <Card.Header className="ms-3 h4">{currentPostComments?.length} Comments</Card.Header>
        <Card.Footer className="d-flex">
            <textarea onChange={ (event) => setCommentValue(event.target.value) } className="flex-fill" placeholder="write your thoughts..." />
            <button onClick={ () => { addComment(); } } className="ms-3 rounded-9 border-1">Comment</button>
            <br />
        </Card.Footer>
        <>{
                currentPostComments &&
                currentPostComments.map((comment:CurrentPostComments) => {
                    return <Comment key={comment.commentId} comment={comment}/>
                })
            }</>
        </div>
    )
}