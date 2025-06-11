'use client';

import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { logout } from "./logout";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/auth-context.provider";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const UserSettingsPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { user } = useAuthContext();
  const onSubmit = () => {
    startTransition(async () => {
      const result = await logout();
      if ('error' in result) {
        setError(result.error);
        setSuccess(undefined);
      } else {
        setSuccess(result.success);
        setError(undefined);
        redirect("/")
      }
    });
  };

  return (
    <div className=" flex flex-col w-full items-center justify-center">
      <Card className="flex flex-col justify-center border-app-primary">
        <CardHeader className="text-lg">Profile</CardHeader>
        <CardContent>
          <h1 className="text-app-primary tracking-tight text-xl font-bold">{user?.name}</h1>
          <p className="tracking-tighter " >{user?.email}</p>
        </CardContent>
        <CardFooter className="w-full flex items-center justify-center">
      <Button className="hover:bg-red-500 hover:text-white hover:animate-pulse" onClick={onSubmit} disabled={isPending}>
        Log-out
      </Button>
      {error && <p>Error: {error}</p>}
      {success && <p>Success: {success}</p>}
      </CardFooter>
      </Card>
    </div>
  );
};

export default UserSettingsPage;