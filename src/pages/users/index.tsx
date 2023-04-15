import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import  NextLink  from 'next/link'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { getUsers, useUsers } from "@/services/hooks/useUsers";
import { useState } from "react";
import { QueryClient } from "react-query";
import { queryClient } from "@/services/queryClient";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";

type User = {
  id: string;
  name: string ;
  email: string;
  createdAt: string;
}

export default function UserList({users}) {
  const [page, setPage] = useState(1);

  const {data, isLoading, error} = useUsers(page)
  
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data

    }, {
      staleTime: 1000 * 60,  //10min
  })
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>
            <NextLink href='/users/create' passHref>
              <Button
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
        { isLoading ? (
          <Flex justify='center'>
            <Spinner />
          </Flex>
        ): error ? (
          <Flex justify='center'>
            <Text>Falha ao obter os dados do usuário</Text>
          </Flex>
        ): (
         <>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={['4', '4', '6']} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuário</Th>
                {isWideVersion && <Th>Data de cadastro</Th>}
                <Th w="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                data.users.map(user => {
                  return(
                    <Tr>
                    <Td px={['4', '4', '6']}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Link color='purple.400' onMouseEnter={() => handlePrefetchUser(user.id)}>
                          <Text fontWeight="bold">{user.name}</Text>
                        </Link>
                        <Text fontWeight="small" color="gray.300">
                          {user.email}
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>{user.created_at}</Td>}
                    { isWideVersion && (
                        <Td>
                        <Button
                          size="sm"
                          fontSize="small"
                          colorScheme="purple"
                          leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                        >Editar
                        </Button>
                      </Td>
                    )}
                  </Tr>
                  )
                })
              }
            
            </Tbody>
          </Table>
          <Pagination 
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
            />
       </>
        ) }
        </Box>
      </Flex>
    </Box>
  );
}