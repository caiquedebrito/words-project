import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface WordListProviderProps {
  children: ReactNode
}

type WordListData = {
  wordList: Word[]
  setWordList: Dispatch<SetStateAction<Word[]>>
}

type Word = {
  name?: string
  meaning?: string
  category?: string
  example?: string
}

const WordListContext = createContext({} as WordListData)

export function WordListProvider({ children }: WordListProviderProps) {
  const [wordList, setWordList] = useState<Word[]>([])

  return (
    <WordListContext.Provider value={{ wordList, setWordList }}>
      {children}
    </WordListContext.Provider>
  )
}

export const useWordList = () => useContext(WordListContext)