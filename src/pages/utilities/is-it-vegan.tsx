"use client";

import { UnorderedList } from "@/components/content/UnorderedList";

export default function IsItVegan() {
  return (
    <div className="py-6">
      is it vegan
      <UnorderedList>
        <div>https://isitvegan.net/</div>
        <div>https://doublecheckvegan.com/</div>
        <div>https://www.reddit.com/r/vegan/comments/1bam0n1/is_it_vegan/</div>
        <div>https://play.google.com/store/apps/details?id=com.eatsmartapps.whatsvegan&hl=en&pli=1</div>
        <div>https://isitveganjapan.com/</div>
        <div>https://sarahsveganguide.com/read-labels-as-a-vegan</div>
        <div>https://www.veganpeace.com/ingredients/ingredients.html</div>
      </UnorderedList>
      <UnorderedList>
        <div>May contain: This means a product was made in the same factory as other animal products. Businesses have to state that in order to protect themselves from lawsuits in case of allergic reactions caused by cross-contamination. It does not mean it is not vegan. This depends on your personal definition of veganism. Even if a product does not contain animal products, you might not want to support a brand that produces animal products as well.</div>
        <div>Dairy-free/lactose-free: This does not mean it is vegan as it can still contain milk (in case of lactose-free) or other animal products.</div>
        <div>E numbers: Food additives must be marked on the ingredient list with an E number. Some of them are not vegan: E120 (carmine), E441 (gelatine), E542 (bone phosphate), E901 (beeswax), E904 (shellac), E910/E920/E921 (L-cysteine), E913 (lanolin), E966 (lactitol).</div>
        <div>Sugar: Sugar cane may be processed with bone char from cows. It's best to look up the brand online or choose organic/beet sugar.</div>
        <div>Formulas can change over time. Even if you know a product and have used it for a while, it is better to still check the labels for any formula changes.</div>
        <div>Stick to the foods with no ingredient lists! Unprocessed plant foods such as fruits, vegetables, nuts, seeds, legumes and beans are vegan.</div>
      </UnorderedList>
    </div>
  );
}

