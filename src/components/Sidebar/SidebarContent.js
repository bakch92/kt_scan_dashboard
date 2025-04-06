/*eslint-disable*/
// chakra imports
import {
    Box,
    Button, Flex,
    Img,
    Link,
    Stack,
    Text,
    useColorMode,
    useColorModeValue
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import KT_ci from "assets/img/kt_ci.png";
import KT_ci_dark from "assets/img/kt_ci_dark.png";
import { CreativeTimLogo } from "components/Icons/Icons";
import { Separator } from "components/Separator/Separator";
import { SidebarHelp } from "components/Sidebar/SidebarHelp";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// this function creates the links and collapses that appear in the sidebar (left menu)


const SidebarContent = ({ logoText, routes }) => {

    // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const { colorMode } = useColorMode();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  const createLinks = (routes) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue("white", "gray.700");
    const inactiveBg = useColorModeValue("white", "gray.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <div key={prop.name}>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{
                xl: "12px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
            >
              {document.documentElement.dir === "rtl"
                ? prop.rtlName
                : prop.name}
            </Text>
            {createLinks(prop.views)}
          </div>
        );
      }
      return (
        <NavLink to={prop.layout + prop.path} key={prop.name}>
          {activeRoute(prop.layout + prop.path) === "active" ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={activeBg}
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              borderRadius="15px"
              _hover="none"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg="teal.300"
                    color="white"
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {document.documentElement.dir === "rtl"
                    ? prop.rtlName
                    : prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              py="12px"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              borderRadius="15px"
              _hover="none"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg={inactiveBg}
                    color="teal.300"
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={inactiveColor} my="auto" fontSize="sm">
                  {document.documentElement.dir === "rtl"
                    ? prop.rtlName
                    : prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NavLink>
      );
    });
  };

    const links = <>{createLinks(routes)}</>;

  // Logo image path based on color mode
  const logoImage = colorMode === "light" ? KT_ci : KT_ci_dark;
  const height = colorMode === "light" ? 50 : 30;
  const width = colorMode === "light" ? 50 : 30;

  return (
    <>
        <Box pt={"25px"} mb="12px">
      <Link
        href={`${process.env.PUBLIC_URL}/#/`}
        display="flex"
        lineHeight="100%"
        mb="30px"
        fontWeight="bold"
        justifyContent="center"
        alignItems="center"
        fontSize="11px"
      >
        {/* <CreativeTimLogo w="32px" h="32px" me="10px" /> */}
        {/* KT_ci 이미지 컴포넌트*/}
        <Img src={logoImage} height={height} width={width} marginRight={3}/>
        <Text fontSize="sm" mt="5px">
          {logoText}
        </Text>
      </Link>
      <Separator></Separator>
    </Box>
          <Stack direction="column" mb="20px">
            <Box>{links}</Box>
          </Stack>
          <SidebarHelp />
    </>
  )
}

export default SidebarContent