import Image from "next/image";
import LisitingMapView from "./_components/LisitingMapView";

export default function Home() {
  return (
    <div className="px-10 p-10">
      <LisitingMapView type="Offer"/>
    </div>
  );
}
