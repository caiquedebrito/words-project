import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { NewWordModalContextProvider } from '../contexts/NewWordModal'
import { WordListProvider } from '../contexts/WordListContext'
import { AuthProvider } from '../contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <WordListProvider>
        <NewWordModalContextProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </NewWordModalContextProvider>
      </WordListProvider>
    </AuthProvider>

  )
}
