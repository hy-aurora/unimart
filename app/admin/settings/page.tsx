"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  User, 
  CreditCard, 
  Bell, 
  Lock, 
  Store, 
  MailOpen, 
  Truck, 
  Palette,
  Save
} from "lucide-react";

export default function SettingsPage() {
  // Store settings state
  const [storeName, setStoreName] = useState("UniMart School Uniforms");
  const [storeEmail, setStoreEmail] = useState("info@unimart.com");
  const [storePhone, setStorePhone] = useState("+44 123 456 7890");
  const [currencySymbol, setCurrencySymbol] = useState("£");
  const [taxRate, setTaxRate] = useState("20");
  
  // Email notification settings
  const [emailNotifications, setEmailNotifications] = useState({
    newOrders: true,
    lowStock: true,
    customerSignups: false,
    productReviews: true,
    weeklyReports: true
  });

  // Theme settings
  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("blue");
  
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <Button className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList className="flex w-full md:w-auto h-auto p-1 flex-wrap md:flex-nowrap">
              <TabsTrigger value="general" className="flex-1 h-10">
                <Settings className="h-4 w-4 mr-2 hidden sm:inline-block" />
                General
              </TabsTrigger>
              <TabsTrigger value="store" className="flex-1 h-10">
                <Store className="h-4 w-4 mr-2 hidden sm:inline-block" />
                Store
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex-1 h-10">
                <Bell className="h-4 w-4 mr-2 hidden sm:inline-block" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1 h-10">
                <Truck className="h-4 w-4 mr-2 hidden sm:inline-block" />
                Shipping
              </TabsTrigger>
              <TabsTrigger value="account" className="flex-1 h-10">
                <User className="h-4 w-4 mr-2 hidden sm:inline-block" />
                Account
              </TabsTrigger>
            </TabsList>
          </div>

          {/* General Settings Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your basic store settings and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Regional Settings</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="europe-london">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="europe-london">Europe/London (GMT+00:00)</SelectItem>
                          <SelectItem value="america-newyork">America/New York (GMT-05:00)</SelectItem>
                          <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+09:00)</SelectItem>
                          <SelectItem value="australia-sydney">Australia/Sydney (GMT+10:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                          <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Currency Settings</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="gbp">
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gbp">British Pound (GBP)</SelectItem>
                          <SelectItem value="usd">US Dollar (USD)</SelectItem>
                          <SelectItem value="eur">Euro (EUR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency-symbol">Currency Symbol</Label>
                      <Input 
                        id="currency-symbol" 
                        value={currencySymbol} 
                        onChange={(e) => setCurrencySymbol(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="two-factor" />
                      <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your admin account.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="session-timeout" defaultChecked />
                      <Label htmlFor="session-timeout">Auto Logout After Inactivity</Label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 mt-2">
                      <Label htmlFor="timeout-minutes" className="sm:text-right">
                        Minutes
                      </Label>
                      <Input 
                        id="timeout-minutes" 
                        type="number" 
                        defaultValue="30" 
                        className="col-span-1 sm:col-span-3" 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-end">
                <Button className="w-full sm:w-auto">Save General Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Store Settings Tab */}
          <TabsContent value="store">
            <Card>
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
                <CardDescription>Manage your store information and business details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Store Information</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                      <Label htmlFor="store-name" className="sm:text-right">
                        Store Name
                      </Label>
                      <Input 
                        id="store-name" 
                        value={storeName} 
                        onChange={(e) => setStoreName(e.target.value)} 
                        className="col-span-1 sm:col-span-3" 
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                      <Label htmlFor="store-email" className="sm:text-right">
                        Email
                      </Label>
                      <Input 
                        id="store-email" 
                        type="email" 
                        value={storeEmail} 
                        onChange={(e) => setStoreEmail(e.target.value)} 
                        className="col-span-1 sm:col-span-3" 
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                      <Label htmlFor="store-phone" className="sm:text-right">
                        Phone
                      </Label>
                      <Input 
                        id="store-phone" 
                        value={storePhone} 
                        onChange={(e) => setStorePhone(e.target.value)} 
                        className="col-span-1 sm:col-span-3" 
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4">
                      <Label htmlFor="store-address" className="sm:text-right pt-2">
                        Address
                      </Label>
                      <textarea 
                        id="store-address" 
                        className="col-span-1 sm:col-span-3 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                        defaultValue="123 School Street, London, UK"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tax Settings</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="tax-enable">Enable Tax Calculation</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="tax-enable" defaultChecked />
                        <span className="text-sm text-muted-foreground">
                          Calculate tax on orders
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax-rate">Standard Tax Rate (%)</Label>
                      <Input 
                        id="tax-rate" 
                        type="number" 
                        value={taxRate} 
                        onChange={(e) => setTaxRate(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Store Features</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="enable-reviews" defaultChecked />
                      <Label htmlFor="enable-reviews">Enable Product Reviews</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="enable-wishlists" defaultChecked />
                      <Label htmlFor="enable-wishlists">Enable Wishlists</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="enable-discounts" defaultChecked />
                      <Label htmlFor="enable-discounts">Enable Discount Codes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="enable-inventory" defaultChecked />
                      <Label htmlFor="enable-inventory">Track Inventory</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-end">
                <Button className="w-full sm:w-auto">Save Store Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how and when you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="grid gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-orders">New Orders</Label>
                        <div className="text-sm text-muted-foreground">
                          Receive an email when a new order is placed
                        </div>
                      </div>
                      <Switch 
                        id="new-orders" 
                        checked={emailNotifications.newOrders}
                        onCheckedChange={(checked) => 
                          setEmailNotifications({...emailNotifications, newOrders: checked})
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="low-stock">Low Stock Alerts</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified when products are low in stock
                        </div>
                      </div>
                      <Switch 
                        id="low-stock" 
                        checked={emailNotifications.lowStock}
                        onCheckedChange={(checked) => 
                          setEmailNotifications({...emailNotifications, lowStock: checked})
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="customer-signups">New Customer Signups</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified when a new customer creates an account
                        </div>
                      </div>
                      <Switch 
                        id="customer-signups" 
                        checked={emailNotifications.customerSignups}
                        onCheckedChange={(checked) => 
                          setEmailNotifications({...emailNotifications, customerSignups: checked})
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="product-reviews">Product Reviews</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified when a product receives a review
                        </div>
                      </div>
                      <Switch 
                        id="product-reviews" 
                        checked={emailNotifications.productReviews}
                        onCheckedChange={(checked) => 
                          setEmailNotifications({...emailNotifications, productReviews: checked})
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="weekly-reports">Weekly Reports</Label>
                        <div className="text-sm text-muted-foreground">
                          Receive weekly sales and inventory reports
                        </div>
                      </div>
                      <Switch 
                        id="weekly-reports" 
                        checked={emailNotifications.weeklyReports}
                        onCheckedChange={(checked) => 
                          setEmailNotifications({...emailNotifications, weeklyReports: checked})
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  <div className="space-y-2">
                    <Label htmlFor="notification-email">Notification Email</Label>
                    <Input id="notification-email" type="email" defaultValue="admin@unimart.com" />
                    <p className="text-sm text-muted-foreground mt-1">
                      This is the email address where all notifications will be sent.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-end">
                <Button className="w-full sm:w-auto">Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Shipping Tab */}
          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Settings</CardTitle>
                <CardDescription>Configure your shipping methods and delivery options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping Methods</h3>
                  <div className="space-y-4">
                    <div className="grid gap-4 p-4 border rounded-md">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium">Standard Shipping</h4>
                          <p className="text-sm text-muted-foreground">3-5 business days</p>
                        </div>
                        <div className="flex items-center self-end sm:self-auto">
                          <Switch id="standard-shipping" defaultChecked />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="standard-cost">Cost (£)</Label>
                          <Input id="standard-cost" type="number" defaultValue="4.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="standard-free-threshold">Free Shipping Threshold (£)</Label>
                          <Input id="standard-free-threshold" type="number" defaultValue="75.00" />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 p-4 border rounded-md">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium">Express Shipping</h4>
                          <p className="text-sm text-muted-foreground">1-2 business days</p>
                        </div>
                        <div className="flex items-center self-end sm:self-auto">
                          <Switch id="express-shipping" defaultChecked />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="express-cost">Cost (£)</Label>
                          <Input id="express-cost" type="number" defaultValue="9.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="express-free-threshold">Free Shipping Threshold (£)</Label>
                          <Input id="express-free-threshold" type="number" defaultValue="150.00" />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 p-4 border rounded-md">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium">School Delivery</h4>
                          <p className="text-sm text-muted-foreground">Delivery to school premises</p>
                        </div>
                        <div className="flex items-center self-end sm:self-auto">
                          <Switch id="school-delivery" defaultChecked />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="school-cost">Cost (£)</Label>
                          <Input id="school-cost" type="number" defaultValue="0.00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="school-min-order">Minimum Order Value (£)</Label>
                          <Input id="school-min-order" type="number" defaultValue="50.00" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping Restrictions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="uk-only" defaultChecked />
                      <Label htmlFor="uk-only">UK Delivery Only</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Restrict shipping to UK addresses only
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-end">
                <Button className="w-full sm:w-auto">Save Shipping Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information and security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Profile Information</h3>
                  <div className="grid gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <User className="h-8 w-8" />
                      </div>
                      <Button variant="outline" className="w-full sm:w-auto">Change Avatar</Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="account-name">Full Name</Label>
                        <Input id="account-name" defaultValue="Admin User" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-email">Email Address</Label>
                        <Input id="account-email" type="email" defaultValue="admin@unimart.com" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button className="w-full sm:w-fit">Update Password</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Login Sessions</h3>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div>
                          <h4 className="font-medium">Current Session</h4>
                          <p className="text-sm text-muted-foreground">London, UK • Chrome on Windows</p>
                          <p className="text-xs text-muted-foreground mt-1">Started 2 hours ago</p>
                        </div>
                        <Badge className="mt-2 sm:mt-0">Active Now</Badge>
                      </div>
                    </div>
                    <Button variant="destructive" className="w-full sm:w-fit">Sign Out All Other Sessions</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
                <Button variant="outline" className="w-full sm:w-auto">Sign Out</Button>
                <Button className="w-full sm:w-auto">Save Account Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
