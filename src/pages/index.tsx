import { Box, SimpleGrid } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Header } from "../components/Header";
import { useWordList } from "../contexts/WordListContext";
import nookies from "nookies"
import Head from "next/head";
import { WordCard } from "../components/WordCard";
import { EditWordModal } from "../components/WordCard/EditWordModal";
import { admin } from "../services/firebaseAdmin";

interface HomeProps {
  user: {
    uid: string,
    email: string
  }
}

export default function Home() {
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
              <WordCard key={word?.id} word={word}/> 
            ))
          }
        </SimpleGrid>
      </Box>
      <EditWordModal />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { "words.token": token } = nookies.get(ctx)

    if (process.env.NODE_ENV !== "production") {
      return {
        props: {

        }
      }
    }

    const { uid, email } = await admin.auth().verifyIdToken(token)
    
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