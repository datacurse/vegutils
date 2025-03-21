import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header1 } from "@/components/content/Header1";
import { Header2 } from "@/components/content/Header2";
import { Text } from "@/components/content/Text";
import { UnorderedList } from "@/components/content/UnorderedList";

export default async function Page() {
  return (
    <div>
      <Breadcrumbs />
      <Header1>Shrimp Eye Ablation</Header1>
      <Header2>What is Eye Ablation?</Header2>
      <Text>
        Eye ablation is a standard practice in commercial shrimp farming where one or both of a female shrimp's eyestalks are cut off or destroyed. The eyestalks contain hormone-producing glands that regulate the shrimp's reproduction cycle. By removing these glands, farmers force female shrimp to breed more frequently and produce eggs outside their natural cycles.
      </Text> 
      <Header2>How it's performed</Header2>
      <Text>
        The procedure is typically done without anesthesia using several methods:
      </Text> 
      <UnorderedList>
        <li>Cutting the eyestalk with scissors or a blade</li>
        <li>Pinching and twisting the eye off</li>
        <li>Cauterizing the eyestalk with a hot wire</li>
        <li>Tying off the eyestalk with a thread until it falls off</li>
      </UnorderedList>
      <Header2>Why it's cruel</Header2>
      <UnorderedList>
        <li>Shrimp have complex nervous systems and demonstrate pain responses</li>
        <li>The procedure is performed without pain relief</li>
        <li>It causes significant stress and disorientation</li>
        <li>Ablated shrimp show reduced immune function and higher mortality rates</li>
        <li>It forces reproduction at an unnatural and exhausting pace</li>
      </UnorderedList>
      <Header2>Industry Impact</Header2>
      <Text>
        This practice remains widespread in global shrimp farming operations, with billions of shrimp subjected to this procedure annually. Despite growing ethical concerns, it continues because it can increase egg production by 30-40% in farming operations.
      </Text> 
      <Header2>What Consumers Can Do</Header2>
      <Text>
        By choosing plant-based alternatives to shrimp and other seafood, consumers can help reduce the demand for products produced using these cruel practices and support the development of more ethical food systems.
      </Text> 
    </div>
  );
}


