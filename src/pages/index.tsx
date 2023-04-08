import Head from 'next/head'
import {
  Flex,
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  IconButton,
} from '@chakra-ui/react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { CloseIcon, SettingsIcon } from '@chakra-ui/icons'
import { api } from '@/utils/axios'
import { useConfig } from '@/contexts/ConfigAppContext'

const formSchema = z.object({
  //   sendgridApiKey: z.string().min(0, 'API Key é obrigatoria'),
  email: z.string().email('E-mail invalido'),
  remetentEmail: z.string().email('E-mail invalido'),
  templateID: z.string().min(0, 'TemplateID é obrigatoria'),
  body: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    }),
  ),
})

type FormSchema = z.infer<typeof formSchema>

export default function Home() {
  const toast = useToast()
  const { apiKey, handleOpenConfigs } = useConfig()
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'body',
  })

  const handleSendMail: SubmitHandler<FormSchema> = ({
    email,
    remetentEmail,
    body,
    // sendgridApiKey,
    templateID,
  }) => {
    api
      .post(
        '/api/send-mail',
        {
          from: email,
          to: remetentEmail,
          templateId: templateID,
          dynamicTemplateData: {
            ...body.reduce(
              (acc, { key, value }) => ({ ...acc, [key]: value }),
              {},
            ),
          },
        },
        {
          headers: { 'api-key': apiKey },
        },
      )
      .then(() =>
        toast({ description: 'E-mail enviado com sucesso', status: 'success' }),
      )
      .catch((apiErrors: string[]) => {
        apiErrors.splice(0, 3).forEach((error, index) => {
          toast({ description: error, status: 'error', id: `error-${index}` })
        })
      })
  }

  useEffect(() => {
    if (errors.email?.message)
      toast({ description: errors.email.message, status: 'error' })
    // if (errors.sendgridApiKey?.message)
    //   toast({ description: errors.sendgridApiKey.message, status: 'error' })
    if (errors.templateID?.message)
      toast({ description: errors.templateID.message, status: 'error' })
  }, [errors, toast])

  return (
    <>
      <Head>
        <title>Sendgrid UI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        display="flex"
        flexDir="column"
        px={4}
        justifyContent="center"
        alignItems="center"
        maxW="container.xl"
        minH="100vh"
        margin="0 auto"
      >
        <Flex justifyContent="center" alignItems="center" w="lg">
          <Heading marginLeft="auto">Sendgrid UI</Heading>
          <IconButton
            aria-label="Configurações"
            onClick={handleOpenConfigs}
            icon={<SettingsIcon />}
            colorScheme="blackAlpha"
            size="xs"
            marginLeft="auto"
          />
        </Flex>

        <Flex
          as="form"
          flexDir="column"
          alignItems="center"
          onSubmit={handleSubmit(handleSendMail)}
        >
          <VStack w="lg" mt={8} spacing={4}>
            <Input placeholder="Seu Email" {...register('email')} />
            {/* <Input
              placeholder="SendGrid API Key"
              {...register('sendgridApiKey')}
            /> */}
          </VStack>

          <Divider my={4} />

          <VStack w="lg" spacing={4}>
            <Input
              placeholder="Email do usuário"
              {...register('remetentEmail')}
            />
            <Input placeholder="TemplateID" {...register('templateID')} />
            <Text>Chaves do body</Text>
            <VStack>
              {fields.map((field, index) => (
                <HStack key={field.id}>
                  <Input
                    placeholder="Digite a chave do body"
                    {...register(`body.${index}.key`)}
                  />
                  <Input
                    placeholder="Digite o valor do body"
                    {...register(`body.${index}.value`)}
                  />
                  <IconButton
                    aria-label="Excluir chave"
                    icon={<CloseIcon />}
                    onClick={() => remove(index)}
                    colorScheme="red"
                    size="xs"
                  />
                </HStack>
              ))}
            </VStack>
            <Button
              type="button"
              size="sm"
              colorScheme="blue"
              onClick={() => append({ key: '', value: '' })}
            >
              Adicionar campo
            </Button>
          </VStack>

          <Button
            type="submit"
            isLoading={isSubmitting}
            mt={8}
            colorScheme="green"
            w="50%"
          >
            Enviar e-mail
          </Button>
        </Flex>
      </Container>
    </>
  )
}
