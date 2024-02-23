import { AppShell, Burger, Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import { useRouter } from "next/router";
import App from "next/app";

export function Demo() {
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
        <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="sm" />
        <div className="flex items-center justify-start gap-3 m-3">
          <Avatar src="../image/9440461.jpg" alt="it's me" />
          <div className="font-extrabold">Hello im next</div>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <div className="grid col-span-1 text-xl font-semibold">
          <div className="mb-5 font-bold">Here is the Titles</div>
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
              router.push("/posts");
            }}
          >
            Comments Page
          </div>
          <div className="mb-3 cursor-pointer hover:text-blue-600">
            About Page
          </div>
        </div>
      </AppShell.Navbar>

      
      <AppShell.Main >
        





        
      </AppShell.Main>
      <AppShell.Footer>
        <div className="text-3xl font-extrabold text-black">Hi every one</div>
      </AppShell.Footer>
    </AppShell>
  );
}
