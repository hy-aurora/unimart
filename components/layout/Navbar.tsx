import React from "react";
import Link from "next/link";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge
} from "@heroui/react";
import { useCart } from "@/context/CartContext";

const NavbarComponent = () => {
  const { isSignedIn, user } = useUser();
  const { cartItems } = useCart?.() || { cartItems: [] };
  const itemCount = cartItems?.reduce?.((total, item) => total + item.quantity, 0) || 0;
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="font-bold text-xl">UniMart</Link>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
        
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light">Categories</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem as={Link} href="/categories/elementary" key={""}>Elementary School</DropdownItem>
            <DropdownItem as={Link} href="/categories/middle" key={""}>Middle School</DropdownItem>
            <DropdownItem as={Link} href="/categories/high" key={""}>High School</DropdownItem>
            <DropdownItem as={Link} href="/categories/all" key={""}>All Categories</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        <NavbarItem>
          <Link href="/products">Products</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about">About</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/contact">Contact</Link>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarContent>
        <Link href="/cart" className="flex items-center gap-1">
          <Button variant="light">
            Cart
            {itemCount > 0 && (
              <Badge color="primary" className="ml-1">{itemCount}</Badge>
            )}
          </Button>
        </Link>
        
        {isSignedIn ? (
          <>
            <Link href="/dashboard">
              <Button variant="light">Dashboard</Button>
            </Link>
            {isAdmin && (
              <Link href="/admin">
                <Button color="secondary">Admin</Button>
              </Link>
            )}
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <SignInButton mode="modal">
            <Button color="primary">Sign In</Button>
          </SignInButton>
        )}
      </NavbarContent>
      
      <NavbarMenuToggle className="sm:hidden" />
      
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/">Home</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/categories/all">Categories</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/products">Products</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/about">About</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/contact">Contact</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;
