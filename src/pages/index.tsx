import { Badge, Box, Card, CardBody, CardHeader, Heading, SimpleGrid, Icon, HStack, Link } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Header } from "../components/Header";
import { useWordList } from "../contexts/WordListContext";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { authAdmin } from "../services/firebaseAdmin";
import nookies from "nookies"
import Head from "next/head";

interface HomeProps {
  user: {
    uid: string,
    email: string
  }
}

export default function Home({ user }: HomeProps) {
  const { wordList } = useWordList()
  
  return (
    <>
      <Head>
        <title>Words Project</title>
      </Head>
      <Box w="100vw">
      <Header />
      <SimpleGrid px="4" minChildWidth={300}>
        {
          wordList.map(word => (
            <Card maxW={300} key={word.name}>
              <CardHeader display="flex" justifyContent="space-between">
                <Heading size="md">{word.name}</Heading>
                <HStack fontSize="lg">
                  <Link as="button" aria-label="Editar">
                    <Icon as={AiOutlineEdit} />
                  </Link>
                  <Link as="button" aria-label="Deletar">
                    <Icon as={AiOutlineDelete}/>
                  </Link>
                </HStack>
              </CardHeader>
              <CardBody>
                <Box>
                  Categoria: {word.category ? <Badge colorScheme="yellow">{word.category}</Badge> : ""}
                </Box>
                <Box>
                  Significado: {word.meaning}
                </Box>
                <Box>
                  Exemplo: {word.example}
                </Box>
              </CardBody>
            </Card>
          ))
        }
      </SimpleGrid>
    </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { "words.token": token } = nookies.get(ctx)

    const { uid, email } = await authAdmin.verifyIdToken(token)
    
    return {
      props: {
        user: { uid, email }
      }
    }
    
  } catch {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false
      }
    }
  }
}