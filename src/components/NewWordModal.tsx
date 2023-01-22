import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, VStack } from '@chakra-ui/react'
import React, { FormEvent, useRef, useState } from 'react'
import { useNewWordModal } from '../contexts/NewWordModal'
import { useWordList } from '../contexts/WordListContext'

export function NewWordModal() {
  const { isOpen, onClose } = useNewWordModal()
  const { wordList, setWordList } = useWordList()

  const nameRef = useRef<HTMLInputElement>(null)
  const meaningRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)
  const [example, setExample] = useState("")


  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()

    setWordList([
      {
        name: nameRef.current?.value,
        meaning: meaningRef.current?.value,
        category: categoryRef.current?.value,
        example
      },
      ...wordList
    ])

    setExample("")

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding="5">
        <ModalHeader>Adicionar nova palavra</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="4" as="form" onSubmit={handleOnSubmit}>
            <Input required ref={nameRef} placeholder="Palavra"/>
            <Input required placeholder="Significado" ref={meaningRef}/>
            <Select required placeholder="Categoria" ref={categoryRef}>
              <option value="outra">Outra</option>
              <option value="verbo">Verbo</option>
              <option value="adjetivo">Adjetivo</option>
              <option value="substantivo">Substantivo</option>
              <option value="adverbio">Advérbio</option>
            </Select>
            <Input placeholder="Exemplo" as="textarea" max={100} h={100} maxH={100} value={example} onChange={e => setExample(e.target.value)}/>
            <Button type="submit" w="100%" bg="black" color="white">Adicionar</Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
