import { Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface NavBarMenuItemProps {
  children: Object;
  to: string;
}

export const NavBarMenuItem: React.FC<NavBarMenuItemProps> = ({
  children,
  to = "/",
  ...rest
}) => {
  return (
    <NextLink href={to}>
      <Link>
        <Text  {...rest}>
          {children}
        </Text>
      </Link>
    </NextLink>
  );
};
