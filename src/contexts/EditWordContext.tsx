import { useDisclosure } from "@chakra-ui/react"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

type EditWordModalData = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  editWord: Word
  setEditWord: Dispatch<SetStateAction<Word>>
}

type Word = {
  id?: string
  name?: string
  meaning?: string
  category?: string
  example?: string
}

interface EditWordModalProviderProps {
  children: ReactNode
}

const EditWordModalContext = createContext({} as EditWordModalData)

export function EditWordModalProvider({ children }: EditWordModalProviderProps) {
  const [editWord, setEditWord] = useState<Word>({})
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <EditWordModalContext.Provider value={{ isOpen, onClose, onOpen, editWord, setEditWord }}>
      {children}
    </EditWordModalContext.Provider>
  )
}

export const useEditWordModal = () => useContext(EditWordModalContext)