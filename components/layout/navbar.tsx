"use client";
import React from "react";
import { Icon } from "@iconify/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Divider,
} from "@heroui/react";
import { ThemeSwitcher } from "../theme-toggle";
import { SignOutButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SiteNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isNotifOpen, setIsNotifOpen] = React.useState(false);

  const user = useQuery(api.users.get);
  const cart = useQuery(api.carts.getCart, {}); // Fetch cart data
  const cartItemCount =
    cart?.items.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0) || 0; // Calculate total items

  const pages = [
    { href: "/schools", label: "Schools" },
    { href: "/catalog", label: "Catalog" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  const userActions = [
    {
      key: "orders",
      label: "My Orders",
      icon: "lucide:package",
      href: "/cart",
    },
    {
      key: "profile",
      label: "Profile",
      icon: "lucide:user",
      href: user?.role === "admin" ? "/admin" : "/profile",
    },
  ];

  return (
    <>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="xl"
        className="bg-background/60 backdrop-blur-md border-b"
        height="4rem"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link
              href="/"
              className="font-bold text-inherit text-xl flex items-center gap-2"
            >
              <Icon
                icon="lucide:shopping-bag"
                className="h-6 w-6 text-primary"
              />
              UniMart
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            {/*<Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                  startContent={<Icon icon="lucide:layout-grid" className="h-4 w-4" />}
                >
                  Categories
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Categories">
                {categories.map((category) => (
                  <DropdownItem
                    key={category.href}
                    startContent={<Icon icon={category.icon} className="h-4 w-4" />}
                  >
                    <Link href={category.href} className="w-full">
                      {category.label}
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>*/}
          </NavbarItem>
          {pages.map((page) => (
            <NavbarItem key={page.href}>
              <Link color="foreground" href={page.href}>
                {page.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end" className="hidden sm:flex">
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              onPress={() => setIsSearchOpen(true)}
            >
              <Icon icon="lucide:search" className="h-5 w-5" />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              onPress={() => setIsNotifOpen(true)}
            >
              <Icon icon="lucide:bell" className="h-5 w-5" />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Link href="/cart">
              <Badge
                content={cartItemCount}
                color="primary"
                shape="circle"
                size="sm"
              >
                <Button isIconOnly variant="light">
                  <Icon icon="lucide:shopping-cart" className="h-5 w-5" />
                </Button>
              </Badge>
            </Link>
          </NavbarItem>
          <Authenticated>
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    startContent={
                      <Icon icon="lucide:user" className="h-5 w-5" />
                    }
                  >
                    Account
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User actions">
                  <>
                    {userActions.map((action) => (
                      <DropdownItem
                        key={action.key}
                        startContent={
                          <Icon icon={action.icon} className="h-4 w-4" />
                        }
                      >
                        <Link href={action.href} className="w-full">
                          {action.label}
                        </Link>
                      </DropdownItem>
                    ))}
                  </>
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                    startContent={
                      <Icon icon="lucide:log-out" className="h-4 w-4" />
                    }
                  >
                    <SignOutButton>Log Out</SignOutButton>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </Authenticated>
          <Unauthenticated>
            <NavbarItem>
              <Link href="/auth">Login / Sign Up</Link>
            </NavbarItem>
          </Unauthenticated>
          <NavbarItem className="hidden lg:flex">
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem>
            <Input
              placeholder="Search products..."
              size="sm"
              startContent={
                <Icon
                  icon="lucide:search"
                  className="h-4 w-4 text-default-400"
                />
              }
              type="search"
            />
          </NavbarMenuItem>

          {/* <NavbarMenuItem className="font-medium text-primary">Categories</NavbarMenuItem>
          {categories.map((category) => (
            <NavbarMenuItem key={category.href}>
              <Link
                color="foreground"
                className="w-full flex items-center gap-2"
                href={category.href}
                size="lg"
              >
                <Icon icon={category.icon} className="h-4 w-4" />
                {category.label}
              </Link>
            </NavbarMenuItem>
          ))}*/}

          <NavbarMenuItem className="font-medium text-primary mt-4">
            Quick Links
          </NavbarMenuItem>
          {pages.map((page) => (
            <NavbarMenuItem key={page.href}>
              <Link
                color="foreground"
                className="w-full"
                href={page.href}
                size="lg"
              >
                {page.label}
              </Link>
            </NavbarMenuItem>
          ))}

          <Divider className="my-4" />

          <NavbarMenuItem className="font-medium text-primary">
            Account
          </NavbarMenuItem>
          <Authenticated>
            {userActions.map((action) => (
              <NavbarMenuItem key={action.key}>
                <Link
                  color="foreground"
                  className="w-full flex items-center gap-2"
                  href={action.href}
                  size="lg"
                >
                  <Icon icon={action.icon} className="h-4 w-4" />
                  {action.label}
                </Link>
              </NavbarMenuItem>
            ))}

            <NavbarMenuItem>
              <Link
                color="danger"
                className="w-full flex items-center gap-2"
                size="lg"
              >
                <SignOutButton>
                  <Icon icon="lucide:log-out" className="h-4 w-4" />
                  Log Out
                </SignOutButton>
              </Link>
            </NavbarMenuItem>
          </Authenticated>
          <Unauthenticated>
            <NavbarMenuItem>
              <Link
                color="foreground"
                className="w-full flex items-center gap-2"
                href="/auth"
                size="lg"
              >
                Login / Sign Up
              </Link>
            </NavbarMenuItem>
          </Unauthenticated>

          <Divider className="my-4" />

          <NavbarMenuItem className="flex justify-between items-center">
            <span className="font-medium">Change theme</span>
            <ThemeSwitcher />
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      <Modal
        isOpen={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Search Products
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  placeholder="Search products, brands, and categories..."
                  variant="bordered"
                  startContent={<Icon icon="lucide:search" />}
                  size="lg"
                />
                {/*<div className="mt-4">
                  <p className="text-small font-medium text-default-700">Popular Categories</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {categories.map((category) => (
                      <Button
                        key={category.href}
                        variant="flat"
                        size="sm"
                        startContent={<Icon icon={category.icon} className="h-4 w-4" />}
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>*/}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isNotifOpen} onOpenChange={setIsNotifOpen} size="md">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Notifications
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <p className="text-small text-default-500">
                    Your order #12345 has been shipped!
                  </p>
                  <p className="text-small text-default-500">
                    New deals available in Electronics category.
                  </p>
                  <p className="text-small text-default-500">
                    Your wishlist item is now on sale!
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
