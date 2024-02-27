import { AppShell, Burger, Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import { useRouter } from "next/router";
import App from "next/app";

export function Layout({children}) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="flex items-center">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="lg" />
        <div className="flex items-center justify-start gap-3 m-3">
          <Avatar src="../image/9440461.jpg" alt="it's me" />
          <div className="font-extrabold">Hello im next</div>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <div className="grid col-span-1 text-xl font-semibold">
          <div
            className="mb-3 cursor-pointer hover:text-blue-600"
            onClick={() => {
              router.push("/");
            }}
          >
            Home Page
          </div>
          <div
            className="mb-3 cursor-pointer hover:text-blue-600"
            onClick={() => {
              router.push("/posts");
            }}
          >
            Posts Page
          </div>
          <div
            className="mb-3 cursor-pointer hover:text-blue-600"
            onClick={() => {
              router.push("/comments");
            }}
          >
            Comments Page
          </div>
          <div className="mb-3 cursor-pointer hover:text-blue-600">
            About Page
          </div>
        </div>
      </AppShell.Navbar>

      <AppShell.Main 
        //  style={{
        //   backgroundImage: "url('../image/colors-white-blue.png')",
        //   backgroundSize: "cover",
        // }}
      >
        {children}
        
      </AppShell.Main>
      
    </AppShell>
  );
}
