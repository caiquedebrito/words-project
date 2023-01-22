import { Button, Flex, Heading, Stack, Text, Box, Link } from "@chakra-ui/react"
import { Input } from "../../components/Form/Input"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, SubmitHandler } from "react-hook-form"
import { useUser } from "../../contexts/AuthContext"
import Head from "next/head"

const loginUserSchema = yup.object().shape({
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha é obrigatória")
})

type LoginUserDataForm = {
  email: string
  password: string
}

export default function login() {
  const { login } = useUser()

  const { register, handleSubmit, formState: {isSubmitting, errors} } = useForm<LoginUserDataForm>({
    resolver: yupResolver(loginUserSchema)
  })

  const onSubmit: SubmitHandler<LoginUserDataForm> = async (values) => {
    const data = {
      email: values.email,
      password: values.password
    }
    await login(data)
  }

  return (
    <>
      <Head>
        <title>Words Project | Login</title>
      </Head>
      <Flex direction="column" justifyContent="center" align="center" w="100%" h="100vh">
      <Box px="4" maxWidth="360px" w="100%">
        <Heading as="h1" mb="8" textAlign="center">Faça login 😉</Heading>
        <Stack spacing="2" as="form" w="100%" onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("email")} type="email" placeholder="Email" error={errors.email}/>
          <Input {...register("password")} type="password" placeholder="Senha" error={errors.password}/>
          <Button cursor="pointer" colorScheme="black" bg="black" type="submit" isLoading={isSubmitting}>Entrar</Button>
        </Stack>
        <Text display="block" mt="2" as="span" fontSize="smaller">Você não tem conta? <Link href="/account/create" color="blue">Criar conta.</Link></Text>
      </Box>
    </Flex>
    </>
  )
}
