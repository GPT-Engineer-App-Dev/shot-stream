import React, { useState, useCallback } from 'react';
import { Box, Button, Container, Heading, Image, SimpleGrid, Text, VStack, useToast } from "@chakra-ui/react";
import { FaCamera, FaUpload, FaHeart } from "react-icons/fa";

const Index = () => {
  const [photos, setPhotos] = useState([]);
  const [likes, setLikes] = useState({});
  const toast = useToast();

  const handlePhotoUpload = useCallback((event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    toast({
      title: "Photos uploaded",
      description: `${files.length} photo(s) have been added to your gallery.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, []);

  const handleDragDrop = useCallback((event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    toast({
      title: "Photos uploaded",
      description: `${files.length} photo(s) have been added to your gallery.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, []);

  const handleLike = useCallback((index) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [index]: (prevLikes[index] || 0) + 1
    }));
    toast({
      title: "Photo liked",
      description: "You've liked this photo!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }, []);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">PhotoShare</Heading>
        
        <Box
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="lg"
          p={6}
          textAlign="center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDragDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
            id="photo-upload"
            multiple
          />
          <label htmlFor="photo-upload">
            <Button as="span" leftIcon={<FaCamera />} colorScheme="teal" size="lg" mb={4}>
              Choose Photos
            </Button>
          </label>
          <Text>or drag and drop your photos here</Text>
        </Box>

        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {photos.map((photo, index) => (
            <Box key={index} borderWidth={1} borderRadius="lg" overflow="hidden">
              <Image src={photo} alt={`Uploaded photo ${index + 1}`} objectFit="cover" h="200px" w="100%" />
              <Box p={2}>
                <Text fontWeight="bold">Photo {index + 1}</Text>
                <Button
                  leftIcon={<FaHeart />}
                  colorScheme="pink"
                  variant="outline"
                  size="sm"
                  onClick={() => handleLike(index)}
                  mt={2}
                >
                  Like ({likes[index] || 0})
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {photos.length === 0 && (
          <Text textAlign="center" color="gray.500">
            No photos uploaded yet. Start sharing!
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Index;