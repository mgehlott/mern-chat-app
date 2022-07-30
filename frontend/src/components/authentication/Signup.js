import {
    FormControl, FormLabel, Input, VStack,
    InputGroup,InputRightElement,Button
} from '@chakra-ui/react'
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Signup() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [show,setShow] = useState();
    const [pic,setPic] = useState("");
    const [confirmPassword,setCPass] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    
    const nameChangeHandler = (e) => {
        setName(e.target.value);
    }
    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }
    const cpasswordChangeHandler = (e) => {
        setCPass(e.target.value);
    }
    const showChangeHandler = () => {
        setShow(pre => !pre);
    }
    const postDetails = (pic) => {
        setIsLoading(true);
        if (pic === undefined) {
            toast({
                title: 'Please Select Image',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }
        if (pic.type === 'image/jpeg'|| pic.type==='image/jpg' || pic.type === 'image/png') {
            const formData = new FormData();
            formData.append('file', pic);
            formData.append('upload_preset', 'chat-app');
            formData.append('cloud_name', 'dzjvvqots');

            fetch(' https://api.cloudinary/com/v1_1/dzjvvqots/image/upload',
                {
                    method: 'post',
                    body:formData
             } 
            ).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setPic(data.url.toString());
                    setIsLoading(false)
            })
        } else {
            toast({
                title: 'Please Select a Image.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setIsLoading(false);
            return;
        }
    }
    const submitHandler = async () => {
        setIsLoading(true);
        if (!name || !password || !email || !confirmPassword) {
            toast({
                title: 'Please Fill All Fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setIsLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: 'Password does not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setIsLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type":"application/json",
                },
            }  

            const { data } = await axios.post(
                'http://localhost:5000/api/auth/signup',
                { name, email, password, pic },
                config
            );  
            
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast({
                title: 'Registration Successfull',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setIsLoading(false);
            navigate('/chat');
        } catch (error) {
            toast({
                title: 'Error Occured',
                description:error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setIsLoading(false);
        }
    }

  return (
    <VStack spacing='5px'>
        <FormControl id='name' isRequired >
              <FormLabel>Name</FormLabel>
              <Input placeholder='Enter Your Name'
                  value={name}
                  onChange={nameChangeHandler}
              />
          </FormControl>
          <FormControl id='email' isRequired >
              <FormLabel>Email</FormLabel>
              <Input placeholder='Enter Your Email'
                  value={email}
                  onChange={emailChangeHandler}
              />
          </FormControl>
          <FormControl id='password' isRequired >
              <FormLabel>Password</FormLabel>
              <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                      placeholder='Enter password'
                      value={password}
                      onChange={passwordChangeHandler}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={showChangeHandler}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
              </InputGroup>
          </FormControl>
          <FormControl id='cpassword' isRequired >
              <FormLabel> Confirm Password</FormLabel>
              <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                      placeholder='Confirm password'
                      value={confirmPassword}
                      onChange={cpasswordChangeHandler}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={showChangeHandler}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
              </InputGroup>
          </FormControl>
          <FormControl id='pic'>
              <FormLabel>Upload Your Profile Picture</FormLabel>
              <Input
                  type='file'
                  p={ 1.5 }
                  accept='image/*'
                  onChange={(e)=>postDetails(e.target.files[0])}
              />
          </FormControl>
          <Button
              width='100%'
               colorScheme='blue'
              style={ { marginTop: 15 } }
              onClick={ submitHandler }
              isLoading={isLoading}
          >
              Sign Up
          </Button>
    </VStack>
  )
}

export default Signup;
