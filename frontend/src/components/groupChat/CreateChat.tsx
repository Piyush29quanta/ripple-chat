"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { createChatSchema, createChatSchemaType } from '@/validations/groupChatValidation';
import { Input } from '../ui/input';
import { CustomUser } from '@/app/api/auth/[...nextauth]/options';
import axios, { AxiosError } from 'axios';
import { CHAT_GROUP_URL } from '@/lib/apiEndPoints';
import { toast } from 'sonner';
import { clearCache } from '@/actions/common';



const CreateChat = ({ user }: { user: CustomUser }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<createChatSchemaType>({
        resolver: zodResolver(createChatSchema),
    })
    const onSubmit = async (payload: createChatSchemaType) => {
        // console.log("The chat payload is", payload)
        try {
            setLoading(true);
            const { data } = await axios.post(CHAT_GROUP_URL, payload, {
                headers: {
                    Authorization: user.token,
                },
            });

            if (data?.message) {
                clearCache("dashboard");
                setOpen(false);
                setLoading(false);
                toast.success(data?.message);
               
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error instanceof AxiosError) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong.please try again!");
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='mr-8'>Create Group</Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Create Your New Chat</DialogTitle>

                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <Input placeholder='Enter the chat title' {...register("title")} />
                        <span className='text-red-500'>{errors.title?.message}</span>
                    </div>
                    <div className="mt-4">
                        <Input placeholder="Enter passcode" {...register("passcode")} />
                        <span className="text-red-500">{errors.passcode?.message}</span>
                    </div>
                    <div className="mt-4">
                        <Button className="w-full" disabled={loading}>
                            {loading ? "Processing.." : "Submit"}
                        </Button>
                    </div>

                </form>
            </DialogContent>
        </Dialog>

    )
}

export default CreateChat