import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, VStack } from '@chakra-ui/react'
import React, { FormEvent, useEffect, useState } from 'react'
import { useEditWordModal } from '../../contexts/EditWordContext'
import { useWordList } from '../../contexts/WordListContext'

export function EditWordModal() {
  const { onClose, isOpen, editWord } = useEditWordModal()
  const { updateWord } = useWordList()

  const [name, setName] = useState("")
  const [meaning, setMeaning] = useState("")
  const [category, setCategory] = useState("")
  const [example, setExample] = useState("")

  useEffect(() => {
    setName(editWord.name!)
    setMeaning(editWord.meaning!)
    setCategory(editWord.category!)
    setExample(editWord.example!)
  
  }, [editWord])

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const editedWord = {
      id: editWord.id,
      name,
      meaning,
      category,
      example
    }

    await updateWord(editedWord)

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding="5">
        <ModalHeader>Editar palavra</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="4" as="form" onSubmit={handleOnSubmit}>
            <Input required placeholder="Palavra" value={name || ""} onChange={e => setName(e.target.value)}/>
            <Input required placeholder="Significado" value={meaning || ""} onChange={e => setMeaning(e.target.value)}/>
            <Select required placeholder="Categoria" value={category || ""} onChange={e => setCategory(e.target.value)}>
              <option value="outra">Outra</option>
              <option value="verbo">Verbo</option>
              <option value="adjetivo">Adjetivo</option>
              <option value="substantivo">Substantivo</option>
              <option value="adverbio">Advérbio</option>
            </Select>
            <Input placeholder="Exemplo" as="textarea" max={100} h={100} maxH={100} onChange={e => setExample(e.target.value)} value={example || ""}/>
            <Button type="submit" w="100%" bg="black" color="white">Adicionar</Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
