import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/utils/theme'
import { ConfigAppProvider } from '@/contexts/ConfigAppContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ConfigAppProvider>
        <Component {...pageProps} />
      </ConfigAppProvider>
    </ChakraProvider>
  )
}
