import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header1 } from "@/components/content/Header1";
import { Header2 } from "@/components/content/Header2";
import { Link } from "@/components/content/Link";
import { Text } from "@/components/content/Text";
import { UnorderedList } from "@/components/content/UnorderedList";

export default async function Page() {
  return (
    <div>
      <Breadcrumbs />
      <Header1>Eyestalk Ablation</Header1>
      <Header2>What is Eyestalk Ablation?</Header2>
      <Text>
        Eye ablation is a standard practice in commercial shrimp farming where one or both of a female shrimp's eyestalks are cut off or destroyed. The eyestalks contain hormone-producing glands that regulate the shrimp's reproduction cycle. By removing these glands, farmers force female shrimp to breed more frequently and produce eggs outside their natural cycles.
      </Text> 
      <Link href="https://en.wikipedia.org/wiki/Eyestalk_ablation">
        Wiki
      </Link>
      <Header2>How it's performed</Header2>
      <Text>
        The procedure is typically done without anesthesia using several methods:
      </Text> 
      <UnorderedList>
        <li>Pinching the eyestalk, usually half to two-thirds down the eyestalk. This method may leave an open wound.</li>
        <li>Slitting one eye with a razor blade, then crushing the eyestalk, with thumb and index fingernail, beginning one-half to two-thirds down the eyestalk and moving distally until the contents of eyes have been removed. This method, sometimes called enucleation, leaves behind the transparent exoskeleton so that clotting of haemolymph, and closure of the wound, may occur more rapidly.</li>
        <li><Link href="https://en.wikipedia.org/wiki/Cauterization">Caterizing</Link> through the eyestalk with either an electrocautery device or an instrument such as a red-hot wire or forceps. If performed correctly, this method closes the wound and allows scar tissue to form more readily. A variation of this technique is to use scissors or a sharp blade to sever the eyestalk, and then to cauterize the wound.</li>
        <li><Link href="https://en.wikipedia.org/wiki/Ligature_(medicine)">Ligation</Link> by tying off the eyestalk tightly with surgical or other thread. This method also has the advantage of immediate wound closure.</li>
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
      <Header2>Footage</Header2>
      <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/x-COaQS4Gq0?si=OWH27hiRbAQrXtr3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ezPRC3_InHo?si=BILOpHAoSFCWjbJH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      {/* <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/bz8aY6Snp88?si=4DZXzIwo8-BjVMNz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
      <iframe width="560" height="315" src="https://www.youtube.com/embed/Y78TDlgF-cg?si=XCWJTPobv68G5pn9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <Header2>Studies</Header2>
      <UnorderedList>
        <li><Link href="https://www.fao.org/4/af007e/AF007E04.htm">
          Reproduction and Larval Rearing of Penaeids: Techniques and Commercial Applications.
        </Link></li>
        <li><Link href="https://journals.plos.org/plosone/article/figures?id=10.1371/journal.pone.0024427">
          Molecular Mechanisms of Ovarian Maturation Following Eyestalk Ablation in Penaeus monodon.
        </Link></li>
        <li><Link href="https://www.researchgate.net/publication/381670861_EYESTALK_ABLATION_IN_CRUSTACEAN_PRODUCTION_A_BRIEF_REVIEW_OF_THE_ADVANTAGES_DISADVANTAGES_AND_PUBLIC_OPINIONS">
          Eyestalk ablation in crustacean production a brief review of the advantages, disadvantages, and public opinions.
        </Link></li>
        <li><Link href="https://www.peta.org.uk/blog/prawns-eyestalk-ablation/">
          Still Eating Prawns? Eyestalk Ablation Will Change Your Mind Forever
        </Link></li>
      </UnorderedList>
    </div>
  );
}


