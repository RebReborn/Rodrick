
"use client";

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Monitor, Palette, Info, Wifi, Bluetooth, UserCircle, Lock, Package } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

type SettingsCategory = "system" | "personalization" | "network" | "accounts" | "privacy" | "updates" | "about";

const SettingsApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>("system");

  const categories: { id: SettingsCategory; name: string; icon: React.ReactNode }[] = [
    { id: "system", name: "System", icon: <Monitor size={18} /> },
    { id: "personalization", name: "Personalization", icon: <Palette size={18} /> },
    { id: "network", name: "Network & Internet", icon: <Wifi size={18} /> },
    { id: "accounts", name: "Accounts", icon: <UserCircle size={18} /> },
    { id: "privacy", name: "Privacy & Security", icon: <Lock size={18} /> },
    { id: "updates", name: "Updates", icon: <Package size={18} /> },
    { id: "about", name: "About", icon: <Info size={18} /> },
  ];

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case "system":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Display</CardTitle>
                <CardDescription>Manage display settings, brightness, and resolution.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="brightness">Brightness</Label>
                  <Progress value={75} className="w-1/2 h-2" />
                </div>
                 <div className="flex items-center justify-between">
                  <Label>Resolution</Label>
                  <span className="text-sm text-muted-foreground">1920 x 1080 (Recommended)</span>
                </div>
                <Button variant="outline" size="sm">Advanced display settings</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sound</CardTitle>
                <CardDescription>Configure audio devices and volume levels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="volume">Master Volume</Label>
                  <Progress value={90} className="w-1/2 h-2" />
                </div>
                 <Button variant="outline" size="sm">Sound control panel</Button>
              </CardContent>
            </Card>
          </div>
        );
      case "personalization":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Customize the look and feel of your environment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Appearance</Label>
                  <ThemeToggle />
                </div>
                <p className="text-sm text-muted-foreground">Choose between light and dark mode.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Accent Color</CardTitle>
                <CardDescription>Choose an accent color for your system.</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                {['#0078D7', '#FFB900', '#7719AA', '#008A00', '#C50F1F'].map(color => (
                  <Button key={color} className="w-8 h-8 p-0 rounded-full border-2 border-transparent hover:border-ring" style={{ backgroundColor: color }} title={color} />
                ))}
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Background</CardTitle>
                <CardDescription>Select your desktop background.</CardDescription>
              </CardHeader>
              <CardContent>
                 <Image src="https://4kwallpapers.com/images/wallpapers/windows-11-dark-mode-stock-official-3840x2400-5630.jpg" alt="Current Wallpaper" width={200} height={120} className="rounded-md shadow-md" />
                 <Button variant="outline" size="sm" className="mt-2">Change background</Button>
              </CardContent>
            </Card>
          </div>
        );
        case "network":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Network & Internet</CardTitle>
              <CardDescription>Wi-Fi, Ethernet, VPN, and other network settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi size={20} className="text-primary" />
                  <div>
                    <p className="font-medium">Wi-Fi Network Name</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Connected, secured</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Properties</Button>
              </div>
              <Separator />
               <div className="flex items-center justify-between">
                 <Label htmlFor="airplane-mode">Airplane Mode</Label>
                 <Switch id="airplane-mode" />
               </div>
               <Button variant="outline" size="sm">Advanced network settings</Button>
            </CardContent>
          </Card>
        );
      case "about":
        return (
          <Card>
            <CardHeader>
              <CardTitle>About FluentFolio</CardTitle>
              <CardDescription>System information and version details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">Device name: <span className="font-normal text-muted-foreground">User-Desktop</span></p>
              <p className="font-semibold">Operating System: <span className="font-normal text-muted-foreground">FluentFolio Interactive Portfolio</span></p>
              <p className="font-semibold">Version: <span className="font-normal text-muted-foreground">1.0.0 (Simulated)</span></p>
              <p className="font-semibold">Developer: <span className="font-normal text-muted-foreground">Rodrick Ramadhani</span></p>
              <Separator className="my-4" />
              <p className="text-xs text-muted-foreground">
                This is a simulated settings panel within a Next.js application.
              </p>
            </CardContent>
          </Card>
        );
      default:
        return <p>Content for {activeCategory.replace(/^\w/, c => c.toUpperCase())} coming soon.</p>;
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent text-foreground">
      <header className="p-0 mb-3"> {/* Standard padding for app content */}
        <h1 className="text-xl font-semibold">Settings</h1>
      </header>
      <div className="flex flex-grow overflow-hidden">
        <ScrollArea className="w-56 border-r pr-0 shrink-0"> {/* Added pr-0 */}
          <nav className="flex flex-col gap-1 p-2"> {/* Added padding to nav */}
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "secondary" : "ghost"}
                className="w-full justify-start gap-2 text-sm"
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon}
                {cat.name}
              </Button>
            ))}
          </nav>
        </ScrollArea>
        <ScrollArea className="flex-grow p-4 pl-6"> {/* Added padding to content area */}
          {renderCategoryContent()}
        </ScrollArea>
      </div>
    </div>
  );
};

export default SettingsApp;

    