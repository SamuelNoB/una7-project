import { 
  Flex,
  Text,
  UnorderedList, List,ListItem as p, } from "@chakra-ui/react"

import { extendTheme } from '@chakra-ui/react'
const theme = extendTheme({
  
})

export default function DefaultLayout({children}: any) {
  return (
    <div>
      <Flex
      as='nav'
      justify='space-between'
      >
        <div>
        </div>
        <Flex>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </Flex>
      </Flex>
      <main>{children}</main>
    </div>
  )
}