import { Icon, Link } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { useWordList } from "../../contexts/WordListContext";

interface WordCardProps {
  word: {
    id?: string
    name?: string
    meaning?: string
    category?: string
    example?: string
  }
}

export function DeleteButton({ word }: WordCardProps ) {
  const { deleteWord } = useWordList()

  const handleOnClick = () => {
    deleteWord(word)
  }

  return (
    <Link 
      as="button" 
      aria-label="Deletar" 
      onClick={handleOnClick}
    >
      <Icon as={AiOutlineDelete}/>
    </Link>
  )
}