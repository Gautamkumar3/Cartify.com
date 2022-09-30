
import { CircularProgress, Flex, Heading } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ProductCard from './Card'

const Women = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get("https://gk-general-api.herokuapp.com/women").then((res) => {
            setData(res.data)
            setLoading(false)
        })
    }, [])
    return (
        <div>
            {loading ? <CircularProgress size="200px" marginLeft="45%" isIndeterminate color='green.300' /> :
                <div>
                    <Heading margin={10}>Women</Heading>
                    <Flex flexWrap="wrap" gap="20px" justify="center">
                        {data.map((item) => (<ProductCard key={item.id} id={item.id} title={item.title} avatar={item.image} price={item.price} category={item.category} rating={item.rating.rate} />))}
                    </Flex>
                </div>
            }
        </div>
    )
}

export default Women
