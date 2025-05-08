import { useParams } from "react-router-dom";

export default function ZoneDetail() {
  const { zoneId } = useParams();
  return <>{zoneId}</>;
}
