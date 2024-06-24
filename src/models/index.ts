import * as z from "zod"




export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Please enter a prompt"
    })
})



export const mediaformSchema = formSchema.extend({
    amount: z.string().min(1),
    resolution: z.string().min(1)
})

export type FormSchemaInterface = z.infer<typeof formSchema>
export type MediaFormSchemaInterface = z.infer<typeof mediaformSchema>