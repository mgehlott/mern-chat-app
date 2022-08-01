import {
    FormControl, FormLabel, Input, VStack,
    InputGroup,InputRightElement,Button
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [show,setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    
  
    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }
  
    const showChangeHandler = () => {
        setShow(pre => !pre);
    }
    
    const submitHandler = async () => {
        setIsLoading(true);
        if ( !password || !email ) {
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

        try {
            const config = {
                headers: {
                    "Content-type":"application/json",
                },
            }  

            const { data } = await axios.post(
                'http://localhost:5000/api/auth/login',
                { email, password },
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
      
          <FormControl id='lemail' isRequired >
              <FormLabel>Email</FormLabel>
              <Input placeholder='Enter Your Email'
                  value={email}
                  onChange={emailChangeHandler}
              />
          </FormControl>
          <FormControl id='lpassword' isRequired >
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
         
         
          <Button
              width='100%'
               colorScheme='blue'
              style={ { marginTop: 15 } }
              onClick={ submitHandler }
              isLoading={isLoading}
          >
              Sign Up
          </Button>
          <Button
              width='100%'
              colorScheme='red'
              variant='solid'
              style={ { marginTop: 15 } }
              onClick={ () => {
                  setEmail('guest@gmail.com');
                  setPassword('123456');
              } }
              
          >
              Get Guest User Credentials
          </Button>
    </VStack>
  )
}

export default Login;
