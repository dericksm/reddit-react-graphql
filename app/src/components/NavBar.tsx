import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NavBarMenuItem } from "./NavBarMenuItem";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <Stack
          spacing={8}
          align="center"
          justify={"space-between"}
          direction={"row"}
          float="right"
          pt={[4, 4, 0, 0]}
        >
          <NavBarMenuItem to="/login">Login</NavBarMenuItem>
          <NavBarMenuItem to="/register">Register</NavBarMenuItem>
        </Stack>
      </>
    );
  } else {
    body = (
      <Flex zIndex={1} alignItems={"center"}>
        <Box mr={4}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            router.reload();
          }}
          backgroundColor="white"
          color={"black"}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex w="100%" mb={8} p={8} bg={"#319795"} color={"white"}>
      <Box flexBasis={{ base: "80%" }} float="left">
        <NextLink href="/">
          <Link>
            <Heading fontWeight={"bold"}>reddit</Heading>
          </Link>
        </NextLink>
      </Box>
      <Box flexBasis={{ base: "20%" }}>{body}</Box>
    </Flex>
  );
};
