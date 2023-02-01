import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { firestore } from "../services/firebaseClient";
import { useUser } from "./AuthContext";

interface WordListProviderProps {
  children: ReactNode
}

type WordListData = {
  wordList: Word[]
  setWordList: Dispatch<SetStateAction<Word[]>>
  setWord: Dispatch<SetStateAction<Word | undefined>>
  addWordList: () => Promise<void>
  updateWord: (word: Word) => Promise<void>
  deleteWord: (word: Word) => Promise<void>
}

type Word = {
  id?: string
  name?: string
  meaning?: string
  category?: string
  example?: string
}

export class WordData {
  id?: string
  name?: string
  meaning?: string
  category?: string
  example?: string

  constructor() {
    if (!this.id) {
      // this.id = 
    }
  }
}

const WordListContext = createContext({} as WordListData)

export function WordListProvider({ children }: WordListProviderProps) {
  const [wordList, setWordList] = useState<Word[]>([])
  const [word, setWord] = useState<Word>()
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      getWordList()
    }
  }, [user])

  useEffect(() => {
    if (word) {
      addWordList()
    }
  }, [word])


  async function addWordList() {
    if (!user) return 
    try {
      const docRef = doc(firestore, `${user.uid}/${word?.id}`)
      await setDoc(docRef, {...word});
    } catch(error) {
      alert("Algo de errado aconteceu! :(")
    }
  }

  async function getWordList() {
    try {
      const docSnap = await getDocs(collection(firestore, `${user?.uid}`))

      let wordListSnap: Word[] = []
      docSnap.forEach(data => {
        const wordData: Word = data.data()
        wordListSnap.push(wordData)
      })

      setWordList(wordListSnap)
    } catch (error) {
      alert("Algo de errado aconteceu! :(")
    }
  }

  async function updateWord(word: Word) {
    try {
      await updateDoc(doc(firestore, `${user?.uid}/${word.id}`), word)
      const wl = wordList.filter(w => w.id !== word.id)
      setWordList([...wl, word])
    } catch (error) {
      alert("Algo de errado aconteceu! :(")
    }
  }

  async function deleteWord(word: Word) {
    try {
      await deleteDoc(doc(firestore, `${user?.uid}/${word.id}`))
      const wl = wordList.filter(w => w.id !== word.id)
      setWordList(wl)
    } catch (error) {
      alert("Algo de errado aconteceu! :(")
    }
  }

  return (
    <WordListContext.Provider value={{ wordList, setWordList, addWordList, setWord, updateWord, deleteWord }}>
      {children}
    </WordListContext.Provider>
  )
}

export const useWordList = () => useContext(WordListContext)