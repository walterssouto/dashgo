import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean
}

export function Profile({ showProfileData=true }:ProfileProps) {
  return (
    <Flex align="center">
        { showProfileData && (
            <Box mr="4" textAlign="right">
            <Text>Walters Souto</Text>
            <Text color="gray.300" fontSize="small">
              walters.souto@outlook.com
            </Text>
          </Box>
        ) }
      
      <Avatar
        size="md"
        name="Walters Souto"
        src="https://github.com/walterssouto.png"
      />
    </Flex>
  );
}
