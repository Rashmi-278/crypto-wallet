import {
    Button,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useClipboard,
    VStack,
  } from '@chakra-ui/react';
  import dynamic from 'next/dynamic'
  import { useEffect, useState } from 'react'
import * as Bip39 from 'bip39'
import * as Bip32 from 'bip32';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from "@chakra-ui/react"
//A JavaScript component for BIP32(hierarchical deterministic keys).


import hdkey from 'hdkey'
import crypto from 'crypto';


  type Mnemonic = {
    mnemonic: string;
  };

  
  
  export default function GenerateMnemonic() {
    const [mnemo,setMnemo] = useState(String)
    const [seedhex, setSeedhex] = useState(undefined)
    const [validMnemo,setValidMnemo] = useState(undefined)
    const [keyfromseed,setKeyfromseed] = useState(undefined)
    const { hasCopied, onCopy } = useClipboard(mnemo)
    const [keypairs,setKeypairs] = useState({'xpriv':"",'xpub':""})
    
    //Encryption Decryption 
    const algorithm = "aes-256-cbc"; 
    // generate 16 bytes of random data
    const initVector = crypto.randomBytes(16);
    // secret key generate 32 bytes of random data
    const Securitykey = crypto.randomBytes(32);
    const [message,setMessage] = useState("Top secret very important highly confidential message like roses are red")
    const [encrypt, setencrypt] = useState(undefined)
    const [decrypt, setdecrypt] = useState(undefined)
    let encryptedData,decryptedData;

    //Signing and Verifying
    const [signd, setsignd] = useState(undefined)
    const [verify, setverify] = useState(undefined)


   return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'2xl'}
          maxW={'3xl'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={10}> 
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} color='cyan'>
           Crypto Wallet UI          
          </Heading>

          <Heading lineHeight={1.1} fontSize={{ base: 'xl', md: '2xl' }}>
            Generate a Random Mnemonic using BIP39
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            This mnemonic will be used as a seed phrase to create your wallet
          </Text>
         <Flex mb={2} >

                <Input value={mnemo} isReadOnly placeholder="Random word string" size="lg" />

                <Button onClick={onCopy} ml={4}>
                {hasCopied ? "Copied" : "Copy"}
                </Button>
          </Flex>
          <Input value={seedhex} isReadOnly placeholder="Seed" size="lg" />
          <Input value={validMnemo} isReadOnly placeholder="Mnemonic validity" size="lg" colorScheme='pink' />
          <Heading lineHeight={1.1} fontSize={{ base: 'xl', md: '2xl' }}>
            Generate a Key using BIP32
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            This key will be the root key for your wallet.
          </Text>
          <Text fontSize="md">Private Key</Text>

          <Input value={keypairs.xpriv} isReadOnly placeholder=" Private Key from seed phrase" size="lg" colorScheme='pink' />
          <Text fontSize="md">Public Key</Text>

        <Input value={keypairs.xpub} isReadOnly placeholder=" Public Key from seed phrase" size="lg" colorScheme='pink' />
          

        <Heading lineHeight={1.1} fontSize={{ base: 'xl', md: '2xl' }}>
            Encrypt and Decrypt a message using generated keys
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            Private key is used to encrypt and public key is used to decrypt.
          </Text>
        <FormControl >
        <FormLabel>Message</FormLabel>
        <Input type="text" onChange={(e)=>{setMessage(e.target.value)}} value={message} placeholder="meeku meeku"/>
        </FormControl>

        <Text fontSize="md">Encrypted</Text>

          <Input value={encrypt} isReadOnly placeholder="Encrypted message" size="lg" colorScheme='pink' />
          <Text fontSize="md">Decrypted</Text>

        <Input value={decrypt} isReadOnly placeholder="Decrypted Message" size="lg" colorScheme='pink' />
          
        <Heading lineHeight={1.1} fontSize={{ base: 'xl', md: '2xl' }}>
            Sign and verify your encrypted message
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
                Encrypted message is signed and the generated signature is verified.
          </Text>

          <Text fontSize="md">Signature</Text>

            <Input value={signd} isReadOnly placeholder="Encrypted message" size="lg" colorScheme='pink' />
            <Text fontSize="md">Verify </Text>

            <Input value={verify} isReadOnly placeholder="Decrypted Message" size="lg" colorScheme='pink' />
          
          
          <Stack spacing={6}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} color='cyan'>
           Control Panel   
          </Heading>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={ () => {  setMnemo(Bip39.generateMnemonic()) 
                setSeedhex(Bip39.mnemonicToSeedSync(mnemo).toString('hex'))
                
            } }
            >
              Generate Mnemonic
            </Button>
            <Button
            bg={'pink.400'}
            color={'white'}
            _hover={{
                bg: 'pink.600',
              }}
              onClick={ () => {
                setValidMnemo(Bip39.validateMnemonic(mnemo))
              }}
            >
            Validate
            </Button>
            <Button
            bg={'green.400'}
            color={'white'}
            _hover={{
                bg: 'green.500',
              }}
              onClick={ () => {
                setKeyfromseed(Bip32.fromSeed(Bip39.mnemonicToSeedSync(mnemo)).toWIF())
                // console.log(keyfromseed.toString())
                setKeypairs(hdkey.fromMasterSeed(Bip39.mnemonicToSeedSync(mnemo)).toJSON())
                console.log(keypairs)
              }}
            >
            Generate  Private Key from seed
            </Button>
            <Button colorScheme="orange" variant="solid" onClick={
                () => {
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
                     encryptedData = cipher.update(message, "utf-8", "hex");
                    encryptedData += cipher.final("hex");
            
                    setencrypt(encryptedData);
                    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

            decryptedData = decipher.update(encryptedData, "hex", "utf-8");
               
               decryptedData += decipher.final("utf-8");
               setdecrypt(decryptedData)
                    
                    
                }    
            }>
            Encrypt  Message
            </Button>
            <Button colorScheme="purple" variant="solid" onClick={()=>{
                let keys = hdkey.fromMasterSeed(Bip39.mnemonicToSeedSync(mnemo))
                setsignd( keys.sign(encryptedData).toString() ) 
            }}>
            Sign Message
            </Button>
            {/* <Button colorScheme="orange" variant="solid" onClick={() => {
                    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

            decryptedData = decipher.update(encryptedData, "hex", "utf-8");
               
               decryptedData += decipher.final("utf-8");
               setdecrypt(decryptedData)
                
            }}>
            Decrypt Message
            </Button> */}
            <Button colorScheme="purple" variant="solid">
                Verify Message
            </Button>
            
          </Stack>
        </Stack>
      </Flex>
    );
  }