"use client";

import * as z from "zod";
import Heading from "@/components/custom/heading/heading";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormSchemaInterface,
  MediaFormSchemaInterface,
  formSchema,
} from "@/models";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Empty from "@/components/custom/empty/empty";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/custom/user-avatar/user-avatar";
import BotAvatar from "@/components/custom/bot-avatar/bot-avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { amountOptions, resolutionOptions } from "@/lib/constants";
import { Card, CardFooter } from "@/components/ui/card";

function ImagePage() {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();
  const form = useForm<MediaFormSchemaInterface>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormSchemaInterface) => {
    try {
      setImages([]);
      const userMessage = {
        role: "user",
        content: values.prompt,
      };

      const response = await axios.post("/api/image/", values);
      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);
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
        title="Image"
        description="Our Most advanced conversation model"
        icon={ChatBubbleIcon}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="A picture of an astronut on mars"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="resolution"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
          <div className="p-20">
            <div className="w-10 h-10 relative animate-spin">
              <Image alt="logo" fill src="" />
            </div>

            <p className="text-sm text-muted-foreground"></p>
          </div>
        )}
        {images.length === 0 && !isLoading && <Empty label="No conversation" />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {images.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image alt="image" src={src} fill />
              </div>

              <CardFooter className="p-2">
                <Button variant="secondary" className="w-full" onClick={()=>window.open(src)}>
                 Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImagePage;
