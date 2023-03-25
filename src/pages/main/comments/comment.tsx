import { Card } from "react-bootstrap";
import { CurrentPostComments } from "./comments";

interface DisplayComment {
    comment: CurrentPostComments,
}

export const Comment = (props: DisplayComment) => {
    const { comment } = props;
    return(
        <>
        <Card.Footer style={{fontWeight:'bold'}}>
            @{ comment.username }
        </Card.Footer>
        <Card.Text className="ms-4 mb-2">{ comment.body }</Card.Text>
        </>
    )
}