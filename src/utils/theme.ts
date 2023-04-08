import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.800',
        color: 'gray.100',
      },
      '::placeholder': {
        color: 'gray.500',
      },
    },
  },
})
