import { Icon, Link } from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { useEditWordModal } from "../../contexts/EditWordContext"

interface WordCardProps {
  word: {
    id?: string
    name?: string
    meaning?: string
    category?: string
    example?: string
  }
}

export function EditButton({ word }: WordCardProps) {
  const { onOpen, setEditWord } = useEditWordModal()

  const handleOnClick = () => {
    onOpen()
    setEditWord(word)
  }

  return (
    <Link 
      as="button" 
      aria-label="Editar" 
      onClick={handleOnClick}
    >
      <Icon as={AiOutlineEdit} />
    </Link>
  )
}