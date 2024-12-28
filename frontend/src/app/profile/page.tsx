"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, MapPin, Link as LinkIcon } from "lucide-react";

export default function ProfilePage() {
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

      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/placeholder-avatar.jpg" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">Software Developer</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>john@example.com</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <LinkIcon className="h-4 w-4" />
              <a href="#" className="text-primary">github.com/johndoe</a>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">52</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold">10.2k</div>
              <div className="text-sm text-muted-foreground">Files</div>
            </div>
            <div>
              <div className="text-2xl font-bold">120GB</div>
              <div className="text-sm text-muted-foreground">Storage</div>
            </div>
          </div>

          <div className="mt-6">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => router.push('/settings')}
            >
              Edit Profile
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 