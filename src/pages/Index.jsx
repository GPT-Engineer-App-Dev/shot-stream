import React, { useState } from 'react';
import { Box, Button, Container, Heading, Image, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";

const Index = () => {
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotos([...photos, e.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">PhotoShare</Heading>
        
        <Box>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
            id="photo-upload"
          />
          <label htmlFor="photo-upload">
            <Button as="span" leftIcon={<FaCamera />} colorScheme="teal" size="lg" width="100%">
              Upload Photo
            </Button>
          </label>
        </Box>

        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {photos.map((photo, index) => (
            <Box key={index} borderWidth={1} borderRadius="lg" overflow="hidden">
              <Image src={photo} alt={`Uploaded photo ${index + 1}`} />
              <Box p={2}>
                <Text fontWeight="bold">Photo {index + 1}</Text>
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