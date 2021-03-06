import { Link as ChakraLink, Button } from '@chakra-ui/react'

import { Container } from './Container'

export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom="0"
    width="100%"
    maxWidth="48rem"
    py={3}
  >
    <ChakraLink isExternal href="https://github.com/Rashmi-278/crypto-wallet" flexGrow={1} mx={2}>
      <Button width="100%" variant="outline" colorScheme="green">
        View Repo
      </Button>
    </ChakraLink>

    <ChakraLink
      isExternal
      href="/wallet"
      flexGrow={3}
      mx={2}
    >
      <Button width="100%" variant="solid" colorScheme="green">
        Demo
      </Button>
    </ChakraLink>
  </Container>
)
