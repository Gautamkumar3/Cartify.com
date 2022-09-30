
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchItem = ({ title, image, id }) => {
    return (
        <Link to={`/shoppingcart/${id}`}>
            <Flex gap={15} marginTop={5} alignItems="center">
                <Image width="50px" h="50px" src={image} alt={title} />
                <Text >{title}</Text>
            </Flex>
        </Link>
    )
}

export default SearchItem
