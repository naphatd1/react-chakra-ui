import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { LoginFormInput } from '../app-type/login-form-input.type'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
export default function LoginPage() {
  const schema = yup.object().shape({
    email: yup.string().required('ป้อนอีเมล์').email('รูปแบบอีเมล์ไม่ถูกต้อง'),
    password: yup
      .string()
      .required('ป้อนรหัสผ่าน')
      .min(3, 'รหัสผ่านอย่างน้อย 3ตัวอักษรขึ้นไป'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })
  const onSubmit = (data: LoginFormInput) => {console.log(data),
    toast.success('Successfully created!');
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link>{' '}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={errors.email ? true : false}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register('email')} />
                <FormErrorMessage>
                  {errors.email && errors.email?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password ? true : false}>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register('password')} />
                <FormErrorMessage>
                  {errors.password && errors.password?.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                isLoading={isSubmitting}
                loadingText='กำลังเข้าระบบ...'
                  bg={'blue.400'}
                  type="submit"
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  )
}
