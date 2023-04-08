import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { useState } from 'react'

interface ModalConfigAppProps {
  isOpen: boolean
  onClose: () => void
  apiKey: string
  handleChangeApiKey: (key: string) => void
}

export const ModalConfigApp: React.FC<ModalConfigAppProps> = ({
  isOpen,
  onClose,
  apiKey,
  handleChangeApiKey,
}) => {
  const [key, setKey] = useState(apiKey)

  const handleSaveConfigs = () => {
    handleChangeApiKey(key)
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.900">
        <ModalHeader>Configurações</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Chave da API do SendGrid</FormLabel>
            <Input
              placeholder="Digite sua chave de API do Sendgrid"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <Divider mt={2} />
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSaveConfigs}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
