import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTextArea } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

interface CreateFormData {
    title: string,
    description: string,
}

export const CreateForm = () => {


    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required('Enter a Title!'),
        description: yup.string().required('Enter a Description!'),
    });

    const { register,handleSubmit, formState:{ errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    //Reference to posts collection in firestore database
    const postRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postRef, {
            // title: data.title,
            // description: data.description,
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        });
        navigate('/main');
    }
    return(
        <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                        <p className="text-center h4 fw-bold mb-3 mx-1 mx-md-4 mt-4">New Post</p>
                            <form onSubmit={handleSubmit(onCreatePost)}>
                                <div className='d-flex flex-row align-items-center mb-4'>
                                    <MDBIcon fas icon="pencil-alt" className='m-3' size='lg' />
                                    <input placeholder='Title' {...register('title')} className='w-100 border-2 rounded-2'/>
                                </div>
                                <p style={{color:'red'}} className='ms-3'>{errors.title?.message}</p>
                                <div className='d-flex flex-row align-items-center mb-4'>
                                    <MDBIcon far icon="comment" className='m-3' size='lg'/>
                                    <textarea placeholder='Description' {...register('description')} className='w-100 border-2 rounded-2'/>
                                </div>
                                <p style={{color:'red'}} className='ms-3' >{errors.description?.message}</p>
                                <input type='submit'className='rounded-9'/>
                            </form>
                        </MDBCol>
                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    )
}