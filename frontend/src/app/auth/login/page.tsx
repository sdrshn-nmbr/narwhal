"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add actual login logic here
    router.push('/');
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      <div className="flex w-full items-center justify-center px-8 lg:w-1/2">
        <Card className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/auth/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 -z-10">
          <svg
            className="h-[400%] w-[400%] -translate-x-1/4 -translate-y-1/4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              className="stroke-primary/40"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              points="12 18.63 18.84 15.21 18.84 7.68 12 4.32 5.16 7.68 5.16 15.21 12 18.63"
            />
            <polyline
              className="stroke-primary/40"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              points="5.16 8.09 5.19 8.09 12 11.46 12 18.84"
            />
            <polyline
              className="stroke-primary/40"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              points="12 18.84 12 11.46 18.81 8.09 18.84 8.09"
            />
            <polyline
              className="stroke-primary/40"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              points="18.84 8.09 18.81 8.09 12 11.46 5.19 8.09 5.16 8.09"
            />
            <polyline
              className="stroke-primary/40"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              points="1.25 6.14 1.25 1.25 6.14 1.25"
            />
            <polyline
              className="stroke-primary/40"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              points="6.14 22.75 1.25 22.75 1.25 17.86"
            />
            <polyline
              className="stroke-primary/40"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              points="22.75 17.86 22.75 22.75 17.86 22.75"
            />
            <polyline
              className="stroke-primary/40"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              points="17.86 1.25 22.75 1.25 22.75 6.14"
            />
          </svg>
        </div>
      </div>
    </div>
  );
} 