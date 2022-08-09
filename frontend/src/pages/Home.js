import {
  Container, Box, Text,
  Tabs, TabList, TabPanel, TabPanels, Tab
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'

function Home() {

  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/chat');
    }
  }, [navigate]);

  return (
    <Container maxW='xl'>
      <Box
        d='flex'
        justifyContent='center'
        w='100%'
        shadow='drak-lg'
        bg='white'
        p="5px 10px"
        borderRadius="lg"
        borderWidth="1px"
        m="20px 0 15px 0"
      >
        <Text fontSize='3xl' textAlign='center' color='black'>
          ChatBiz
        </Text>
      </Box>
      <Box bg='white' w='100%'
        p={ 4 }
        borderRadius='lg' borderWidth='2px' >
        <Tabs variant='soft-rounded'>
          <TabList mb='1em'>
            <Tab width='50%'>Log In</Tab>
            <Tab width='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>

      </Box>

    </Container>
  )
}

export default Home


//