"use client";

import * as z from "zod";
import Heading from "@/components/custom/heading/heading";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaInterface, formSchema } from "@/models";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import Empty from "@/components/custom/empty/empty";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/custom/user-avatar/user-avatar";
import BotAvatar from "@/components/custom/bot-avatar/bot-avatar";

function Music() {
  const [music, setMusic] = useState<string>("https://replicate.delivery/czjl/GHYKQRDkSB7yFd5OKeh46OX1DKbrHz8F7vJzW8JfqZzJT3BTA/gen_sound.wav");
  const router = useRouter();
  const form = useForm<FormSchemaInterface>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormSchemaInterface) => {
    try {
      setMusic(undefined);
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };

      const response = await axios.post("/api/music/", values);

      setMusic(response.audio);
      form.reset();
    } catch (error: any) {
      console.error(error);
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Music"
        description="Our Most advanced Music model"
        icon={ChatBubbleIcon}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg
            border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2
            "
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="SKSDlklskdlasd"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="col-span-12 lg:col-span-2 w-full "
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>

      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
              <Image alt="logo" fill src="" />
            </div>

            <p className="text-sm text-muted-foreground"></p>
          </div>
        )}
        {!music && !isLoading && <Empty label="No Music" />}
        <div className="flex flex-col-reverse gap-y-4">
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} type="audio/mpeg" />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
}

export default Music;
