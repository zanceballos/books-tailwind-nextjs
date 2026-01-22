import {
    Flex, Icon
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

//nav item
const NavItem = ({ icon, children, onClose, route, ...rest }) => {
    return (
      <Link
        href={route}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
        className="nav-items-bar"
        _hover={{ color: "purple.900", textDecoration: "none" }}
        passHref
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          onClick={onClose}
          cursor="pointer"
          _hover={{
            bg: "purple.900",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  };

export default NavItem