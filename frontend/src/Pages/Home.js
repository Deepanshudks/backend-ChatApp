import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'

const Home = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"#343a40"}
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        w="100%"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="white">ChatHike</Text>
      </Box>
      <Box bg="#343a40" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
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
