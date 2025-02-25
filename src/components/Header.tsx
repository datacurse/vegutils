import Hamburger from "./hamburger";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <div className='w-full'>
      <div className='flex flex-row justify-between max-w-screen-2xl px-2 py-2 mx-auto page-full-width:max-w-full'>
        <div className='flex flex-row space-x-3 items-center text-lg font-semibold'>
          <img src="/images/icon.png" className='w-8 h-8 rounded-md' />
          <div>vegutils</div>
        </div>
        <div className='flex flex-row space-x-6 items-center'>
          <a href="https://discord.com/users/datacurse" target="_blank" className="hover:underline">Contact Dev</a>
          <a href="https://github.com/datacurse/vegutils" target="_blank" className="hover:underline">Github</a>
          <div className="flex flex-row space-x-2">
            <ThemeToggle />
            <div className="block lg:hidden">
              <Hamburger />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

