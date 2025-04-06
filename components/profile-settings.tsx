"use client"

import { useState } from "react"
import Image from "next/image"
import { Camera, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function ProfileSettings() {
  const { theme, setTheme } = useTheme()

  // Mock user data
  const [user, setUser] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+44 7123 456789",
    avatar: "/placeholder.svg?height=100&width=100&text=JS",
    notifications: {
      email: true,
      sms: false,
      promotions: true,
      orderUpdates: true,
      newsletter: false,
    },
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [key]: value,
      },
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">Account Settings</h2>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="space-y-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
              <div className="relative">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-indigo-100 dark:border-indigo-900">
                  <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:bg-gray-800 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Change profile picture</span>
                </Button>
              </div>

              <div className="flex-1 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-indigo-900 dark:text-indigo-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-indigo-900 dark:text-indigo-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-indigo-900 dark:text-indigo-300">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={user.phone}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-indigo-900 dark:text-indigo-400">Theme Preferences</h3>

              <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Label
                  htmlFor="theme-light"
                  className="flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-colors hover:bg-accent"
                >
                  <div className="bg-background p-3 rounded-full mb-3 border">
                    <Sun className="h-6 w-6 text-amber-500" />
                  </div>
                  <RadioGroupItem id="theme-light" value="light" className="sr-only" />
                  <span className="font-medium text-foreground">Light</span>
                  <span className="text-xs text-muted-foreground mt-1">Light mode interface</span>
                </Label>

                <Label
                  htmlFor="theme-dark"
                  className="flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-colors hover:bg-accent"
                >
                  <div className="bg-background p-3 rounded-full mb-3 border">
                    <Moon className="h-6 w-6 text-primary" />
                  </div>
                  <RadioGroupItem id="theme-dark" value="dark" className="sr-only" />
                  <span className="font-medium text-foreground">Dark</span>
                  <span className="text-xs text-muted-foreground mt-1">Dark mode interface</span>
                </Label>

                <Label
                  htmlFor="theme-system"
                  className="flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-colors hover:bg-accent"
                >
                  <div className="bg-background p-3 rounded-full mb-3 border">
                    <div className="h-6 w-6 bg-gradient-to-r from-amber-500 to-primary rounded-full" />
                  </div>
                  <RadioGroupItem id="theme-system" value="system" className="sr-only" />
                  <span className="font-medium text-foreground">System</span>
                  <span className="text-xs text-muted-foreground mt-1">Follow system preference</span>
                </Label>
              </RadioGroup>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-indigo-900 dark:text-indigo-400">Display Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reduced-motion" className="text-indigo-900 dark:text-indigo-300">
                      Reduce Motion
                    </Label>
                    <p className="text-sm text-gray-500">Minimize animations and transitions</p>
                  </div>
                  <Switch id="reduced-motion" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="high-contrast" className="text-indigo-900 dark:text-indigo-300">
                      High Contrast
                    </Label>
                    <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
                  </div>
                  <Switch id="high-contrast" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-indigo-900 dark:text-indigo-400">Notification Preferences</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="text-indigo-900 dark:text-indigo-300">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={user.notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications" className="text-indigo-900 dark:text-indigo-300">
                    SMS Notifications
                  </Label>
                  <p className="text-sm text-gray-500">Receive notifications via text message</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={user.notifications.sms}
                  onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="order-updates" className="text-indigo-900 dark:text-indigo-300">
                    Order Updates
                  </Label>
                  <p className="text-sm text-gray-500">Receive updates about your orders</p>
                </div>
                <Switch
                  id="order-updates"
                  checked={user.notifications.orderUpdates}
                  onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="promotions" className="text-indigo-900 dark:text-indigo-300">
                    Promotions and Offers
                  </Label>
                  <p className="text-sm text-gray-500">Receive information about deals and promotions</p>
                </div>
                <Switch
                  id="promotions"
                  checked={user.notifications.promotions}
                  onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newsletter" className="text-indigo-900 dark:text-indigo-300">
                    Newsletter
                  </Label>
                  <p className="text-sm text-gray-500">Receive our monthly newsletter</p>
                </div>
                <Switch
                  id="newsletter"
                  checked={user.notifications.newsletter}
                  onCheckedChange={(checked) => handleNotificationChange("newsletter", checked)}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-indigo-900 dark:text-indigo-400">Change Password</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password" className="text-indigo-900 dark:text-indigo-300">
                    Current Password
                  </Label>
                  <Input id="current-password" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="new-password" className="text-indigo-900 dark:text-indigo-300">
                    New Password
                  </Label>
                  <Input id="new-password" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-indigo-900 dark:text-indigo-300">
                    Confirm New Password
                  </Label>
                  <Input id="confirm-password" type="password" className="mt-1" />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Update Password</Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-indigo-900 dark:text-indigo-400">
                Two-Factor Authentication
              </h3>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-900 dark:text-indigo-300">
                    Two-factor authentication is currently disabled.
                  </p>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                </div>
                <Button
                  variant="outline"
                  className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                >
                  Enable
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-6 border-red-200 dark:border-red-900">
              <h3 className="text-lg font-medium mb-4 text-red-600 dark:text-red-400">Danger Zone</h3>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 dark:text-red-400">Delete Account</p>
                  <p className="text-sm text-gray-500">Permanently delete your account and all data.</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

