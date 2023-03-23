import { Container } from "react-bootstrap"
import { CreateForm } from "./createform"

export const CreatePost = () => {
    return(
        <Container >
            <div >
                <h3 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" id='createpost'>Create Post</h3>
                <CreateForm />
            </div>
        </Container>
    )
}