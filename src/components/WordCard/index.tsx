import { Card, CardHeader, Heading, HStack, CardBody, Badge, Box } from "@chakra-ui/react"
import { DeleteButton } from "./DeleteButton"
import { EditButton } from "./EditButton"

interface WordCardProps {
  word: {
    id?: string
    name?: string
    meaning?: string
    category?: string
    example?: string
  }
}

export function WordCard({ word }: WordCardProps) {

  return (
    <Card maxW={300}>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading size="md">{word?.name}</Heading>
        <HStack fontSize="lg">
          <EditButton word={word}/>
          <DeleteButton word={word}/>
        </HStack>
      </CardHeader>
      <CardBody>
        <Box>
          Categoria: {word?.category ? <Badge colorScheme="yellow">{word?.category}</Badge> : ""}
        </Box>
        <Box>
          Significado: {word?.meaning}
        </Box>
        <Box>
          Exemplo: {word?.example}
        </Box>
      </CardBody>
    </Card>
  )
}