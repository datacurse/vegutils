import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Bold } from "@/components/content/Bold";
import { Code } from "@/components/content/Code";
import { Description } from "@/components/content/Description";
import { Header1 } from "@/components/content/Header1";
import { ImageWithCaption } from "@/components/content/ImageWithCaption";
import LastUpdated from "@/components/content/LastUpdated";
import OrderedList from "@/components/content/OrderedList";
import { UnorderedList } from "@/components/content/UnorderedList";
import { stat } from 'fs/promises';
import { fileURLToPath } from 'url';

export default async function Page() {
  const getLastModifiedDate = async () => {
    try {
      const currentFilePath = fileURLToPath(import.meta.url);
      const stats = await stat(currentFilePath);
      return stats.mtime.toISOString();
    } catch (error) {
      return new Date().toISOString();
    }
  };

  const lastModified = await getLastModifiedDate();

  return (
    <div className="flex flex-col gap-3 mb-6 w-[985px]">
      <Breadcrumbs />
      <Description>Add and edit blocks within your content.</Description>
      <div className="flex flex-col gap-5">
        <div>
          GitBook is a block-based editor, meaning you can add different kinds of blocks to your content — from standard text and images to interactive blocks. Your pages can include any combination of blocks you want, and there’s no limit to the number of blocks you can have on a page.
        </div>
        <ImageWithCaption
          src="/images/creating-content-blocks.png"
          description="GitBook's built in content blocks."
        />
        <Header1>Inserting a new content block</Header1>
        <div>You can insert a new content block below an existing block using your mouse:</div>
        <OrderedList>
          <div>Hover over the block above the place you need the new content block.</div>
          <div>Click on the <Code>+</Code> icon that appears on the left to open the insert palette.</div>
          <div>Hover over the block above the place you need the new content block.</div>
        </OrderedList>
        <div>
          Alternatively, on a new line, you can press <Code>/</Code> to launch the insert palette, which lists all the available blocks. You can scroll through the list to find the one you want, or use your keyboard to search for the block you want, navigate up and down the list, and insert it with <Code>Enter</Code>.
        </div>
        <Header1>Exiting a block</Header1>
        <div>Some content blocks capture the editing cursor to allow you to add content in the context of that block. For example, when you’re writing in a hint block, hitting <Code>Enter</Code> will add a new line within the hint block, rather than a new paragraph below.</div>
        <div>When you are done, you can continue adding new content to the page either by inserting a new block using the <Code>+</Code> button to the left of your content, or by hitting <Bold>⌘ + Enter</Bold> on a Mac or <Bold>Ctrl + Enter</Bold> on a PC.</div>
        <Header1>Selecting blocks and interacting with selected blocks</Header1>
        <div>You can select a single block by pressing the <Code>Esc</Code> key with the cursor in the block. You can also select multiple blocks by highlighting content within them and hitting <Code>Esc</Code>.</div>
        <div>Once selected, you can:</div>
        <UnorderedList>
          <div>Select more blocks by clicking on them while keeping the <Bold>Shift ⇧</Bold> key pressed.</div>
          <div>Moving up and down to select the block above or below, using the <Bold>↑</Bold> and <Bold>↓</Bold> keys</div>
          <div>Copy the entire block using <Bold>⌘ + C</Bold> (Mac) or <Bold>Ctrl + C</Bold> (Windows)</div>
          <div>Cut the entire block using <Bold>⌘ + X</Bold> (Mac) or <Bold>Ctrl + X</Bold> (Windows)</div>
          <div>Delete the selected block or blocks using <Bold>⌫</Bold> or <Bold>Del</Bold>.</div>
        </UnorderedList>
        <Header1>Full-width blocks</Header1>
        <div>By making your blocks full width, you can create a clear visual hierarchy in your content, or simply give more space to content that needs it.</div>
        <div>To make a block full width, click on the <Bold>Options menu</Bold> next to your block and select <Bold>Full width</Bold>. This feature is available for the following block types:</div>
        <UnorderedList>
          <div>Code Blocks</div>
          <div>Image blocks</div>
          <div>Tables</div>
          <div>Cards</div>
          <div>API Blocks</div>
          <div>Integration blocks</div>
        </UnorderedList>
        <LastUpdated timestamp={lastModified} />
      </div>
    </div>
  );
}

