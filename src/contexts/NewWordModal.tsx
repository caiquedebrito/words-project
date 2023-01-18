import { useDisclosure } from "@chakra-ui/react"
import { createContext, ReactNode, useContext } from "react"

type NewWordModalData = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

interface NewWordModalProviderProps {
  children: ReactNode
}

const NewWordModalContext = createContext({} as NewWordModalData)

export function NewWordModalContextProvider({ children }: NewWordModalProviderProps) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <NewWordModalContext.Provider value={{ isOpen, onClose, onOpen  }}>
      {children}
    </NewWordModalContext.Provider>
  )
}

export const useNewWordModal = ()  => useContext(NewWordModalContext)