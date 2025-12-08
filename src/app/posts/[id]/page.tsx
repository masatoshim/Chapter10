import DetailPage from "@/components/DetailPage";
import { DetailPageProps } from "@/lib/types";

export default async function Detail({ params }: DetailPageProps) {
  const { id } = await params;
  return (
    <DetailPage id={id}/>
  );
}