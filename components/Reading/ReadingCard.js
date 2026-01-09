import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Progress,
  Button,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
const ReadingCard = ({
  title,
  author,
  coverImage,
  progress,
  onContinue,
  onRemove,
}) => {
  // Dynamic colors for Light/Dark mode
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("purple.100", "purple.900");
  const shadow = useColorModeValue("lg", "dark-lg");

  return (
    <Box
      bg={bg}
      p={4}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow={shadow}
      transition="all 0.2s"
      _hover={{ transform: "translateY(-2px)", borderColor: "purple.400" }}
      w="full"
    >
      <Flex gap={5}>
        {/* LEFT: Book Cover */}
        <Image
          src={coverImage || "https://via.placeholder.com/150"} // Fallback image
          alt={title}
          borderRadius="md"
          boxSize="120px"
          objectFit="cover"
          boxShadow="md"
        />

        {/* RIGHT: Details & Actions */}
        <VStack align="start" justify="space-between" w="full" spacing={1}>
          {/* Header Info */}
          <Box w="full">
            <Text fontSize="lg" fontWeight="bold" noOfLines={1}>
              {title}
            </Text>
            <Text fontSize="sm" color="gray.500">
              By {author}
            </Text>
          </Box>

          {/* Progress Bar Section */}
          <Box w="full" mt={2}>
            <HStack justify="space-between" mb={1}>
              <Text fontSize="xs" color="purple.500" fontWeight="bold">
                Progress
              </Text>
              <Text fontSize="xs" fontWeight="bold">
                {progress}%
              </Text>
            </HStack>
            <Progress
              value={progress}
              size="sm"
              colorScheme="purple"
              borderRadius="full"
              bg="gray.100"
            />
          </Box>

          {/* Buttons */}
          <HStack w="full" justify="space-between" pt={2}>
            <Button
              size="sm"
              colorScheme="purple"
              onClick={onContinue}
              variant="solid"
            >
              Continue Reading
            </Button>

            <Button
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={onRemove}
            >
              Remove
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ReadingCard;
