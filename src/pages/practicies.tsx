import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header1 } from "@/components/content/Header1";
import { Text } from "@/components/content/Text";

export default async function Page() {
  return (
    <div>
      <Breadcrumbs />
      <Header1>Practicies</Header1>
      <Text>
        In this section we are going to list all cruel practicies that happen to animals on farms.
      </Text> 
    </div>
  );
}


