import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { storage } from '../../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { ContainerProps } from 'react-bootstrap';

interface CreateFormData {
    title: string,
    description: string,
}

export const CreateForm = () => {

    const schema = yup.object().shape({
        title: yup.string().required('Enter a Title!'),
        description: yup.string().required('Enter a Description!'),
    });


    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [ imageUpload, setImageUpload ] = useState<File | null>(null);
    const { register,handleSubmit, formState:{ errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });


    //Reference to posts collection in firestore database
    const postRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {

        const imageName = imageUpload? `posts/${imageUpload.name + v4()}` : null;
        //upload the image to the firebase on submitting the form
        if(imageUpload != null){
            const imageRef = ref(storage, imageName! ); //imageName will never be null here
                uploadBytes(imageRef, imageUpload).then(() => {
                alert('Image Uploaded!');
            });
        }

        await addDoc(postRef, {
            // title: data.title,
            // description: data.description,
            ...data,
            username: user?.displayName,
            userId: user?.uid,
            date: moment().format('YYYYMMDD') + ' ' +moment().format('hh:mm a'),
            image: imageName,
        });
        navigate('/main');
    }

    return(
        <MDBContainer style={{height:'100vh', width:'100vw'}} className='justify-content-center align-items-center'>
            <MDBRow>
            <MDBCol></MDBCol>
            <MDBCol lg={10} md={10} sm={8} xs={4}>
            <MDBCard className='text-black' style={{borderRadius: '25px'}}>
                <MDBCardBody>
                <p className="text-center h4 fw-bold mb-3 mx-1 mx-md-4 mt-4">New Post</p>
                    <MDBRow className='justify-content-center'>
                        <MDBCol md='10' lg='6' className='order-2 order-md-2 order-lg-1'>
                        
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
                                <div className='justify-content-center mb-4 '>
                                    <input type='file' onChange={(event) => { if(event.target.files) setImageUpload(event.target.files[0])} }/>
                                </div>
                                <div className='text-center'>
                                <input type='submit'className='rounded-9 border-1'/>
                                </div>
                            </form>
                        </MDBCol>
                        <MDBCol md='10' lg='6' className='order-1 order-md-1 order-lg-2'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol></MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}