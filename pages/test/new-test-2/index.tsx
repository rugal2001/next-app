import React, { useState, useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { useInViewport } from "@mantine/hooks";

function Demo() {
//   const { ref, inViewport } = useInViewport();
  const [thirdImageRef, setThirdImageRef] = useState(null);

  useEffect(() => {
    if (thirdImageRef) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            console.log("Third image is in viewport");
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(thirdImageRef);

      return () => {
        observer.unobserve(thirdImageRef);
      };
    }
  }, [thirdImageRef]);

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNp5cdaIatjCHPZfk5xC3CqZFjq7znBp7uWfgM6ZBU0A&s",
    "https://img.freepik.com/photos-gratuite/peinture-lac-montagne-montagne-arriere-plan_188544-9126.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=600&h=400",
  ];

  return (
    <>
      <div>
        {images.map((image, i) => (
          <div className="grid justify-center my-3" key={i}>
            <img
              src={image}
              className="w-96 h-96"
              ref={i === 2 ? setThirdImageRef : null} // Set reference for the third image
              alt={`Image ${i + 1}`}
            />
          </div>
        ))}
      </div>

      {/* <Text textAlign="center">
        {inViewport ? "Box is visible" : "Scroll to see box"}
      </Text>
      <Box height={64} style={{ overflow: "scroll" }}>
        <Box height={128}></Box>
        <Box ref={ref} bg="blue" height={32} padding={8}>
          <Text textAlign="center" color="white">
            A box
          </Text>
        </Box>
      </Box> */}
    </>
  );
}

export default Demo;
