import { Box, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <>
      <Box w="100%">
        <Image w="100%" maxH="500px" src="https://cdn.dribbble.com/users/1138875/screenshots/4669703/404_animation.gif" alt="error" />
      </Box >
      <Box margin="auto" w="20%">
        <Link to="/"><Heading color="blue">Go to Home</Heading></Link>
      </Box>

    </>
  )
}

export default Error404
