import ImageCarousel from "@/components/ImageCarousel";
import slide1 from "@/assets/F4.png";
import slide2 from "@/assets/forest.jpeg";
import slide3 from "@/assets/istockphoto-1193535093-612x612.jpg";

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ImageCarousel
        items={[
          { src: slide1, alt: "Basketball Game" },
          { src: slide2, alt: "Forest View" },
          { src: slide3, alt: "Basketball Court" },
        ]}
      />
    </div>
  );
};

export default DashboardPage;
