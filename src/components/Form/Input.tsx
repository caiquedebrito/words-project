import { FormControl, FormErrorMessage, Input as ChakraInput, InputProps } from "@chakra-ui/react"
import { ForwardRefRenderFunction, forwardRef } from "react"
import { FieldError } from "react-hook-form"

interface IInputProps extends InputProps{
  name: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = ({ name, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error} h={70}>
      <ChakraInput {...rest} ref={ref} id={name} name={name} colorScheme="gray" _focus={{ borderColor: "gray.200", outline: "gray.200"}}/>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)