import {
    Box, Button, Flex, Image, Text, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Heading,
} from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'

const Cart = () => {

    const { handleAddQty, handleDecreaseQty, handleDelete, cartData } = useContext(AuthContext)

    const total = cartData.reduce((acc, el) => acc + el.price * el.qty, 0)

    return (

        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <Thead>
                    <Tr>
                        <Th>Image</Th>
                        <Th>Product Name</Th>
                        <Th>Price</Th>
                        <Th> Qty</Th>
                        <Th> Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {cartData.map((el) => (<Tr key={el.id}>
                        <Td><Image width="50px" src={el.avatar || el.image} /></Td>
                        <Td>{el.title}</Td>
                        <Td>$ {el.price}</Td>
                        <Td>
                            <Button background="green" onClick={() => handleAddQty(el.id)}><Heading color="white" marginTop="-5px">+</Heading></Button>
                            <Button>{el.qty}</Button>
                            <Button disabled={el.qty === 1} background="green" onClick={() => handleDecreaseQty(el.id)}><Heading color="white" marginTop="-5px">-</Heading></Button>
                        </Td>
                        <Td><Button background="red" color="white" onClick={(() => handleDelete(el.id))}>Delete</Button></Td>
                    </Tr>))}
                </Tbody>
                <Tfoot background="teal" >
                    <Tr>
                        <Th></Th>
                        <Th></Th>
                        <Th><Text fontSize='xl' color="white">Total $ {total.toFixed(2)}</Text></Th>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default Cart
