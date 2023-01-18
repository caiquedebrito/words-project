import { Flex, Input } from "@chakra-ui/react";

export function Search() {
  return (
    <Flex as="label" maxWidth={375} w="100%" ml="5">
      <Input placeholder="Pesquisar..."/>
    </Flex>
  )
}