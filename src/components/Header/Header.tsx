import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Heading, Flex, Box, Tag, Button } from "@chakra-ui/react";
import { AccountSwitcher } from "./AccountSwitcher";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface HeaderProps {
  isSpot?: boolean;
}

export function Header({ isSpot }: HeaderProps) {
  return (
    <Flex p="3" borderBottom="1px solid rgba(255,255,255,0.2)" align="center">
      <Box>
        <Heading size="md" fontWeight="bold" fontFamily="mono">
          <Link to="/">Synthetix V3 Markets</Link>{" "}
          <Tag
            variant="solid"
            colorScheme="red"
            fontSize=".6em"
            minH="auto"
            py="0.5"
            px="1.5"
            fontWeight="bold"
            transform="translateY(.3em)"
          >
            PROTOTYPE
          </Tag>
        </Heading>
      </Box>
      <Box ml="4">
        <Link to="/spot/markets/ETH">
          <Button variant="ghost" opacity={isSpot ? "1" : ".5"}>
            Spot
          </Button>
        </Link>
        <Link to="/perps/markets/ETH">
          <Button variant="ghost" opacity={!isSpot ? "1" : ".5"}>
            Perps
          </Button>
        </Link>
        <Link target="_blank" to="https://v3.synthetix.io/">
          <Button variant="ghost" opacity=".5" rightIcon={<ExternalLinkIcon />}>
            LP
          </Button>
        </Link>
        <Link to="https://docs.synthetix.io/v/v3/">
          <Button variant="ghost" opacity=".5" rightIcon={<ExternalLinkIcon />}>
            Docs
          </Button>
        </Link>
      </Box>
      <Box ml="auto">
        <Flex>
          {!isSpot && <AccountSwitcher />}
          <Box ml="4">
            {/** @see https://www.rainbowkit.com/docs/connect-button */}
            <ConnectButton accountStatus="address" />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
