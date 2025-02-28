import { AppShell, Burger, NavLink, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";

const Layout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        Figuratively
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink href="/" label="Home"></NavLink>
        <NavLink href="/timed-session" label="Timed Session"></NavLink>
        <NavLink href="/random-poses" label="Random Poses"></NavLink>
        <NavLink href="/login" label="Login"></NavLink>
        <NavLink href="/register" label="Register"></NavLink>
      </AppShell.Navbar>

      <AppShell.Main>
        <ScrollArea>
          <Outlet />
        </ScrollArea>
      </AppShell.Main>
      <AppShell.Footer>Footer</AppShell.Footer>
    </AppShell>
  );
};

export default Layout;
