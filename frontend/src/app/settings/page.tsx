"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-6">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input id="language" defaultValue="English" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" defaultValue="UTC" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <div className="space-y-4">
            <Button variant="outline" className="w-full">Change Password</Button>
            <Button variant="outline" className="w-full">Enable Two-Factor Authentication</Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 