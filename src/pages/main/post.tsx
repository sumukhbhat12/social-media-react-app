import { Posts } from "./main";
import Card from 'react-bootstrap/Card';
import moment from "moment";

interface Props {
    post: Posts
}

export const Post = (props: Props) => {
    const { post } = props;
    return(
        <Card className="m-5">
            <Card.Header>@{post.username}</Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
            </Card.Body>
            <Card.Footer>{ moment(post.date,'YYYYMMDD hh:mm a').fromNow() }</Card.Footer>
            
        </Card>
    )
}