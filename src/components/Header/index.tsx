import { Flex, Button, ButtonGroup, Box, Icon, Link } from "@chakra-ui/react";
import { Search } from "./Search";
import React from 'react'
import { useNewWordModal } from "../../contexts/NewWordModal";
import { NewWordModal } from "../NewWordModal";
import { TbLogout } from "react-icons/tb"
import { useUser } from "../../contexts/AuthContext";

export function Header() {
  const { logout } = useUser()
  const { onOpen } = useNewWordModal()
  
  return (
    <Flex as="header" justifyContent="center" alignContent="center" w="100%" maxWidth={800} p="6" direction="column"
    mx="auto">
      <Flex w="100%" justifyContent="center" align="center">
        <Button bg="black" color="white" colorScheme="blackAlpha" onClick={onOpen}>Nova palavra</Button>
        <Search />
        <Link as="button" ml="4" display="flex" alignContent="center" justifyContent="center" onClick={logout}>
          <Icon as={TbLogout} fontSize="3xl"/>
        </Link>
      </Flex>
      <Flex mt="8" w="100%" justifyContent="center">

        <ButtonGroup>
          <Button>Todos</Button>
          <Button>Verbos</Button>
          <Button>Adjetivos</Button>
          <Button>Substantivos</Button>
          <Button>Advérbios</Button>
          <Button>Outros</Button>
        </ButtonGroup>
      </Flex>
      <NewWordModal />
    </Flex>
  )
}


