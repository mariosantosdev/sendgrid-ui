import { ModalConfigApp } from '@/components/ModalConfigApp'
import { useDisclosure } from '@chakra-ui/react'
import React, { ReactNode, createContext, useContext, useState } from 'react'

export interface ConfigApp {
  apiKey: string
  handleChangeApiKey: (key: string) => void
  handleOpenConfigs: () => void
  handleCloseConfigs: () => void
  configModalIsOpen: boolean
}

interface ConfigAppProps {
  children: ReactNode
}

export const ConfigAppContext = createContext({} as ConfigApp)

export const ConfigAppProvider: React.FC<ConfigAppProps> = ({ children }) => {
  const [apiKey, setApiKey] = useState('')
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleChangeApiKey = (key: string) => setApiKey(key)

  return (
    <ConfigAppContext.Provider
      value={{
        handleOpenConfigs: onOpen,
        handleCloseConfigs: onClose,
        handleChangeApiKey,
        configModalIsOpen: isOpen,
        apiKey,
      }}
    >
      <ModalConfigApp
        isOpen={isOpen}
        onClose={onClose}
        apiKey={apiKey}
        handleChangeApiKey={handleChangeApiKey}
      />
      {children}
    </ConfigAppContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigAppContext)
