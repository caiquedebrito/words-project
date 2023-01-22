import { Flex, Heading, Stack, Button, Box, Text, Link } from '@chakra-ui/react'
import { Input } from "../../components/Form/Input"
import React from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useUser } from '../../contexts/AuthContext'
import Head from 'next/head'

type CreateUserDataForm = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createUserSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha é obrigatória").min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup.string().oneOf([null, yup.ref("password")], "As senhas precisam ser iguais")
})

export default function Create() {
  const { createNewUser } = useUser()
  const { register, handleSubmit, formState: {isSubmitting, errors} } = useForm<CreateUserDataForm>({
    resolver: yupResolver(createUserSchema)
  })

  const onSubmit: SubmitHandler<CreateUserDataForm> = async (values) => {
    const data = {
      email: values.email,
      password: values.password
    }
    await createNewUser(data)
  }

  return (
    <>
      <Head>
        <title>Words Project | Criar conta</title>
      </Head>
      <Flex direction="column" justifyContent="center" align="center" w="100%" h="100vh">
      <Box maxWidth="360px" w="100%" px="4">
        <Heading as="h1" mb="8" textAlign="center">Crie sua conta</Heading>
        <Stack as="form" w="100%" onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" placeholder="Nome" {...register("name")} error={errors.name}/>
          <Input type="email" placeholder="Email" {...register("email")} error={errors.email}/>
          <Input type="password" placeholder="Senha" {...register("password")} error={errors.password}/>
          <Input type="password" placeholder="Confimar senha" {...register("password_confirmation")} error={errors.password_confirmation}/>
          <Button cursor="pointer" colorScheme="black" bg="black" type="submit" isLoading={isSubmitting}>Criar</Button>
        </Stack>
        <Text display="block" mt="2" as="span" fontSize="smaller">Já tem conta? <Link href="/account/login" color="blue">Faça login.</Link></Text>
      </Box>
    </Flex>
    </>
  )
}
